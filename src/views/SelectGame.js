import React from 'react';
import IScroll from 'iscroll'
//import IScroll from '../../node_modules/iscroll/build/iscroll-probe.js'

import '../styles/style.css';
import '../styles/selectGame.css';

import MdStars from 'react-icons/lib/md/stars'
import MdArrowBack from 'react-icons/lib/md/arrow-back'
import MdLock from 'react-icons/lib/md/lock'
import MdInfo from 'react-icons/lib/md/info'
import FaTrophy from 'react-icons/lib/fa/trophy'
import { isPassive, isMobileDevice } from '../util/helpers';
import { GAME_RULES } from '../util/constants';
import { PLAYLIST } from '../util/soundHelper';
import { getStorageClassicTopScore, getStorageSpaceRaceTopScore} from '../util/localStorageHelper';

export default class SelectGame extends React.Component {
	constructor(props) {
		super(props);
		this.myScroll = null;

		GAME_RULES.CLASSIC.onClickEvent = props.startClassicGame;
		GAME_RULES.CLASSIC.topScore = getStorageClassicTopScore();
		GAME_RULES.SPACE_RACE.onClickEvent = props.startSpaceRaceGame;
		GAME_RULES.SPACE_RACE.topScore = getStorageSpaceRaceTopScore();
	}

	componentDidMount() {
		if (isMobileDevice()) {
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
		if (isMobileDevice()) {
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

	playDisableSound() {
		PLAYLIST.OPTION_DISABLED.play();
	}

	getGameSelection(game, enabled) {
		let gameButton;
		let gameInfo;
		let topScoreLabel = <div><MdStars /> Top Score:</div>;

		gameButton = <button
				className='infoButton'
				onClick={(enabled) ? game.onClickEvent : this.playDisableSound.bind(this)}>
				{game.title}
			</button>

		gameInfo = <div>
				{(enabled) ? topScoreLabel : <MdLock />}
				<div>{(enabled) ? game.topScore : game.unlockMessage}</div>
			</div>

		return (
			<li>
				{gameButton}
				{gameInfo}
			</li>
		);
	}

	render() {
		return (
			<div>
				<div className='iconPanel upper-corner-left-first'>
					<FaTrophy onClick={this.props.displayAwards}/>
				</div>
				<div className='iconPanel upper-corner-right-first'>
					<MdInfo onClick={this.props.displayAbout}/>
				</div>

				<div className='selectgame'>
					<h3>Select a Game:</h3>
				</div>
				<div id='wrapper' className='wrapper-sg' ref='wrapper'>
					<div id='scroller' className='scroller-sg'>
						<ul>
							{this.getGameSelection(GAME_RULES.CLASSIC,
								(GAME_RULES.CLASSIC.topScore >= GAME_RULES.CLASSIC.unlockAt))
							}
							{this.getGameSelection(GAME_RULES.SPACE_RACE,
								(GAME_RULES.CLASSIC.topScore >= GAME_RULES.SPACE_RACE.unlockAt))
							}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}
