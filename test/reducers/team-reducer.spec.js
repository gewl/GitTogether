import { expect } from 'chai';
import teamReducer from '../../app/reducers/team-reducer.js'

describe('team reducer', () => {
	it('should return the initial state', () => {
		expect(
			teamReducer(undefined, {})
		).to.deep.equal({
			activeTeamMember: 1,
			activeTeam: '',
			activeEvents: [],
			team: [],
			icon: 'glyphicon glyphicon-refresh',
			panelMessageArray: [
				{
					label: "Here are your Teams",
					text: ""
				}
			],
			panelMessagePlayIndex: 0,
			teamObj: {},
			currentlyOnline: []
		})
	})

	describe('on CHANGE_ACTIVE_TEAM_MEMBER', () => {
		it('change the state\'s active team member', () => {
			expect(
				teamReducer(undefined, {
					type: 'CHANGE_ACTIVE_TEAM_MEMBER',
					id: 2
				})
			).to.deep.equal({
				activeTeamMember: 2,
				activeTeam: '',
				activeEvents: [],
				team: [],
				icon: 'glyphicon glyphicon-refresh',
				panelMessageArray: [
					{
						label: "Here are your Teams",
						text: ""
					}
				],
				panelMessagePlayIndex: 0,
				teamObj: {},
				currentlyOnline: []
			})
		})
	})

	describe('on CHANGE_ACTIVE_TEAM', () => {
		it('change the state\'s active team', () => {
			expect(
				teamReducer(undefined, {
					type: 'CHANGE_ACTIVE_TEAM',
					channelId: 'DummyTeam'
				})
			).to.deep.equal({
				activeTeamMember: 1,
				activeTeam: 'DummyTeam',
				activeEvents: [],
				team: [],
				icon: 'glyphicon glyphicon-refresh',
				panelMessageArray: [
					{
						label: "Here are your Teams",
						text: ""
					}
				],
				panelMessagePlayIndex: 0,
				teamObj: {},
				currentlyOnline: []
			})
		})
	})

	describe('ADD_TEAM_MEMBER', () => {
		it('add a team member to current team', () => {
			expect(
				teamReducer(undefined, {
					type: 'ADD_TEAM_MEMBER',
					repoId: 'dummyRepo',
					name: 'JohnDoe'
				})
			).to.deep.equal({
				activeTeamMember: 1,
				activeTeam: '',
				activeEvents: [],
				team: [],
				icon: 'glyphicon glyphicon-refresh',
				panelMessageArray: [
					{
						label: "Here are your Teams",
						text: ""
					}
				],
				panelMessagePlayIndex: 0,
				teamObj: {
					dummyRepo: ['JohnDoe']
				},
				currentlyOnline: []
			})
		})
	})

	describe('REMOVE_TEAM_MEMBER', () => {
		it('remove a team member from the state', () => {
			expect(
				teamReducer({
				activeTeamMember: 1,
				activeTeam: '',
				activeEvents: [],
				team: [],
				icon: 'glyphicon glyphicon-refresh',
				panelMessageArray: [
					{
						label: "Here are your Teams",
						text: ""
					}
				],
				panelMessagePlayIndex: 0,
				teamObj: {
					dummyRepo: ['JohnDoe', 'JaneDoe']
				},
				currentlyOnline: []
			}, {
					type: 'REMOVE_TEAM_MEMBER',
					repoId: 'dummyRepo',
					id: 'JohnDoe'
				})
			).to.deep.equal({
				activeTeamMember: 1,
				activeTeam: '',
				activeEvents: [],
				team: [],
				icon: 'glyphicon glyphicon-refresh',
				panelMessageArray: [
					{
						label: "Here are your Teams",
						text: ""
					}
				],
				panelMessagePlayIndex: 0,
				teamObj: {
					dummyRepo: ['JaneDoe']
				},
				currentlyOnline: []
			})
		})
	})

	describe('GET_USER_CHANGES', () => {
		it('fetch a user\'s events', () => {
			expect(
				teamReducer(undefined, {
					type: 'GET_USER_CHANGES',
					userEvents: ['dummyevent1', 'dummyevent2']
				})
			).to.deep.equal({
				activeTeamMember: 1,
				activeTeam: '',
				activeEvents: ['dummyevent1', 'dummyevent2'],
				team: [],
				icon: 'glyphicon glyphicon-refresh',
				panelMessageArray: [
					{
						label: "Here are your Teams",
						text: ""
					}
				],
				panelMessagePlayIndex: 0,
				teamObj: {},
				currentlyOnline: []
			})
		})
	})

	describe('REFRESH_ONLINE', () => {
		it('refresh online team members', () => {
			expect(
				teamReducer(undefined, {
					type: 'REFRESH_ONLINE',
					currentlyOnline: ['JohnDoe', 'JaneDoe']
				})
			).to.deep.equal({
				activeTeamMember: 1,
				activeTeam: '',
				activeEvents: [],
				team: [],
				icon: 'glyphicon glyphicon-refresh',
				panelMessageArray: [
					{
						label: "Here are your Teams",
						text: ""
					}
				],
				panelMessagePlayIndex: 0,
				teamObj: {},
				currentlyOnline: ['JohnDoe', 'JaneDoe']
			})
		})
	})

	describe('REFRESH_TEAM_MEMBERS', () => {
		it('refresh complete list of team members for each repo', () => {
			expect(
				teamReducer(undefined, {
					type: 'REFRESH_TEAM_MEMBERS',
					channels: [{
						repoId: 'DummyRepo1',
						users: [{
							name: 'John'
						}, {
							name: 'Jane'
						}]
					}, {
						repoId: 'DummyRepo2',
						users: [{
							name: 'Jim'
						}, {
							name: 'Jan'
						}]
					}]
				})
			).to.deep.equal({
				activeTeamMember: 1,
				activeTeam: '',
				activeEvents: [],
				team: [],
				icon: 'glyphicon glyphicon-refresh',
				panelMessageArray: [
					{
						label: "Here are your Teams",
						text: ""
					}
				],
				panelMessagePlayIndex: 0,
				teamObj: {
					DummyRepo1: ['John', 'Jane'],
					DummyRepo2: ['Jim', 'Jan']
				},
				currentlyOnline: []
			})
		})
	})
})
