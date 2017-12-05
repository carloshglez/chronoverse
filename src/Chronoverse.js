import React, { Component } from 'react';

import Intro from './views/Intro';
import SelectGame from './views/SelectGame';
import ControlPanel from './views/ControlPanel';
import ControlPanel_sp from './views/ControlPanel_sp';
import EndGame from './views/EndGame';
import FactoryClassic from './classic/Factory';
import FactorySpaceRace from './spaceRace/Factory';

import { KEY } from './util/helpers';

export class Chronoverse extends Component {
	constructor() {
		super();
		this.state = {
			screen: {
				width: window.innerWidth,
				height: window.innerHeight,
				ratio: window.devicePixelRatio || 1
			},
			context: null,
			keys: {
				left: 0,
				right: 0,
				up: 0,
				shield: 0,
				shoot: 0
			},
			asteroidCount: 0,
			powerUpCount: 0,
			enemyCount: 0,
			timeValue: 0,
			stats: {
				bulletsFired: 0,
				bulletsHit: 0,
				powerUpUsage: 0,
				shieldUsage: 0,
				currentShield: 100,
				currentScore: 0,
				topScoreInUse: 0,
				topScoreClassic: localStorage['topscore'] || 0,
				topScoreSpaceRace: localStorage['topscore_sp'] || 0
			},
			game: {
				intro: true,
				select: false,
				inClassicGame: false,
				inSpaceRaceGame: false,
				over: false
			}
		}
		this.ship = [];
		this.asteroids = [];
		this.bullets = [];
		this.particles = [];
		this.powerUps = [];
		this.enemies = [];

		let factoryInit = {
			screenWidth: window.innerWidth,
			screenHeight: window.innerHeight,
			createObject: this.createObject.bind(this),
			gameOver: this.gameOver.bind(this),
			useShield: this.useShield.bind(this),
			addScore: this.addScore.bind(this),
			setAsteroidCount: this.setAsteroidCount.bind(this),
			setEnemyCount: this.setEnemyCount.bind(this),
			setPowerUpCount: this.setPowerUpCount.bind(this)
		};

		this.factoryClassic = new FactoryClassic(factoryInit);
		this.factorySpaceRace = new FactorySpaceRace(factoryInit);
	}

	setScreen() {
		this.setState({
			screen: {
				width: window.innerWidth,
				height: window.innerHeight,
				ratio: window.devicePixelRatio || 1,
			}
		});
	}
	setEventKeys(keys) {
		this.setState({ keys: keys });
	}
	setContext(context) {
		this.setState({ context: context });
	}
	setAsteroidCount(count) {
		this.setState({ asteroidCount: count });
	}
	setPowerUpCount(count) {
		this.setState({ powerUp: count });
	}
	setEnemyCount(count) {
		this.setState({ enemyCount: count });
	}
	setTimeValue(value) {
		this.setState({ timeValue: value });
	}
	setGameState(gameState) {
		this.setState({
			game: {
				intro: (gameState === 'intro') ? true : false,
				select: (gameState === 'select') ? true : false,
				inClassicGame: (gameState === 'inClassicGame') ? true : false,
				inSpaceRaceGame: (gameState === 'inSpaceRaceGame') ? true : false,
				over: (gameState === 'over') ? true : false,
			}
		});
	}
	resetEventKeys() {
		this.setState({ keys: {
			left: 0,
			right: 0,
			up: 0,
			shield: 0,
			shoot: 0
		} });
	}
	resetGameCounters() {
		this.setAsteroidCount(0);
		this.setPowerUpCount(0);
		this.setEnemyCount(0);
		this.setTimeValue(0);
	}
	resetStats() {
		this.setState({
			stats: {
				bulletsFired: 0,
				bulletsHit: 0,
				powerUpUsage: 0,
				shieldUsage: 0,
				currentShield: 100,
				currentScore: 0,
				topScoreInUse: 0,
				topScoreClassic: localStorage['topscore'] || 0,
				topScoreSpaceRace: localStorage['topscore_sp'] || 0
			}
		});
	}
	setBulletsFired(value) {
		this.setState({
			stats: { ...this.state.stats, bulletsFired: value }
		});
	}
	setBulletsHit(value) {
		this.setState({
			stats: { ...this.state.stats, bulletsHit: value }
		});
	}
	setPowerUpUsage(value) {
		this.setState({
			stats: { ...this.state.stats, powerUpUsage: value }
		});
	}
	setShieldUsage(value) {
		this.setState({
			stats: { ...this.state.stats, shieldUsage: value }
		});
	}
	setCurrentShield(value) {
		this.setState({
			stats: { ...this.state.stats, currentShield: value }
		});
	}
	setCurrentScore(value) {
		this.setState({
			stats: { ...this.state.stats, currentScore: value }
		});
	}
	setTopScoreInUse(value) {
		this.setState({
			stats: { ...this.state.stats, topScoreInUse: value }
		});
	}
	setClassicTopScore(value) {
		this.setState({
			stats: { ...this.state.stats, topScoreClassic: value }
		});
	}
	setSpaceRaceTopScore(value) {
		this.setState({
			stats: { ...this.state.stats, topScoreSpaceRace: value }
		});
	}

