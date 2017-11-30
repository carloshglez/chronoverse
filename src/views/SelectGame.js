import React from 'react';
import '../styles/style.css';
import '../styles/selectGame.css';

import MdStars from 'react-icons/lib/md/stars'

export default class SelectGame extends React.Component {
	render() {
		return (
			<div>
				<div className='selectgame'>
					<h3>Select a Game:</h3>
				</div>
				<div className='gameOptions'>
					<div className='gameOption'>
						<button
							className='infoButton'
							onClick={ this.props.startGame }>
							Classic
						</button>
						<p>
							<MdStars /> Top Score:
							<div>{this.props.stats.topScore}</div>
						</p>
					</div>
					<div className='gameOption'>
						<button
							className='infoButton'>
							Space Race
						</button>
						<p>
							<MdStars /> Top Score:
							<div>0</div>
						</p>
					</div>
				</div>
			</div>
		);
	}
}
