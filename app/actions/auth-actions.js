import Promise from 'bluebird'
const storage = Promise.promisifyAll(require('electron-json-storage'))
const { BrowserWindow } = require('electron').remote
export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const SOCKETS_STARTED = "SOCKETS_STARTED"
export const SET_USER = "SET_USER"
import { push } from 'react-router-redux'
import io from 'socket.io-client';
import { stopSockets } from '../utils/incoming-sockets.js'

import GitHub from 'github-api';
import axios from 'axios';

export function socketsStarted() {
	return {
		type: SOCKETS_STARTED
	}
}

function setUserResolve(currentUser, token, id) {
	return {
		type: SET_USER,
		currentUser,
		token,
		id
	}
}

export function setUser(currentUser, token, id) {
	return (dispatch, getState) => {
		var channelStorage
		return storage.setAsync('user', {
			currentUser: currentUser,
			token: token,
			id: id
		})
			.then(() => {
				if (!currentUser) {
					dispatch(setUserResolve(null, null, null))
				} else {
					return storage.getAsync('channels')
						.then(result => {
							channelStorage = result
							return axios.get(`${process.env.SERVER_URL}/api/users/${id}`)
						})
						.then(result => {
							let user = result.data
							let userStorage = channelStorage[currentUser] ? channelStorage[ currentUser ] : {}
							if (user.channels) {
								user.channels.forEach(channel => {
									if (!userStorage.hasOwnProperty(channel.repoId)) {
										userStorage[channel.repoId] = null
									}
								})
								return storage.setAsync('channels', {...channelStorage, [currentUser]: userStorage})
							} else {
								return storage.setAsync('channels', {...channelStorage, [currentUser]: {}})
							}
						})
						.then(() => dispatch(setUserResolve(currentUser, token, id)))
				}
			})
			.catch(err => console.log(err))
	}
}

export function login() {
	return function(dispatch, getState) {
		let options = {
			client_id: process.env.CLIENT_ID,
			scopes: ['repo']
		}

		let authWindow = new BrowserWindow({ width: 800, height: 600, show: false, 'node-integration': false })
		let githubUrl = 'https://github.com/login/oauth/authorize?'
		let authUrl = githubUrl + 'client_id=' + options.client_id + '&scope=' + options.scopes;
		authWindow.loadURL(authUrl)
		authWindow.show()

		function handleCallback (url) {
			var raw_code = /code=([^&]*)/.exec(url) || null;
			var code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
			var error = /\?error=(.+)$/.exec(url);

			if (code || error) {
				authWindow.destroy();
			}

			if (code) {
				let fetchRequest = {
					method: "POST",
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						code: code
					})
				}

				return fetch('http://localhost:1337/api/auth/github', fetchRequest)
					.then(r => r.json())
					.then(response => {
						console.log(response)
						dispatch(setUserResolve(response.username, response.token, response.id))
						return storage.setAsync('user', {
							currentUser: response.username,
							token: response.token,
							id: response.id
						})
					})
			} else if (error) {
				alert('Oops! Something went wrong and we couldn\'t' +
					'log you in using Github. Please try again.');
				return {}
			}
		}

		authWindow.webContents.on('will-navigate', function (event, url) {
			handleCallback(url);
		});

		authWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
			handleCallback(newUrl);
		});
	}
}

export function logout(githubUsername) {
	return function(dispatch, getState) {
		stopSockets()
		dispatch(setUserResolve(null, null, null))
		dispatch(push('/'))
	}
}
