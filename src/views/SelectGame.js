import React from 'react';
import IScroll from 'iscroll'
//import IScroll from '../../node_modules/iscroll/build/iscroll-probe.js'
import '../styles/style.css';
import '../styles/selectGame.css';
import MdStars from 'react-icons/lib/md/stars'
import MdArrowBack from 'react-icons/lib/md/arrow-back'

import { isPassive, isMobileDevice } from '../util/helpers';

export default class SelectGame extends React.Component {
	constructor() {
		super();
		this.myScroll = null;
	}

	componentDidMount() {
		if(isMobileDevice()) {
			this.myScroll = new IScroll(this.refs.wrapper, { scrollX: true, scrollY: false, probeType: 3 });
			window.addEventListener('touchmove', function (e) { e.preventDefault(); },
				isPassive() ? {
					capture: false,
					passive: false
				} : false
			);
			/*this.myScroll.on('scroll', this.goBackToIntro.bind(this, this.myScroll));
			this.myScroll.on('scrollEnd', this.goBackToIntro.bind(this, this.myScroll));*/
		}
	}

	componentWillUnmount() {
		if(isMobileDevice()) {
			this.destroy();
		}
	}

	destroy() {
		window.removeEventListener('touchmove', function (e) { e.preventDefault(); });
		this.myScroll.destroy();
		this.myScroll = null;
	}

	/*goBackToIntro(iScroll) {
		if(iScroll.x > 300) {
			iScroll.destroy();
			this.props.setIntro();
		}
	}*/

	render() {
		return (
			<div>
				<div className='selectgame'>
					<h3>Select a Game:</h3>
				</div>
				<div id='wrapper' className='wrapper-sg' ref='wrapper'>
					<div id='scroller' className='scroller-sg'>
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
