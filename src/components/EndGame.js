import React from 'react';
import FaRepeat from 'react-icons/lib/fa/repeat'
import MdExitToApp from 'react-icons/lib/md/exit-to-app'

export default class EndGame extends React.Component {
	render() {
		let message = 'Good Job! :)'
        if (this.props.stats.currentScore <= 0) {
		  message = '0 points... So sad.';
        } else if (this.props.stats.currentScore >= this.props.stats.topScore){
          message = '¡¡New record!!';
		}

		let hitPercentaje = 0
		if (this.props.stats.bulletsFired > 0) {
			hitPercentaje = (Math.floor((this.props.stats.bulletsHit*100) / this.props.stats.bulletsFired))
		}

		return (
      		<div className='endgame'>
				<div className='stats'>
					<div className='stat-title'>
						<h3>Results:</h3>
						<ul>
							<li>Bullets Fired:</li>
							<li>Bullets Hit:</li>
							<li>Hit Percentaje:</li>
							<br/>
							<li>Shield:</li>
							<li>Power-Up used:</li>
							<br/>
							<li>Top Score:</li>
							<li>Your Score:</li>
						</ul>
						{ message }
					</div>
					<div className='stat-value'>
						<h3>&nbsp;</h3>
						<p>
							{this.props.stats.bulletsFired}	<br/>
							{this.props.stats.bulletsHit}	<br/>
							{hitPercentaje}%				<br/>
							<br/>
							{Math.floor(this.props.stats.currentShield)}	<br/>
							{this.props.stats.powerUpUsed}	<br/>
							<br/>
							{this.props.stats.topScore}		<br/>
							{this.props.stats.currentScore}	<br/>
						</p>
					</div>
				</div>
				<div className='retry'>
					<h3>Game Over!</h3>
					<button
						className='infoButton'
						onClick={ this.props.startGame }>
						<FaRepeat/> Try again?
					</button>
								<button
						className='infoButton'
						onClick={ this.props.setIntro }>
						<MdExitToApp/> Exit
					</button>
				</div>
            </div>
		);
	}
}
