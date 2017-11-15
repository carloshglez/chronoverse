import React, { Component } from 'react';

import Intro from './components/Intro';
import ControlPanel from './components/ControlPanel';
import EndGame from './components/EndGame';

import Ship from './Ship';
import Asteroid from './Asteroid';
import PowerUp from './PowerUp';

import { KEY, randomNumBetweenExcluding, randomNumBetween } from './util/helpers';
import { PW, getRandomPowerUp } from './util/powerUpHelper';

export class Reacteroids extends Component {
  constructor() {
    super();
    this.state = {
      screen: {
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: window.devicePixelRatio || 1,
      },
      context: null,
      keys : {
        left  : 0,
        right : 0,
        up    : 0,
        down  : 0,
        space : 0,
      },
      asteroidCount: 1,
      powerUpCount: 0,
      stats: {
        bulletsFired: 0,
        bulletsHit: 0,
        powerUpUsed: 0,
        currentShield: 100,
        currentScore: 0,
        topScore: localStorage['topscore'] || 0,
      },
      game: {
        intro: true,
        inGame: false,
        over: false
      },
      timeValue: 0
    }
    this.ship = [];
    this.asteroids = [];
    this.bullets = [];
    this.particles = [];
    this.powerUps = [];
  }

  handleResize(value, e){
    this.setState({
      screen : {
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: window.devicePixelRatio || 1,
      }
    });
  }

  handleKeys(value, e){
    let keys = this.state.keys;
    if(e.keyCode === KEY.LEFT   || e.keyCode === KEY.A) keys.left  = value;
    if(e.keyCode === KEY.RIGHT  || e.keyCode === KEY.D) keys.right = value;
    if(e.keyCode === KEY.UP     || e.keyCode === KEY.W) keys.up    = value;
    if(e.keyCode === KEY.DOWN   || e.keyCode === KEY.S) keys.down = value;
    if(e.keyCode === KEY.SPACE) keys.space = value;
    this.setState({
      keys : keys
    });
  }

  handleTouch(value, e) {
    let keys = this.state.keys;
    let action = e.currentTarget.id;

    if(value === 'mouseDown' || value === 'touchStart') {
      keys[action] = true;
    } else if(value === 'mouseUp' || value === 'touchEnd') {
      keys[action] = false;
    }
    this.setState({
      keys : keys
    });
  }

  componentDidMount() {
    window.addEventListener('keyup',   this.handleKeys.bind(this, false));
    window.addEventListener('keydown', this.handleKeys.bind(this, true));
    window.addEventListener('resize',  this.handleResize.bind(this, false));

    const context = this.refs.canvas.getContext('2d');
    this.setState({ context: context });
    requestAnimationFrame(() => {this.update()});
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
    context.fillStyle = '#000';
    context.globalAlpha = 0.4;
    context.fillRect(0, 0, this.state.screen.width, this.state.screen.height);
    context.globalAlpha = 1;

    // Next set of asteroids
    if(this.state.game.inGame && !this.asteroids.length){
      let asteroidCount = this.state.asteroidCount + 1;
      let powerUpCount = Math.floor(asteroidCount / 3);
      this.setState({
        asteroidCount: asteroidCount,
        powerUpCount: powerUpCount
      });
      this.generateAsteroids(asteroidCount)
      this.generatePowerUp(powerUpCount)
    }

    // Check for colisions
    this.checkCollisionsWith(this.bullets, this.asteroids);
    this.checkCollisionsWith(this.ship, this.asteroids);
    this.checkCollisionsWith(this.powerUps, this.ship);

    // Remove or render
    this.updateObjects(this.particles, 'particles')
    this.updateObjects(this.asteroids, 'asteroids')
    this.updateObjects(this.bullets, 'bullets')
    this.updateObjects(this.ship, 'ship')
    this.updateObjects(this.powerUps, 'powerUps')

    context.restore();

    // Next frame
    requestAnimationFrame(() => {this.update()});
  }

