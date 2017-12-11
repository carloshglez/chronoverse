import React from 'react';
import '../../styles/style.css';
import '../../styles/controlPanel.css';

import Notifications from 'react-notify-toast'

export default class ControlPanel extends React.Component {
	render() {
		return (
			<div>
				{this.props.scorePanel}
				<Notifications />
				{this.props.buttonsPanel}
			</div>
		);
	}
}
