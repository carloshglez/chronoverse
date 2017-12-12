import React from 'react';
import '../styles/style.css';
import '../styles/endGame.css';

import FaRepeat from 'react-icons/lib/fa/repeat'
import MdExitToApp from 'react-icons/lib/md/exit-to-app'
import FaTrophy from 'react-icons/lib/fa/trophy'
import { evaluateResults } from '../util/awardsHelper';

export default class EndGame extends React.Component {
	constructor() {
		super();
		this.gotAward;
	}

	componentWillMount() {
		//Verify if an award has been won
		let newAward = evaluateResults(this.props.stats);
		this.gotAward = (newAward) ? (<div><div className='got-award'><FaTrophy/></div>¡You won an award!</div>) : null;
	}

	render() {
		let message
        if (this.props.stats.currentScore <= 0) {
		  	message = '0 points... So sad.'
        } else if (this.props.stats.currentScore >= this.props.stats.topScoreInUse){
          	message = 'You got a New Record!'
		} else {
			message = 'Good Job! :)'
		}

		let hitPercentaje = 0
		if (this.props.stats.bulletsFired > 0) {
			hitPercentaje = (Math.floor((this.props.stats.bulletsHit*100) / this.props.stats.bulletsFired))
		}

		return (
      		<div className='endgame'>
				<div className='stats'>
					<div className='stat-title'>
						<h4>Results:</h4>
						<p>
							Bullets Fired:<br/>
							Bullets Hit:<br/>
							Hit Percentaje:<br/>
							<br/>
							Shield Usage:<br/>
							Power-Up Usage:<br/>
							<br/>
							Top Score:<br/>
							Your Score:<br/>
						</p>
						<hr/>
						<b>&nbsp;{ message }</b>
					</div>
					<div className='stat-value'>
						<h3>&nbsp;</h3>
						<p>
							{this.props.stats.bulletsFired}	<br/>
							{this.props.stats.bulletsHit}	<br/>
							{hitPercentaje}%				<br/>
							<br/>
							{Math.floor(this.props.stats.shieldUsage + 0.9)}	<br/>
							{this.props.stats.powerUpUsage}	<br/>
							<br/>
							{this.props.stats.topScoreInUse}		<br/>
							{this.props.stats.currentScore}	<br/>
						</p>
					</div>
				</div>
				<div className='retry'>
					<h3>Game Over!</h3>
					<button
						className='infoButton'
						onClick={ this.props.retryOption }>
						<FaRepeat/> Try again?
					</button>
					<button
						className='infoButton'
						onClick={ this.props.setIntro }>
						<MdExitToApp/> Exit
					</button>
					{this.gotAward}
				</div>
            </div>
		);
	}
}
