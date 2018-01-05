import Bullet from './Bullet';
import Particle from './Particle';
import { rotatePoint, randomNumBetween, doExplode } from '../../util/helpers';
import { PW } from '../../util/powerUpHelper';
import { PLAYLIST } from '../../util/soundHelper';

export default class Ship {
  constructor(args) {
    this.iAm = 'ship'
    this.position = args.position
    this.velocity = {
      x: 0,
      y: 0
    }
    this.rotation = 90;
    this.rotationSpeed = 6;
    this.speed = 0.15;
    this.inertia = 0.99;
    this.radius = 20;
    this.bulletRadius = 2;
    this.lastShot = 0;
    this.shotFrequency = 300;
    this.create = args.create;
    this.onDie = args.onDie;
    this.invencible = false;
    this.superShip = false;
    this.bounceSkill = false;
    this.multiBulletSkill = false;
    this.fireRingSkill = false;
    this.useShield = args.useShield;
  }

  destroy(){
    this.delete = true;
    this.onDie();

    // Explode
    doExplode(this.radius, this.position, this.create);
  }

  isShieldEnabled() {
    return (this.invencible);
  }

  enableSuperBullets() {
    this.bulletRadius = 40;
    this.shotFrequency = 700;
  }

  enableFastBullets() {
    this.shotFrequency = 100;
  }

  enableSuperShip() {
    this.superShip = true;
    this.radius = 30;
  }

  enableShipSpeed() {
    this.speed = 0.1;
  }

  enableBounceBullets() {
    this.shotFrequency = 700;
    this.bounceSkill = true;
  }

  enableMultiBullets() {
    this.multiBulletSkill = true;
  }

  enableFireRing(){
    this.disableAllPowerUp();
    this.fireRingSkill = true;
  }

  disableAllPowerUp() {
    this.bulletRadius = 2;
    this.shotFrequency = 300;
    this.superShip = false;
    this.radius = 20;
    this.speed = 0.15;
    this.bounceSkill = false;
    this.multiBulletSkill = false;
    this.fireRingSkill = false;
  }

  /*rotate(dir){
    if (dir == 'LEFT') {
      if (this.rotation > 20) {
        this.rotation -= this.rotationSpeed;
      }
    }
    if (dir == 'RIGHT') {
      if (this.rotation < 160) {
        this.rotation += this.rotationSpeed;
      }
    }
  }*/

  accelerate(val){
    //this.velocity.x -= Math.sin(-this.rotation*Math.PI/180) * this.speed;
    //this.velocity.y -= Math.cos(-this.rotation*Math.PI/180) * this.speed;

    // Thruster particles
    let posDelta = rotatePoint({x:0, y:-10}, {x:0,y:0}, (this.rotation-180) * Math.PI / 180);
    const particle = new Particle({
      lifeSpan: randomNumBetween(20, 40),
      size: randomNumBetween(1, 3),
      position: {
        x: this.position.x + posDelta.x + randomNumBetween(-2, 2),
        y: this.position.y + posDelta.y + randomNumBetween(-2, 2)
      },
      velocity: {
        x: posDelta.x / randomNumBetween(3, 5),
        y: posDelta.y / randomNumBetween(3, 5)
      }
    });
    this.create(particle, 'particles');
  }

  fireBullet(){
    let bulletArrayDirectionsX = [0];
    if(this.multiBulletSkill) {
      bulletArrayDirectionsX = [-5, 0, 5];
    }
    if(this.fireRingSkill) {
      bulletArrayDirectionsX = [-30, -25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30];
    }

    for (var index = 0; index < bulletArrayDirectionsX.length; index++) {
      var directionValueX = bulletArrayDirectionsX[index];
      const bullet = new Bullet({
        shipRotation: this.rotation,
        shipPosition: this.position,
        radius: this.bulletRadius,
        directionValueX : directionValueX,
        bounce : this.bounceSkill,
        color: this.setBulletColor(),
        iAm: 'shipBullet'
      });
      this.create(bullet, 'bullets');
    }
    this.setBulletSound();
    this.lastShot = Date.now();
  }

  setBulletColor() {
    let color = 'yellow'

    if(this.bounceSkill) {
      color = PW.BOUNCE_BULLET.color
    } else if (this.multiBulletSkill) {
      color = PW.MULTI_BULLET.color
    } else if(this.shotFrequency == 700) {
      color = PW.SUPER_BULLET.color
    } else if(this.shotFrequency == 100) {
      color = PW.FAST_BULLET.color
    } else if(this.fireRingSkill) {
      color = PW.FIRE_RING.color
    }
    return color
  }

  setBulletSound() {
    let bulletSound = PLAYLIST.BULLET;

    if(this.bounceSkill) {
      bulletSound = PLAYLIST.BOUNCE_BULLET;
    } else if (this.multiBulletSkill) {
      bulletSound = PLAYLIST.MULTI_BULLET;
    } else if(this.shotFrequency == 700) {
      bulletSound = PLAYLIST.SUPER_BULLET;
    } else if(this.shotFrequency == 100) {
      bulletSound = PLAYLIST.FAST_BULLET;
    } else if(this.fireRingSkill) {
      bulletSound = PLAYLIST.FIRE_RING;
    }
    bulletSound.play();
  }

  render(state){
    let colorStroke = 'red';
    this.invencible = false;

    // Controls
    /*if(state.keys.up){
      this.accelerate(1);
    }*/
    this.accelerate(1);
    if(!PLAYLIST.SHIP.playing())
			PLAYLIST.SHIP.play();

    if((state.keys.right)) {
      //DOWN
      this.velocity.y += this.speed;
    }
    if((state.keys.left)) {
      //UP
      this.velocity.y -= this.speed;
    }
    if(state.keys.shoot && Date.now() - this.lastShot > this.shotFrequency){
      this.fireBullet();
    }
    if(state.keys.shield){
      if(this.useShield()) {
        colorStroke = 'blue';
        this.invencible = true;
      } else {
        this.invencible = false;
      }
    }

    // Move
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.velocity.x *= this.inertia;
    this.velocity.y *= this.inertia;

    // Rotation
    if (this.rotation >= 360) {
      this.rotation -= 360;
    }
    if (this.rotation < 0) {
      this.rotation += 360;
    }

    // Screen edges
    if(this.position.x > state.screen.width) this.position.x = 0;
    else if(this.position.x < 0) this.position.x = state.screen.width;
    if(this.position.y > state.screen.height) this.position.y = 0;
    else if(this.position.y < 0) this.position.y = state.screen.height;

    // Draw
    const context = state.context;
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(this.rotation * Math.PI / 180);
    context.strokeStyle = colorStroke;
    context.fillStyle = 'Black';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(0, -15);
    if(this.superShip) {
      context.lineTo(25, 50);
      context.lineTo(15, 42);
      context.lineTo(-15, 42);
      context.lineTo(-25, 50);
    } else {
      context.lineTo(10, 10);
      context.lineTo(5, 7);
      context.lineTo(-5, 7);
      context.lineTo(-10, 10);
    }
    context.closePath();
    context.fill();
    context.stroke();
    context.restore();
  }
}
