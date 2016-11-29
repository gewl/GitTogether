import { expect } from 'chai';
import Promise from 'bluebird';
import * as AuthActions from '../../app/actions/auth-actions.js';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
const storage = Promise.promisifyAll(require('electron-json-storage'))
import { mock } from '../setup.js'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('sync auth actions', () => {
	describe('socketsStarted action creator', () => {
		const socketStartedAction = {
			type: 'SOCKETS_STARTED'
		}
		it('should correctly dispatch action', () => {
			expect(AuthActions.socketsStarted()).to.be.an('object')
			expect(AuthActions.socketsStarted()).to.deep.equal(socketStartedAction)
		})
	})
})

describe('async auth actions', () => {
	beforeEach(() => {
		mock.reset()
	})
	describe('setUser action creator', () => {
		const store = mockStore({
			auth: {
				currentUser: 'JohnDoe',
				id: 1,
				token: 1
			}
		})
		afterEach(() => {
			store.clearActions()
		})

		it('creates an action to set a null user if no user is logged in', () => {
			const expectedActions = [{
				type: 'SET_USER',
				currentUser: null,
				token: null,
				id: null
			}]

			return store.dispatch(AuthActions.setUser(null))
				.then(() => {
					expect(store.getActions()).to.deep.equal(expectedActions)
				})
		})

		it('creates an action to set a user if a user is logged in', () => {
			let id = 2
			let token = 2
			let currentUser = 'JaneDoe'
			const expectedActions = [{
				type: 'SET_USER',
				currentUser,
				token,
				id
			}]

			console.log(`${process.env.SERVER_URL}/api/users/${id}`)
			mock.onAny()
				.reply(200, {
					channels: [{
						repoId: 'fakeChannel'
					}]
				})

			return store.dispatch(AuthActions.setUser(currentUser, token, id))
				.then(() => {
					expect(store.getActions()).to.deep.equal(expectedActions)
				})
		})
	})
})
