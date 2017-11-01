import React, { Component } from 'react';
import Ship from './Ship';
import Asteroid from './Asteroid';
import PowerUp from './PowerUp';
import { randomNumBetweenExcluding, randomNumBetween } from './util/helpers';
import { PW, getRandomPowerUp, showNotification } from './util/powerUpHelper';

import Notifications from 'react-notify-toast'
import FaShield from 'react-icons/lib/fa/shield'
import MdAccessAlarm from 'react-icons/lib/md/access-alarm'
import MdGpsFixed from 'react-icons/lib/md/gps-fixed'
import MdStars from 'react-icons/lib/md/stars'
import MdStarOutline from 'react-icons/lib/md/star-outline'
import MdArrowBack from 'react-icons/lib/md/arrow-back'
import MdArrowDownward from 'react-icons/lib/md/arrow-downward'
import MdArrowForward from 'react-icons/lib/md/arrow-forward'
import MdArrowUpward from 'react-icons/lib/md/arrow-upward'


const KEY = {
  LEFT:  37,
  RIGHT: 39,
  UP: 38,
  A: 65,
  D: 68,
  W: 87,
  S: 83,
  SPACE: 32,
  DOWN: 40
};

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
      currentScore: 0,
      currentShield: 100,
      topScore: localStorage['topscore'] || 0,
      inGame: false,
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
    let target = e.target.id;

    if(value === 'mouseDown' || value === 'touchStart') {
      if(target === 'up') keys.up = true;
      if(target === 'left') keys.left = true;
      if(target === 'right') keys.right = true;
      if(target === 'space') keys.space = true;
      if(target === 'down') keys.down = true;
    } else if(value === 'mouseUp' || value === 'touchEnd') {
      if(target === 'up') keys.up = false;
      if(target === 'left') keys.left = false;
      if(target === 'right') keys.right = false;
      if(target === 'space') keys.space = false;
      if(target === 'down') keys.down = false;
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
    this.startGame();
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
    if(this.state.inGame && !this.asteroids.length){
      let asteroidCount = this.state.asteroidCount + 1;
      let powerUpCount = Math.floor(asteroidCount / 2);
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
    if(this.state.inGame){
      this.setState({
        currentScore: this.state.currentScore + points,
        currentShield: this.state.currentShield,
      });
    }
  }

  increaseShield(points=30){
    if(this.state.inGame){
      this.setState({
        currentShield: this.state.currentShield + points,
      });
    }
    showNotification(PW.SHIELD.color, PW.SHIELD.text)
  }

  increaseTimeCounter(time=5){
    if(this.state.inGame){
      this.setState({
        timeValue: this.state.timeValue + time
      });
    }
  }

  startGame(){
    this.setState({
      inGame: true,
      currentScore: 0,
      currentShield: 100
    });

    // Make ship
    let ship = new Ship({
      position: {
        x: this.state.screen.width/2,
        y: this.state.screen.height/2
      },
      create: this.createObject.bind(this),
      onDie: this.gameOver.bind(this)
    });
    this.createObject(ship, 'ship');

    // Make asteroids
    this.asteroids = [];
    this.generateAsteroids(this.state.asteroidCount);

    this.powerUps = [];
    let powerUpCount = Math.floor(this.state.asteroidCount / 2);
    this.generatePowerUp(powerUpCount)
    //this.generatePowerUp(15);
  }

  gameOver(){
    this.setState({
      inGame: false,
    });

    // Replace top score
    if(this.state.currentScore > this.state.topScore){
      this.setState({
        topScore: this.state.currentScore,
      });
      localStorage['topscore'] = this.state.currentScore;
    }
  }

  generateAsteroids(howMany){
    let asteroids = [];
    let ship = this.ship[0];
    for (let i = 0; i < howMany; i++) {
      let asteroid = new Asteroid({
        size: randomNumBetween(10, 80),
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
            switch(item1.getPowerUpType()) {
              case PW.SHIELD:
                this.increaseShield();
                break;
              case PW.SUPER_BULLET:
                this.startTimer(item2);
                item2.enableSuperBullets();
                break;
              case PW.FAST_BULLET:
                this.startTimer(item2);
                item2.enableFastBullets();
                break;
              case PW.BIG_SHIP:
                this.startTimer(item2, 5);
                item2.enableSuperShip();
                break;
              case PW.SPEED:
                this.startTimer(item2);
                item2.enableShipSpeed();
                break;
              case PW.BOUNCE_BULLET:
                this.startTimer(item2, 5);
                item2.enableBounceBullets();
                break;
              case PW.MULTI_BULLET:
                this.startTimer(item2, 15);
                item2.enableMultiBullets();
                break;
              case PW.TIME_BONUS:
                showNotification(PW.TIME_BONUS.color, PW.TIME_BONUS.text)
                this.increaseTimeCounter();
                break;
              case PW.FIRE_RING:
                showNotification(PW.FIRE_RING.color, PW.FIRE_RING.text)
                this.startTimer(item2, 5);
                item2.enableFireRing();
                break;
              default:
            }
            item1.destroy();
          } else {
            item1.destroy();
            item2.destroy();
          }
        }
      }
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
    let endgame;
    let message;

    if (this.state.currentScore <= 0) {
      message = '0 points... So sad.';
    } else if (this.state.currentScore >= this.state.topScore){
      message = 'Top score with ' + this.state.currentScore + ' points. Woo!';
    } else {
      message = this.state.currentScore + ' Points though :)'
    }

    if(!this.state.inGame){
      endgame = (
        <div className='endgame'>
          <p>Game over, man!</p>
          <p>{message}</p>
          <button
            onClick={ this.startGame.bind(this) }>
            try again?
          </button>
        </div>
      )
    }

    let events = {
			onTouchStart: this.handleTouch.bind(this, 'touchStart'),
      onTouchEnd: this.handleTouch.bind(this, 'touchEnd'),
			onMouseDown: this.handleTouch.bind(this, 'mouseDown'),
			onMouseUp: this.handleTouch.bind(this, 'mouseUp')
    };

    return (
      <div>
        { endgame }
        <span className='score top-score'>    <MdStars /> Top Score: {this.state.topScore}</span>
        <span className='score current-score'><MdStarOutline /> Score: {this.state.currentScore}</span>
        <span className='score shield-score'> <FaShield /> Shield: {Math.floor((this.state.currentShield))}</span>
        <span className='score time-score'>   <MdAccessAlarm /> Time: {this.state.timeValue} seg</span>
        <span className='controls-info'>
          Use [A][W][D] or [<MdArrowBack />][<MdArrowUpward />][<MdArrowForward />] to MOVE<br/>
          Use [SPACE] to SHOOT<br/>
          Use [S] or [<MdArrowDownward />] to SHIELD
        </span>
        <Notifications />

        {/*
        <span className='controls c-direction' >
          <button id='left' {...events}><MdArrowBack /></button>
          <button id='up' {...events}><MdArrowUpward /></button>
          <button id='right' {...events}><MdArrowForward /></button>
        </span>
        <span className='controls c-fire' >
          <button id='space' {...events}><MdGpsFixed /></button>
        </span>
        <span className='controls c-shield' >
          <button id='down' {...events}><FaShield /></button>
        </span>
        */}

        <canvas ref='canvas'
          width={this.state.screen.width * this.state.screen.ratio}
          height={this.state.screen.height * this.state.screen.ratio}
        />
      </div>
    );
  }
}
