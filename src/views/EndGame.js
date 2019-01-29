import React from 'react';
import '../styles/style.css';
import '../styles/endGame.css';

import FaRepeat from 'react-icons/lib/fa/repeat'
import MdExitToApp from 'react-icons/lib/md/exit-to-app'
import FaTrophy from 'react-icons/lib/fa/trophy'
import { evaluateResults } from '../util/awardsHelper';
import { PLAYLIST } from '../util/soundHelper';
import { strings } from '../util/strings';

export default class EndGame extends React.Component {
	constructor() {
		super();
		this.gotAward;
	}

	componentWillMount() {
		//Verify if an award has been won
		let newAward = evaluateResults(this.props.stats);
		this.gotAward = (newAward) ? (<div><div className='got-award'><FaTrophy/></div>{strings.lbMsgAwardWon}</div>) : null;

		PLAYLIST.END_GAME.play();
	}

	componentWillUnmount() {
		PLAYLIST.OPTION_SELECT.play();
	}

	render() {
		let message
        if (this.props.stats.currentScore <= 0) {
		  	message = strings.lbNoPoints
        } else if (this.props.stats.currentScore >= this.props.stats.topScoreInUse){
          	message = strings.lbNewRecord
		} else {
			message = strings.lbGoodJob
		}

		let hitPercentaje = 0
		if (this.props.stats.bulletsFired > 0) {
			hitPercentaje = (Math.floor((this.props.stats.bulletsHit*100) / this.props.stats.bulletsFired))
		}

		return (
      		<div className='endgame'>
				<div className='stats'>
					<div className='stat-title'>
						<h4>{strings.lbResults}</h4>
						<p>
							{strings.lbBulletsFired}<br/>
							{strings.lbBulletsHit}<br/>
							{strings.lbHitPercentaje}<br/>
							<br/>
							{strings.lbShieldUsage}<br/>
							{strings.lbPowerUpUsage}<br/>
							<br/>
							{strings.lbTopScore}<br/>
							{strings.lbYourScore}<br/>
						</p>
						<hr/>
						<b>&nbsp;{ message }</b>
					</div>
					<div className='stat-value'>
						<h3>&nbsp;</h3>
						<p>
							{new Intl.NumberFormat("en-EN").format(this.props.stats.bulletsFired)}	<br/>
							{new Intl.NumberFormat("en-EN").format(this.props.stats.bulletsHit)}	<br/>
							{hitPercentaje}%				<br/>
							<br/>
							{this.props.stats.shieldUsage}	<br/>
							{this.props.stats.powerUpUsage}	<br/>
							<br/>
							{new Intl.NumberFormat("en-EN").format(this.props.stats.topScoreInUse)}	<br/>
							{new Intl.NumberFormat("en-EN").format(this.props.stats.currentScore)}	<br/>
						</p>
					</div>
				</div>
				<div className='retry'>
					<h3>{strings.lbGameOver}</h3>
					<button
						className='infoButton'
						onClick={ this.props.retryOption }>
						<FaRepeat/> {strings.btTryAgain}
					</button>
					<button
						className='infoButton'
						onClick={ this.props.setIntro }>
						<MdExitToApp/> {strings.btExit}
					</button>
					{this.gotAward}
				</div>
            </div>
		);
	}
}
