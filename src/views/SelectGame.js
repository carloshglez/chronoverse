import React from 'react';
import IScroll from 'iscroll'
//import IScroll from '../../node_modules/iscroll/build/iscroll-probe.js'

import '../styles/style.css';
import '../styles/selectGame.css';

import MdStars from 'react-icons/lib/md/stars'
import MdSettings from 'react-icons/lib/md/settings'
import MdLock from 'react-icons/lib/md/lock'
import MdInfo from 'react-icons/lib/md/info'
import FaTrophy from 'react-icons/lib/fa/trophy'
import { isPassive } from '../util/helpers';
import { GAME_MODE } from '../util/factoryHelper';
import { PLAYLIST } from '../util/soundHelper';
import { LocalStorageManager } from '../util/localStorageHelper';
import { strings } from '../util/strings';

export default class SelectGame extends React.Component {
	constructor(props) {
		super(props);
		this.myScroll = null;

		GAME_MODE.CLASSIC.rules.onClickEvent = props.startClassicGame;
		GAME_MODE.CLASSIC.rules.topScore = LocalStorageManager.getClassicTopScore();
		GAME_MODE.SPACE_RACE.rules.onClickEvent = props.startSpaceRaceGame;
		GAME_MODE.SPACE_RACE.rules.topScore = LocalStorageManager.getSpaceRaceTopScore();
		GAME_MODE.BATTLE.rules.onClickEvent = props.startBattleGame;
		GAME_MODE.BATTLE.rules.topScore = LocalStorageManager.getBattleTopScore();
	}

	componentDidMount() {
		this.myScroll = new IScroll(this.refs.wrapper, { scrollX: true, scrollY: false, probeType: 3 });
		window.addEventListener('touchmove', function (e) { e.preventDefault(); },
			isPassive() ? {
				capture: false,
				passive: false
			} : false
		);
	}

	componentWillUnmount() {
		this.destroy();
	}

	destroy() {
		window.removeEventListener('touchmove', function (e) { e.preventDefault(); });
		this.myScroll.destroy();
		this.myScroll = null;
	}

	playDisableSound() {
		PLAYLIST.OPTION_DISABLED.play();
	}

	getGameSelection(game, enabled) {
		let gameButton;
		let gameInfo;
		let topScoreLabel = <div><MdStars /> {strings.lbTopScore}:</div>;

		gameButton = <button
				className='infoButton'
				onClick={(enabled) ? game.onClickEvent : this.playDisableSound.bind(this)}>
				{game.title}
			</button>

		gameInfo = <div>
				{(enabled) ? topScoreLabel : <MdLock />}
				<div>{(enabled) ? new Intl.NumberFormat("en-EN").format(game.topScore) : game.unlockMessage}</div>
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
				<div className='iconPanel upper-corner-left-first-2'>
					<MdSettings onClick={this.props.displaySettings}/>
				</div>
				<div className='iconPanel upper-corner-right-first'>
					<MdInfo onClick={this.props.displayAbout}/>
				</div>

				<div className='selectgame'>
					<h3>{strings.lbSelectGame}</h3>
				</div>
				<div id='wrapper' className='wrapper-sg' ref='wrapper'>
					<div id='scroller' className='scroller-sg'>
						<ul>
							{this.getGameSelection(GAME_MODE.CLASSIC.rules,
								(GAME_MODE.CLASSIC.rules.topScore >= GAME_MODE.CLASSIC.rules.unlockAt))
							}
							{this.getGameSelection(GAME_MODE.SPACE_RACE.rules,
								(GAME_MODE.CLASSIC.rules.topScore >= GAME_MODE.SPACE_RACE.rules.unlockAt))
							}
							{this.getGameSelection(GAME_MODE.BATTLE.rules,
								(parseInt(GAME_MODE.CLASSIC.rules.topScore) + parseInt(GAME_MODE.SPACE_RACE.rules.topScore) >= GAME_MODE.BATTLE.rules.unlockAt))
							}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}