  addScore(points){
    if(this.state.game.inGame){
      this.setState({
        stats : {
          ...this.state.stats,
          currentScore: this.state.stats.currentScore + points
        }
      });
    }
  }

  useShield() {
    if(this.state.game.inGame){
      if(this.state.stats.currentShield > 1) {
        this.setState({
          stats : {
            ...this.state.stats,
            currentShield: this.state.stats.currentShield - 0.1
          }
        });
        return true;
      }
    }
    return false;
  }

  increaseShield(){
    if(this.state.game.inGame){
      this.setState({
        stats : {
          ...this.state.stats,
          currentShield: this.state.stats.currentShield + 30
        }
      });
    }
  }

  increaseTimeCounter(time=5){
    if(this.state.game.inGame){
      this.setState({
        timeValue: this.state.timeValue + time
      });
    }
  }

  startTimer(item, time=10) {
    this.increaseTimeCounter(time);
    clearInterval(this.timerID);
    this.timerID = setInterval(
      () => this.tick(item),
      1000
    );
  }

  tick(item) {
    if (this.state.timeValue > 0) {
      this.setState({
        timeValue: this.state.timeValue - 1
      });
    } else {
      clearInterval(this.timerID);
      item.disableAllPowerUp();
    }
  }

  addBulletsFired() {
    if(this.state.game.inGame){
      this.setState({
        stats : {
          ...this.state.stats,
          bulletsFired: this.state.stats.bulletsFired + 1
        }
      });
    }
  }

  addBulletsHit() {
    if(this.state.game.inGame){
      this.setState({
        stats : {
          ...this.state.stats,
          bulletsHit: this.state.stats.bulletsHit + 1
        }
      });
    }
  }

  addPowerUpUsed() {
    if(this.state.game.inGame){
      this.setState({
        stats : {
          ...this.state.stats,
          powerUpUsed: this.state.stats.powerUpUsed + 1
        }
      });
    }
  }

  setIntro(){
    this.setState({
      game: {
        intro: true,
        inGame: false,
        over: false
      }
    });
  }

  startGame(){
    this.setState({
      asteroidCount: 1,
      powerUpCount: 0,
      timeValue: 0,
      stats: {
        bulletsFired: 0,
        bulletsHit: 0,
        powerUpUsed: 0,
        currentShield: 100,
        currentScore: 0,
        topScore: localStorage['topscore'] || 0,
      },
      keys : {
        left  : 0,
        right : 0,
        up    : 0,
        down  : 0,
        space : 0,
      },
      game: {
        intro: false,
        inGame: true,
        over: false
      }
    });

    // Make ship
    let ship = new Ship({
      position: {
        x: this.state.screen.width/2,
        y: this.state.screen.height/2
      },
      create: this.createObject.bind(this),
      onDie: this.gameOver.bind(this),
      useShield: this.useShield.bind(this)
    });
    this.createObject(ship, 'ship');

    // Make asteroids
    this.asteroids = [];
    this.generateAsteroids(this.state.asteroidCount);

    this.powerUps = [];
    let powerUpCount = Math.floor(this.state.asteroidCount / 2);
    //this.generatePowerUp(powerUpCount)
    this.generatePowerUp(15);
  }

  gameOver(){
    this.setState({
      asteroidCount: 1,
      powerUpCount: 0,
      timeValue: 0,
      keys : {
        left  : 0,
        right : 0,
        up    : 0,
        down  : 0,
        space : 0,
      },
      game: {
        intro: false,
        inGame: false,
        over: true
      }
    });

    // Replace top score
    if(this.state.stats.currentScore > this.state.stats.topScore){
      this.setState({
        stats : {
          ...this.state.stats,
          topScore: this.state.stats.currentScore
        }
      });
      localStorage['topscore'] = this.state.stats.currentScore;
    }
  }

