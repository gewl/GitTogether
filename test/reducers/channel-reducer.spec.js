import { expect } from 'chai';
import channelReducer from '../../app/reducers/channel-reducer.js'

describe('channel reducer', () => {
	it('should return the initial state', () => {
		expect(
			channelReducer(undefined, {})
		).to.deep.equal({
			icon: 'glyphicon glyphicon-tasks',
			panelMessageArray: [
				{
					label: "Here are your Channels",
					text: "Channel"
				}
			],
			channels: [],
			panelMessagePlayIndex: 0,
			activeChannelId: 'repoOwner/repoName',
		})
	})

	describe('on LOAD_CHANNEL', () => {
		it('add a user\'s channels to the state', () => {
			expect(
				channelReducer(undefined, {
					type: 'LOAD_CHANNELS',
					channels: ['newChannel1', 'newChannel2']
				})
			).to.deep.equal({
				icon: 'glyphicon glyphicon-tasks',
				panelMessageArray: [
					{
						label: "Here are your Channels",
						text: "Channel"
					}
				],
				channels: ['newChannel1', 'newChannel2'],
				panelMessagePlayIndex: 0,
				activeChannelId: 'repoOwner/repoName',
			})
		})
	})
})
