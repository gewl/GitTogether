/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import Promise from 'bluebird';
import * as ChannelActions from '../../app/actions/channel-actions.js';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const storage = Promise.promisifyAll(require('electron-json-storage'))
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
import { mock } from '../setup.js'

describe('loadChannels action creator', () => {
	let originalChannels, state, store;

	beforeEach(() => {
		mock.reset()

		store = mockStore({
			auth: {
				currentUser: 'JohnDoe',
				id: 1
			}
		})
		state = store.getState();
		return storage.getAsync('channels')
			.then(channels => {
				originalChannels = channels
			})
	})

	afterEach(() => {
		return storage.setAsync('channels', originalChannels)
	})

	it('creates an action with no channels if the suer doesn\'t belong to any channels', () => {
		const expectedActions = [{
			type: 'LOAD_CHANNELS',
			channels: []
		}]
		let userId = state.auth.id
		let testUser = state.auth.currentUser

		mock.onGet(`${process.env.SERVER_URL}/api/users/${userId}`)
			.reply(200, {
				channels: []
			})

		return storage.getAsync('channels')
			.then(cachedChannels => {
				cachedChannels[testUser] = {}
				return storage.setAsync('channels', cachedChannels)
			})
			.then(() => store.dispatch(ChannelActions.loadChannels()))
			.then(() => {
				expect(store.getActions()).to.deep.equal(expectedActions)
			})
	})

	it('creates an action with channels from local storage if they\'re up to date', () => {
		const expectedActions = [{
			type: 'LOAD_CHANNELS',
			channels: ['testchannel1', 'testchannel2']
		}]
		let userId = state.auth.id
		let testUser = state.auth.currentUser

		mock.onGet(`${process.env.SERVER_URL}/api/users/${userId}`)
			.reply(200, {
				channels: []
			})

		return storage.getAsync('channels')
			.then(cachedChannels => {
				cachedChannels[testUser] = {
					'testchannel1': null,
					'testchannel2': null
				}
				return storage.setAsync('channels', cachedChannels)
			})
			.then(() => store.dispatch(ChannelActions.loadChannels()))
			.then(() => {
				expect(store.getActions()).to.deep.equal(expectedActions)
			})
	})
	it('creates an action with channels from the server if cache is empty', () => {
		const expectedActions = [{
			type: 'LOAD_CHANNELS',
			channels: ['testchannel1', 'testchannel2']
		}]
		let userId = state.auth.id
		let testUser = state.auth.currentUser

		mock.onGet(`${process.env.SERVER_URL}/api/users/${userId}`)
			.reply(200, {
				channels: [{
					repoId: 'testchannel1'
				}, {
					repoId: 'testchannel2'
				}]
			})

		return storage.getAsync('channels')
			.then(cachedChannels => {
				cachedChannels[testUser] = {}
				return storage.setAsync('channels', cachedChannels)
			})
			.then(() => store.dispatch(ChannelActions.loadChannels()))
			.then(() => {
				expect(store.getActions()).to.deep.equal(expectedActions)
			})
	})
	it('combines channels from server and cache for up-to-date list of channels', () => {
		const expectedActions = [{
			type: 'LOAD_CHANNELS',
			channels: ['testchannel1', 'testchannel2', 'testchannel3', 'testchannel4']
		}]
		let userId = state.auth.id
		let testUser = state.auth.currentUser

		mock.onGet(`${process.env.SERVER_URL}/api/users/${userId}`)
			.reply(200, {
				channels: [{
					repoId: 'testchannel3'
				}, {
					repoId: 'testchannel4'
				}]
			})

		return storage.getAsync('channels')
			.then(cachedChannels => {
				cachedChannels[testUser] = {
					'testchannel1': null,
					'testchannel2': null
				}
				return storage.setAsync('channels', cachedChannels)
			})
			.then(() => store.dispatch(ChannelActions.loadChannels()))
			.then(() => {
				expect(store.getActions()).to.deep.equal(expectedActions)
			})
		
	})
})
