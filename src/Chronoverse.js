import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Intro from './views/Intro';
import SelectGame from './views/SelectGame';
import EndGame from './views/EndGame';
import About from './views/About';
import Awards from './views/Awards';
import Settings from './views/Settings';

import ControlPanel from './views/panels/ControlPanel';
import ScorePanel from './views/panels/ScorePanel';
import ButtonsPanelClassic from './views/panels/ButtonsPanelClassic';
import ButtonsPanelSpaceRace from './views/panels/ButtonsPanelSpaceRace';

import Factory from './factory';
import { LocalStorageManager } from './util/localStorageHelper';
import { updateInnerStrings } from './util/helpers';
import { KEY, GAME_STATE } from './util/constants';
import { GAME_MODE } from './util/factoryHelper';
import { PLAYLIST } from './util/soundHelper';

export default class Chronoverse extends Component {
	constructor(props) {
		super(props);
		this.actions = props.actions;

		this.appVersion = '1.2.8';
		this.ship = [];
		this.asteroids = [];
		this.bullets = [];
		this.particles = [];
		this.powerUps = [];
		this.enemies = [];
		this.lastShield = 0;
		this.lastSensorValue =  this.getState().screen.height / 2;

		let factoryInit = {
			screenWidth: window.innerWidth,
			screenHeight: window.innerHeight,
			createObject: this.createObject.bind(this),
			gameOver: this.gameOver.bind(this),
			useShield: this.useShield.bind(this),
			addScore: this.addScore.bind(this),
			setAsteroidCount: this.actions.setAsteroidCount.bind(this),
			setEnemyCount: this.actions.setEnemyCount.bind(this),
			setPowerUpCount: this.actions.setPowerUpCount.bind(this)
		};
		this.factory = new Factory(factoryInit);
	}

	getState() {
		return this.props.state;
	}

	initLanguage(value = 'en') {
		this.actions.setGameLang(value);
		/*Handle update for strings inside const objects*/
		updateInnerStrings();
	}

	componentDidMount() {
		window.addEventListener('keyup', this.handleKeys.bind(this, false));
		window.addEventListener('keydown', this.handleKeys.bind(this, true));
		window.addEventListener('resize', this.handleResize.bind(this, false));
		window.addEventListener('deviceorientation', this.handleDeviceOrientation.bind(this, true));

		const context = this.refs.canvas.getContext('2d');
		this.actions.setContext(context);
		this.initLanguage();
		requestAnimationFrame(() => { this.update() });
	}

	componentWillUnmount() {
		window.removeEventListener('keyup', this.handleKeys);
		window.removeEventListener('keydown', this.handleKeys);
		window.removeEventListener('resize', this.handleResize);
		window.removeEventListener('deviceorientation', this.handleDeviceOrientation);
	}

	update() {
		const context = this.getState().context;
		const keys = this.getState().keys;
		const ship = this.ship[0];

		context.save();
		context.scale(this.getState().screen.ratio, this.getState().screen.ratio);

		// Motion trail
		context.fillStyle = 'Black';
		context.globalAlpha = 0.4;
		context.fillRect(0, 0, this.getState().screen.width, this.getState().screen.height);
		context.globalAlpha = 1;

		// Next set of elements
		this.factory.nextSetOfComponents(this.getState().stats.currentScore, this.getState().enemyCount, this.getState().asteroidCount, 
			this.powerUps, this.asteroids, this.enemies);

		// Check for colisions
		this.checkCollisionsWith(this.bullets, this.asteroids);
		this.checkCollisionsWith(this.bullets, this.enemies);
		this.checkCollisionsWith(this.ship, this.bullets);
		this.checkCollisionsWith(this.ship, this.asteroids);
		this.checkCollisionsWith(this.ship, this.enemies);
		this.checkCollisionsWith(this.ship, this.powerUps);

		// Remove or render
		this.updateObjects(this.particles, 'particles')
		this.updateObjects(this.asteroids, 'asteroids')
		this.updateObjects(this.bullets, 'bullets')
		this.updateObjects(this.ship, 'ship')
		this.updateObjects(this.powerUps, 'powerUps')
		this.updateObjects(this.enemies, 'enemies')

		context.restore();

		// Next frame
		requestAnimationFrame(() => { this.update() });
	}

	handleResize(value, e) {
		this.actions.setScreen(
			{
				width: window.innerWidth,
				height: window.innerHeight,
				ratio: window.devicePixelRatio || 1,
			}
		);
	}

