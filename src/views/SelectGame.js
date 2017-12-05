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
							onClick={ this.props.startClassicGame }>
							Classic
						</button>
						<div>
							<MdStars /> Top Score:
							<div>{this.props.stats.topScoreClassic}</div>
						</div>
					</div>
					<div className='gameOption'>
						<button
							className='infoButton'
							onClick={ this.props.startSpaceRaceGame }>
							Space Race
						</button>
						<div>
							<MdStars /> Top Score:
							<div>{this.props.stats.topScoreSpaceRace}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
