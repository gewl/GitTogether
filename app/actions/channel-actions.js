// export const ADD_CHANNEL = 'ADD_CHANNEL';
// export const REMOVE_CHANNEL = 'REMOVE_CHANNEL';
export const LOAD_CHANNELS = 'LOAD_CHANNELS';

import Promise from 'bluebird'
const storage = Promise.promisifyAll(require('electron-json-storage'))
import GitHub from 'github-api';
import axios from 'axios';

function loadChannelsSuccess(channels) {
	return {
		type: LOAD_CHANNELS,
		channels
	}
}

export function loadChannels() {
	return (dispatch, getState) => {
		let userStorage, channelStorage, currentUser, channels
		return storage.getAsync('channels')
			.then(result => {
				channelStorage = result
				let state = getState()
				let userId = state.auth.id
				currentUser = state.auth.currentUser
				userStorage = channelStorage[currentUser] ? channelStorage[ currentUser ] : {}
				return axios.get(process.env.SERVER_URL + `/api/users/${userId}`)
			})
			.then(result => {
				let user = result.data
				if (user.channels) {
					user.channels.forEach(channel => {
						if (!userStorage.hasOwnProperty(channel.repoId)) {
							userStorage[channel.repoId] = null
						}
					})
				} 					
				channels = Object.keys(channelStorage[currentUser])
				dispatch(loadChannelsSuccess(channels))
				return storage.setAsync('channels', {...channelStorage, [currentUser]: userStorage})
			})
			.catch(err => console.log(err))
	}
}