	handleKeys(value, e) {
		if (this.isInGame()) {
			let keys = this.getState().keys;
			if (e.keyCode === KEY.LEFT || e.keyCode === KEY.A) keys.left = value;
			if (e.keyCode === KEY.RIGHT || e.keyCode === KEY.D) keys.right = value;
			if (e.keyCode === KEY.UP || e.keyCode === KEY.W) keys.up = value;
			if (e.keyCode === KEY.SHIELD || e.keyCode === KEY.S) keys.shield = value;
			if (e.keyCode === KEY.SHOOT) keys.shoot = value;
			this.actions.setEventKeys(keys);
		}
	}

	getTouchEvents() {
		let touchEvents = {
			onTouchStart: this.handleTouch.bind(this, 'touchStart'),
			onTouchEnd: this.handleTouch.bind(this, 'touchEnd'),
			onMouseDown: this.handleTouch.bind(this, 'mouseDown'),
			onMouseUp: this.handleTouch.bind(this, 'mouseUp')
		};
		return touchEvents;
	}

	handleTouch(value, e) {
		if (this.isInGame()) {
			let keys = this.getState().keys;
			let action = e.currentTarget.id;

			if (value === 'mouseDown' || value === 'touchStart') {
				keys[action] = true;
			} else if (value === 'mouseUp' || value === 'touchEnd') {
				keys[action] = false;
			}
			this.actions.setEventKeys(keys);
		}
	}

	handleDeviceOrientation(value, e) {
		if (this.getState().game.inSpaceRaceGame) {
			var maxY = this.getState().screen.height - 20;
			var y = e.gamma + 90;
			let sensorValue = Math.floor((maxY*y/180));

			let keys = this.getState().keys;
			if(sensorValue > this.lastSensorValue) {
				//UP
				keys.left = true;
				keys.right = false;
			} else if(sensorValue < this.lastSensorValue) {
				//DOWN
				keys.left = false;
				keys.right = true;
			} else {
				keys.left = false;
				keys.right = false;
			}
			this.lastSensorValue = sensorValue;
			this.actions.setEventKeys(keys);
		}
	}

	createObject(item, group) {
		this[group].push(item);
		if (group === 'bullets' && item.iAm == 'shipBullet') {
			this.addBulletsFired();
		}
	}

	updateObjects(items, group) {
		let index = 0;
		for (let item of items) {
			if (item.delete) {
				if (group === 'asteroids') this.addAsteroidsDestroyed();
				if (group === 'enemies') this.addEnemiesDestroyed();
				this[group].splice(index, 1);
			} else {
				items[index].render(this.getState());
			}
			index++;
		}
	}

	checkCollisionsWith(items1, items2) {
		var a = items1.length - 1;
		var b;
		for (a; a > -1; --a) {
			b = items2.length - 1;
			for (b; b > -1; --b) {
				var item1 = items1[a];
				var item2 = items2[b];
				if (this.checkCollision(item1, item2)) {
					this.resolveCollision(item1, item2);
				}
			}
		}
	}

	checkCollision(obj1, obj2) {
		var vx = obj1.position.x - obj2.position.x;
		var vy = obj1.position.y - obj2.position.y;
		var length = Math.sqrt(vx * vx + vy * vy);
		if (length < obj1.radius + obj2.radius) {
			return true;
		}
		return false;
	}

	resolveCollision(item1, item2) {
		if (item1.iAm === 'ship') {
			if (item2.iAm === 'asteroid' || item2.iAm === 'enemy' || item2.iAm === 'enemyBullet') {
				if (!item1.isShieldEnabled()) {
					if (this.getState().game.inBattleGame && this.getState().stats.currentLife > 0) {
						this.useLife(20);
					} else {
						item1.destroy();
					}
				}
				item2.destroy();
			}
			if (item2.iAm === 'powerUp') {
				this.addPowerUpUsage();
				item2.getPowerUpType().apply(this, item1);
				item2.destroy();
			}
		}
		if (item1.iAm === 'shipBullet') {
			if (item2.iAm === 'asteroid' || item2.iAm === 'enemy') {
				this.addBulletsHit();
				item1.destroy();
				item2.destroy();
			}
		}
	}

	isInGame() {
		return (this.getState().game.inClassicGame || this.getState().game.inSpaceRaceGame || this.getState().game.inBattleGame);
	}

	addScore(points) {
		if (this.isInGame()) {
			this.actions.setCurrentScore(this.getState().stats.currentScore + points);
		}
	}

	useLife(value) {
		if (this.isInGame()) {
			this.actions.setCurrentLife(this.getState().stats.currentLife - value);
			if (this.getState().stats.currentLife <= 20) {
				PLAYLIST.LIFE_WARNING.play();
			}
		}
	}

