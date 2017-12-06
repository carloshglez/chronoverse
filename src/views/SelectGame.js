import React from 'react';
import IScroll from 'iscroll'
import '../styles/style.css';
import '../styles/selectGame.css';
import MdStars from 'react-icons/lib/md/stars'
import MdArrowBack from 'react-icons/lib/md/arrow-back'

import { isPassive } from '../util/helpers';

export default class SelectGame extends React.Component {
	componentDidMount() {
		var myScroll = new IScroll(this.refs.wrapper, { scrollX: true, scrollY: false, mouseWheel: true });

		window.addEventListener('touchmove', function (e) { e.preventDefault(); },
			isPassive() ? {
				capture: false,
				passive: false
			} : false
		);
	}

	componentWillUnmount() {
		window.removeEventListener('touchmove', function (e) { e.preventDefault(); });
	}

	render() {
		return (
			<div>
				<div className='selectgame'>
					<h3>Select a Game:</h3>
				</div>
				<div id='wrapper' ref='wrapper'>
					<div id='scroller'>
						<ul>
							<li>
								<button
									className='infoButton'
									onClick={this.props.startClassicGame}>
									Classic
								</button>
								<div>
									<MdStars /> Top Score:
									<div>{this.props.stats.topScoreClassic}</div>
								</div>
							</li>
							<li>
								<button
									className='infoButton'
									onClick={this.props.startSpaceRaceGame}>
									Space Race
								</button>
								<div>
									<MdStars /> Top Score:
									<div>{this.props.stats.topScoreSpaceRace}</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}
