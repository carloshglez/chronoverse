import React from 'react';

import Notifications from 'react-notify-toast'
import FaShield from 'react-icons/lib/fa/shield'
import MdAccessAlarm from 'react-icons/lib/md/access-alarm'
import MdGpsFixed from 'react-icons/lib/md/gps-fixed'
import MdStars from 'react-icons/lib/md/stars'
import MdStarOutline from 'react-icons/lib/md/star-outline'
import MdArrowBack from 'react-icons/lib/md/arrow-back'
import MdArrowDownward from 'react-icons/lib/md/arrow-downward'
import MdArrowForward from 'react-icons/lib/md/arrow-forward'
import MdArrowUpward from 'react-icons/lib/md/arrow-upward'

export default class ControlPanel extends React.Component {
	render() {
		return (
			<div>
				<div>
					<span className='score top-score'>
						<MdStars /> Top Score: {this.props.topScore}
					</span>
					<span className='score current-score'>
						<MdStarOutline /> Score: {this.props.currentScore}
					</span>
					<span className='score shield-score'>
						<FaShield /> Shield: {Math.floor((this.props.currentShield))}
					</span>
					<span className='score time-score'>
						<MdAccessAlarm /> Time: {this.props.timeValue} seg
					</span>
				</div>

				<div className='help-info'>
					Use [A][W][D] or [<MdArrowBack />][<MdArrowUpward />][<MdArrowForward />] to MOVE<br/>
					Use [SPACE] to SHOOT<br/>
					Use [S] or [<MdArrowDownward />] to SHIELD<br/>
				</div>

				<Notifications />

				<div>
					<button id='left' 	className='actionButton btnLeft' 	{...this.props.customEvents}> 	<MdArrowBack />		</button>
					<button id='up'		className='actionButton btnUp' 		{...this.props.customEvents}>	<MdArrowUpward />	</button>
					<button id='right' 	className='actionButton btnRight' 	{...this.props.customEvents}>	<MdArrowForward />	</button>
					<button id='space' 	className='actionButton btnShoot' 	{...this.props.customEvents}>	<MdGpsFixed />		</button>
					<button id='down' 	className='actionButton btnShield' 	{...this.props.customEvents}>	<FaShield />		</button>
				</div>
			</div>
		);
	}
}
