import React from 'react';
import '../../styles/style.css';
import '../../styles/controlPanel.css';

import Notifications from 'react-notify-toast'

export default class ControlPanel2 extends React.Component {
	render() {
		return (
			<div>
				{this.props.scorePanel}
				{/*
				<div className='help-info instructions'>
					Use [A][W][D] or [<MdArrowBack />][<MdArrowUpward />][<MdArrowForward />] to MOVE<br/>
					Use [SPACE] to SHOOT<br/>
					Use [S] or [<MdArrowDownward />] to SHIELD<br/>
				</div>
				*/}
				<Notifications />
				{this.props.buttonsPanel}
			</div>
		);
	}
}