	useShield() {
		if (this.isInGame()) {
			if (this.getState().stats.currentShield > 0) {
				let shieldFrecuency = 150;
				if(Date.now() - this.lastShield > shieldFrecuency){
					this.actions.setCurrentShield(this.getState().stats.currentShield - 1);
					this.actions.setShieldUsage(this.getState().stats.shieldUsage + 1);
					this.lastShield = Date.now();

					if(!PLAYLIST.SHIELD.playing())
						PLAYLIST.SHIELD.play();
				}
				return true;
			} else {
				if(!PLAYLIST.SHIELD_OUT.playing())
					PLAYLIST.SHIELD_OUT.play();
			}
		}
		return false;
	}

	increaseShield(value) {
		if (this.isInGame()) {
			this.actions.setCurrentShield(this.getState().stats.currentShield + value);
		}
	}

	increaseTimeCounter(time) {
		if (this.isInGame()) {
			this.actions.setTimeValue(this.getState().timeValue + time);
		}
	}

	startTimer(item, time) {
		this.increaseTimeCounter(time);
		clearInterval(this.timerID);
		this.timerID = setInterval(
			() => this.tick(item),
			1000
		);
	}

	tick(item) {
		if (this.getState().timeValue > 0) {
			this.actions.setTimeValue(this.getState().timeValue - 1);
		} else {
			clearInterval(this.timerID);
			item.disableAllPowerUp();
		}
	}

	addAsteroidsDestroyed() {
		if (this.isInGame()) {
			this.actions.setAsteroidsDestroyed(this.getState().stats.asteroidsDestroyed + 1);
			PLAYLIST.EXPLOSION.play();
		}
	}

	addEnemiesDestroyed() {
		if (this.isInGame()) {
			this.actions.setEnemiesDestroyed(this.getState().stats.enemiesDestroyed + 1);
			PLAYLIST.EXPLOSION.play();
		}
	}

	addBulletsFired() {
		if (this.isInGame()) {
			this.actions.setBulletsFired(this.getState().stats.bulletsFired + 1);
		}
	}

	addBulletsHit() {
		if (this.isInGame()) {
			this.actions.setBulletsHit(this.getState().stats.bulletsHit + 1);
		}
	}

	addPowerUpUsage() {
		if (this.isInGame()) {
			this.actions.setPowerUpUsage(this.getState().stats.powerUpUsage + 1);
			PLAYLIST.POWERUP.play();
		}
	}

	updateTopScore() {
		if (this.getState().stats.currentScore > this.getState().stats.topScoreInUse) {
			if (this.getState().game.inClassicGame) {
				LocalStorageManager.setClassicTopScore(this.getState().stats.currentScore);
				this.actions.setTopScoreClassic(this.getState().stats.currentScore);
			}
			if (this.getState().game.inSpaceRaceGame) {
				LocalStorageManager.setSpaceRaceTopScore(this.getState().stats.currentScore);
				this.actions.setTopScoreSpaceRace(this.getState().stats.currentScore);
			}
			if (this.getState().game.inBattleGame) {
				LocalStorageManager.setBattleTopScore(this.getState().stats.currentScore);
				this.actions.setTopScoreBattle(this.getState().stats.currentScore);
			}
		}
	}

	resetGameCounters() {
		this.actions.setAsteroidCount(0);
		this.actions.setPowerUpCount(0);
		this.actions.setEnemyCount(0);
		this.actions.setTimeValue(0);
	}
	resetStats() {
		this.actions.setAsteroidsDestroyed(0);
		this.actions.setEnemiesDestroyed(0);
		this.actions.setBulletsFired(0);
		this.actions.setBulletsHit(0);
		this.actions.setPowerUpUsage(0);
		this.actions.setShieldUsage(0);
		this.actions.setCurrentShield(100);
		this.actions.setCurrentLife(100);
		this.actions.setCurrentScore(0);
		this.actions.setTopScoreInUse(0);
		this.actions.setTopScoreClassic(LocalStorageManager.getClassicTopScore());
		this.actions.setTopScoreSpaceRace(LocalStorageManager.getSpaceRaceTopScore());
		this.actions.setTopScoreBattle(LocalStorageManager.getBattleTopScore());
	}

	setIntro() {
		this.actions.setGameState(GAME_STATE.INTRO);

		this.actions.resetEventKeys();
		this.resetGameCounters();
		this.resetStats();
	}

	setGameOptions() {
		this.actions.setGameState(GAME_STATE.SELECT);

		this.actions.resetEventKeys();
		this.resetGameCounters();
		this.resetStats();
	}

