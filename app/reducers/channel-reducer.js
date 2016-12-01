import { LOAD_CHANNELS } from '../actions/channel-actions';

export default function channel(state = {
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
  }, action) {
  switch (action.type) {
	  case LOAD_CHANNELS:
		  return {...state, channels: action.channels}
	  default:
		  return state;
  }
  }