	componentDidMount() {
		window.addEventListener('keyup', this.handleKeys.bind(this, false));
		window.addEventListener('keydown', this.handleKeys.bind(this, true));
		window.addEventListener('resize', this.handleResize.bind(this, false));

		const context = this.refs.canvas.getContext('2d');
		this.setContext(context);
		requestAnimationFrame(() => { this.update() });
	}

	componentWillUnmount() {
		window.removeEventListener('keyup', this.handleKeys);
		window.removeEventListener('keydown', this.handleKeys);
		window.removeEventListener('resize', this.handleResize);
	}

	update() {
		const context = this.state.context;
		const keys = this.state.keys;
		const ship = this.ship[0];

		context.save();
		context.scale(this.state.screen.ratio, this.state.screen.ratio);

		// Motion trail
		context.fillStyle = 'Black';
		context.globalAlpha = 0.4;
		context.fillRect(0, 0, this.state.screen.width, this.state.screen.height);
		context.globalAlpha = 1;

		// Next set of elements
		if (this.state.game.inClassicGame && !this.asteroids.length) {
			this.factoryClassic.nextSetOfComponents(this.state.stats.currentScore, this.state.enemyCount, this.state.asteroidCount, this.powerUps);
		}
		if (this.state.game.inSpaceRaceGame && !this.asteroids.length) {
			this.factorySpaceRace.nextSetOfComponents(this.state.stats.currentScore, this.state.enemyCount, this.state.asteroidCount, this.powerUps);
		}

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
		this.setScreen()
	}

	handleKeys(value, e) {
		let keys = this.state.keys;
		if (e.keyCode === KEY.LEFT || e.keyCode === KEY.A) keys.left = value;
		if (e.keyCode === KEY.RIGHT || e.keyCode === KEY.D) keys.right = value;
		if (e.keyCode === KEY.UP || e.keyCode === KEY.W) keys.up = value;
		if (e.keyCode === KEY.SHIELD || e.keyCode === KEY.S) keys.shield = value;
		if (e.keyCode === KEY.SHOOT) keys.shoot = value;
		this.setEventKeys(keys);
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
		let keys = this.state.keys;
		let action = e.currentTarget.id;

		if (value === 'mouseDown' || value === 'touchStart') {
			keys[action] = true;
		} else if (value === 'mouseUp' || value === 'touchEnd') {
			keys[action] = false;
		}
		this.setEventKeys(keys);
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
				this[group].splice(index, 1);
			} else {
				items[index].render(this.state);
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
					item1.destroy();
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
		return (this.state.game.inClassicGame || this.state.game.inSpaceRaceGame);
	}

	addScore(points) {
		if (this.isInGame()) {
			this.setCurrentScore(this.state.stats.currentScore + points);
		}
	}

	useShield() {
		if (this.isInGame()) {
			if (this.state.stats.currentShield > 1) {
				this.setCurrentShield(this.state.stats.currentShield - 0.1);
				this.setShieldUsage(this.state.stats.currentShield + 0.1);
				return true;
			}
		}
		return false;
	}

	increaseShield() {
		if (this.isInGame()) {
			this.setCurrentShield(this.state.stats.currentShield + 30);
		}
	}