  generateAsteroids(howMany){
    let asteroids = [];
    let ship = this.ship[0];
    for (let i = 0; i < howMany; i++) {
      let asteroid = new Asteroid({
        size: randomNumBetween(10, 60),
        position: {
          x: randomNumBetweenExcluding(0, this.state.screen.width, ship.position.x-60, ship.position.x+60),
          y: randomNumBetweenExcluding(0, this.state.screen.height, ship.position.y-60, ship.position.y+60)
        },
        create: this.createObject.bind(this),
        addScore: this.addScore.bind(this)
      });
      this.createObject(asteroid, 'asteroids');
    }
  }

  generatePowerUp(howMany){
    let PowerUps = [];
    let ship = this.ship[0];
    for (let i = 0; i < howMany; i++) {
      let powerUp = new PowerUp({
        position: {
          x: randomNumBetweenExcluding(0, this.state.screen.width, ship.position.x-60, ship.position.x+60),
          y: randomNumBetweenExcluding(0, this.state.screen.height, ship.position.y-60, ship.position.y+60)
        },
        create: this.createObject.bind(this),
        powerUp: getRandomPowerUp()
      });
      this.createObject(powerUp, 'powerUps');
    }
  }

  createObject(item, group){
    this[group].push(item);

    if(group === 'bullets') {
      this.addBulletsFired();
    }
  }

  updateObjects(items, group){
    let index = 0;
    for (let item of items) {
      if (item.delete) {
        this[group].splice(index, 1);
      }else{
        items[index].render(this.state);
      }
      index++;
    }
  }

  checkCollisionsWith(items1, items2) {
    var a = items1.length - 1;
    var b;
    for(a; a > -1; --a){
      b = items2.length - 1;
      for(b; b > -1; --b){
        var item1 = items1[a];
        var item2 = items2[b];
        if(this.checkCollision(item1, item2)) {
          if(typeof item1.isShieldEnabled == 'function' && item1.isShieldEnabled()) {
            item2.destroy();
          } else if(typeof item1.getPowerUpType == 'function') {
            this.addPowerUpUsed();
            item1.getPowerUpType().apply(this, item2);
            item1.destroy();
          } else {
            this.addBulletsHit();
            item1.destroy();
            item2.destroy();
          }
        }
      }
    }
  }

  checkCollision(obj1, obj2){
    var vx = obj1.position.x - obj2.position.x;
    var vy = obj1.position.y - obj2.position.y;
    var length = Math.sqrt(vx * vx + vy * vy);
    if(length < obj1.radius + obj2.radius){
      return true;
    }
    return false;
  }

  render() {
    let events = {
			onTouchStart: this.handleTouch.bind(this, 'touchStart'),
      onTouchEnd: this.handleTouch.bind(this, 'touchEnd'),
			onMouseDown: this.handleTouch.bind(this, 'mouseDown'),
			onMouseUp: this.handleTouch.bind(this, 'mouseUp')
    };

    let introGame;
    let controlPanel;
    let endGame;

    if(this.state.game.intro) {
      introGame = <Intro
        stats={this.state.stats}
        startGame={this.startGame.bind(this)}
      />
    }
    if(this.state.game.inGame) {
      controlPanel = <ControlPanel
        stats={this.state.stats}
        timeValue={this.state.timeValue}
        customEvents={events}
      />
    }
    if(this.state.game.over) {
      endGame = <EndGame
        stats={this.state.stats}
        startGame={this.startGame.bind(this)}
        setIntro={this.setIntro.bind(this)}
      />
    }

    return (
      <div>
        {/*
        <div className='debugLabel'>
          {JSON.stringify(this.state)}
        </div>
        */}

        { introGame }
        { endGame }
        { controlPanel }

        <canvas ref='canvas'
          width={this.state.screen.width * this.state.screen.ratio}
          height={this.state.screen.height * this.state.screen.ratio}
        />
      </div>
    );
  }
}
