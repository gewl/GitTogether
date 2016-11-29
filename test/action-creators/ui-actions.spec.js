/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import * as uiActions from '../../app/actions/ui-actions.js';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('sync ui actions', () => {
	const store = mockStore({
		selected: 'Initial view',
		activeUi: 'Splash'
	})

	afterEach(() => {
		store.clearActions()
	})

	describe('toggleComponent action', () => {
		it('should dispatch TOGGLE_COMPONENT and ACTIVE_COMPONENT actions', () => {
			const component = 'Test component'
			const expectedActions = [{
				type: 'TOGGLE_COMPONENT',
				component
			}, {
				type: 'ACTIVE_COMPONENT',
				component
			}]

			store.dispatch(uiActions.toggleComponent(component))
			expect(store.getActions()).to.deep.equal(expectedActions)
		})	
	})

	describe('toggleTree action', () => {
		it('should dispatch TOGGLE_TREE action', () => {
			const component = "Test component"
			const expectedActions = [{
				type: 'TOGGLE_TREE',
				component
			}]

			store.dispatch(uiActions.toggleTree(component))
			expect(store.getActions()).to.deep.equal(expectedActions)
		})
	})
})