	increaseTimeCounter(time = 5) {
		if (this.isInGame()) {
			this.setTimeValue(this.state.timeValue + time);
		}
	}

	startTimer(item, time = 10) {
		this.increaseTimeCounter(time);
		clearInterval(this.timerID);
		this.timerID = setInterval(
			() => this.tick(item),
			1000
		);
	}

	tick(item) {
		if (this.state.timeValue > 0) {
			this.setTimeValue(this.state.timeValue - 1);
		} else {
			clearInterval(this.timerID);
			item.disableAllPowerUp();
		}
	}

	addBulletsFired() {
		if (this.isInGame()) {
			this.setBulletsFired(this.state.stats.bulletsFired + 1);
		}
	}

	addBulletsHit() {
		if (this.isInGame()) {
			this.setBulletsHit(this.state.stats.bulletsHit + 1);
		}
	}

	addPowerUpUsage() {
		if (this.isInGame()) {
			this.setPowerUpUsage(this.state.stats.powerUpUsage + 1);
		}
	}

	updateTopScore(game) {
		if (this.state.stats.currentScore > this.state.stats.topScoreInUse) {
			if (game === 1) {
				localStorage['topscore'] = this.state.stats.currentScore;
				//this.setTopScoreInUse(this.state.stats.currentScore);
				this.setClassicTopScore(this.state.stats.currentScore);
			}
			if (game === 2) {
				localStorage['topscore_sp'] = this.state.stats.currentScore;
				//this.setTopScoreInUse(this.state.stats.currentScore);
				this.setSpaceRaceTopScore(this.state.stats.currentScore);
			}
		}
	}

	setIntro() {
		this.setGameState('intro');

		this.resetEventKeys();
		this.resetGameCounters();
		this.resetStats();
	}

	setGameOptions() {
		this.setGameState('select');

		this.resetEventKeys();
		this.resetGameCounters();
		this.resetStats();
	}

	startClassicGame() {
		this.setGameState('inClassicGame');

		this.asteroids = [];
		this.powerUps = [];
		this.enemies = [];
		this.setTopScoreInUse(this.state.stats.topScoreClassic);
		this.factoryClassic.generateShip();
	}

	startSpaceRaceGame() {
		this.setGameState('inSpaceRaceGame');

		this.asteroids = [];
		this.powerUps = [];
		this.enemies = [];
		this.setTopScoreInUse(this.state.stats.topScoreSpaceRace);
		this.factorySpaceRace.generateShip();
	}

	gameOver() {
		// Replace top score
		if(this.state.game.inClassicGame)
			this.updateTopScore(1);
		if(this.state.game.inSpaceRaceGame)
			this.updateTopScore(2);

		this.setGameState('over');
	}

	render() {
		let introGame;
		let selectGame;
		let controlPanel;
		let endGame;

		if (this.state.game.intro) {
			introGame = <Intro
				gameOptions={this.setGameOptions.bind(this)}/>
		}
		if (this.state.game.select) {
			selectGame = <SelectGame
				stats={this.state.stats}
				startClassicGame={this.startClassicGame.bind(this)}
				startSpaceRaceGame={this.startSpaceRaceGame.bind(this)}/>
		}
		if (this.state.game.inClassicGame) {
			controlPanel = <ControlPanel
				stats={this.state.stats}
				timeValue={this.state.timeValue}
				customEvents={this.getTouchEvents()}/>
		}
		if (this.state.game.inSpaceRaceGame) {
			controlPanel = <ControlPanel_sp
				stats={this.state.stats}
				timeValue={this.state.timeValue}
				customEvents={this.getTouchEvents()}/>
		}
		if (this.state.game.over) {
			endGame = <EndGame
				stats={this.state.stats}
				retryOption={this.setGameOptions.bind(this)}
				setIntro={this.setIntro.bind(this)}/>
		}

		return (
			<div>
				{/*
					<div className='debugLabel'>
					{JSON.stringify(this.factoryClassic)}
					</div>
				*/}
				{introGame}
				{selectGame}
				{endGame}
				{controlPanel}

				<canvas ref='canvas'
					width={this.state.screen.width * this.state.screen.ratio}
					height={this.state.screen.height * this.state.screen.ratio}/>
			</div>
		);
	}
}