	startClassicGame() {
		this.actions.setGameState(GAME_STATE.CLASSIC);
		this.factory.setGameMode(GAME_MODE.CLASSIC);

		this.asteroids = [];
		this.bullets = [];
		this.powerUps = [];
		this.enemies = [];
		this.actions.setTopScoreInUse(this.getState().stats.topScoreClassic);
		this.factory.generateShip();
	}

	startSpaceRaceGame() {
		this.actions.setGameState(GAME_STATE.SPACE_RACE);
		this.factory.setGameMode(GAME_MODE.SPACE_RACE);

		this.asteroids = [];
		this.bullets = [];
		this.powerUps = [];
		this.enemies = [];
		this.actions.setTopScoreInUse(this.getState().stats.topScoreSpaceRace);
		this.factory.generateShip();
	}

	startBattleGame() {
		this.actions.setGameState(GAME_STATE.BATTLE);
		this.factory.setGameMode(GAME_MODE.BATTLE);

		this.asteroids = [];
		this.bullets = [];
		this.powerUps = [];
		this.enemies = [];
		this.actions.setTopScoreInUse(this.getState().stats.topScoreBattle);
		this.factory.generateShip();
	}

	gameOver() {
		// Replace top score
		this.updateTopScore();

		this.actions.setGameState(GAME_STATE.OVER);
	}

	displayAbout() {
		this.actions.setGameState(GAME_STATE.ABOUT);
	}

	displayAwards() {
		this.actions.setGameState(GAME_STATE.AWARDS);
	}

	displaySettings() {
		this.actions.setGameState(GAME_STATE.SETTINGS);
	}

	render() {
		let introGame;
		let selectGame;
		let controlPanel;
		let endGame;
		let about;
		let awards;
		let settings;

		if (this.getState().game.intro) {
			introGame = <Intro
				appversion={this.appVersion}
				gameOptions={this.setGameOptions.bind(this)} />
		}
		if (this.getState().game.select) {
			selectGame = <SelectGame
				displayAbout={this.displayAbout.bind(this)}
				displayAwards={this.displayAwards.bind(this)}
				displaySettings={this.displaySettings.bind(this)}
				startClassicGame={this.startClassicGame.bind(this)}
				startSpaceRaceGame={this.startSpaceRaceGame.bind(this)}
				startBattleGame={this.startBattleGame.bind(this)} />
		}
		if (this.isInGame()) {
			let buttonsPanel;
			let scorePanel = <ScorePanel
				inBattleGame={this.getState().game.inBattleGame}
				topScore={this.getState().stats.topScoreInUse}
				currentScore={this.getState().stats.currentScore}
				currentShield={this.getState().stats.currentShield}
				currentLife={this.getState().stats.currentLife}
				currentTime={this.getState().timeValue} />

			if (this.getState().game.inClassicGame || this.getState().game.inBattleGame) {
				buttonsPanel = <ButtonsPanelClassic
					customEvents={this.getTouchEvents()}
					currentShield={this.getState().stats.currentShield} />
			}
			if (this.getState().game.inSpaceRaceGame) {
				buttonsPanel = <ButtonsPanelSpaceRace
					customEvents={this.getTouchEvents()}
					currentShield={this.getState().stats.currentShield} />
			}
			controlPanel = <ControlPanel
				scorePanel={scorePanel}
				buttonsPanel={buttonsPanel} />
		}
		if (this.getState().game.over) {
			endGame = <EndGame
				stats={this.getState().stats}
				retryOption={this.setGameOptions.bind(this)}
				setIntro={this.setIntro.bind(this)} />
		}
		if (this.getState().game.about) {
			about = <About
				gameOptions={this.setGameOptions.bind(this)}
				appversion={this.appVersion} />
		}
		if (this.getState().game.awards) {
			awards = <Awards
				gameOptions={this.setGameOptions.bind(this)} />
		}
		if (this.getState().game.settings) {
			settings = <Settings
				soundValue={this.getState().sound}
				langValue={this.getState().language}
				updateSound={this.actions.setGameSound}
				updateLang={this.initLanguage.bind(this)}
				gameOptions={this.setGameOptions.bind(this)} />
		}

		//console.log('STATE: ' + JSON.stringify(this.getState()) + '#');
		return (
			<div>
				{/*
					<div className='debugLabel'>
					{JSON.stringify(this.getState())}
					</div>
				*/}
				{introGame}
				{selectGame}
				{controlPanel}
				{endGame}
				{about}
				{awards}
				{settings}

				<canvas ref='canvas'
					width={this.getState().screen.width * this.getState().screen.ratio}
					height={this.getState().screen.height * this.getState().screen.ratio} />
			</div>
		);
	}
}
Chronoverse.contextTypes = {
	store: PropTypes.object
}
