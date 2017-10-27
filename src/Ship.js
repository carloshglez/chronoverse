import Bullet from './Bullet';
import Particle from './Particle';
import { rotatePoint, randomNumBetween, doExplode } from './util/helpers';
import { PW, showNotification } from './util/powerUpHelper';

export default class Ship {
  constructor(args) {
    this.position = args.position
    this.velocity = {
      x: 0,
      y: 0
    }
    this.rotation = 0;
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
    this.bigShip = false;
    this.bounceSkill = false;
    this.multiBulletSkill = false;
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
    showNotification(PW.BIG_BULLET.color, PW.BIG_BULLET.text)
  }

  enableFastBullets() {
    this.shotFrequency = 100;
    showNotification(PW.FAST_BULLET.color, PW.FAST_BULLET.text)
  }

  enableBigShip() {
    this.bigShip = true;
    showNotification(PW.BIG_SHIP.color, PW.BIG_SHIP.text)
  }

  enableShipSpeed() {
    this.speed = 0.45;
    showNotification(PW.SPEED.color, PW.SPEED.text)
  }

  enableBounceBullets() {
    this.shotFrequency = 700;
    this.bounceSkill = true;
    showNotification(PW.BOUNCE_BULLET.color, PW.BOUNCE_BULLET.text)
  }

  enableMultiBullets() {
    this.multiBulletSkill = true;
    showNotification(PW.MULTI_BULLET.color, PW.MULTI_BULLET.text)
  }

  disableAllPowerUp() {
    this.bulletRadius = 2;
    this.shotFrequency = 300;
    this.bigShip = false;
    this.speed = 0.15;
    this.bounceSkill = false;
    this.multiBulletSkill = false;
  }

  rotate(dir){
    if (dir == 'LEFT') {
      this.rotation -= this.rotationSpeed;
    }
    if (dir == 'RIGHT') {
      this.rotation += this.rotationSpeed;
    }
  }

  accelerate(val){
    this.velocity.x -= Math.sin(-this.rotation*Math.PI/180) * this.speed;
    this.velocity.y -= Math.cos(-this.rotation*Math.PI/180) * this.speed;

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

  fireBullet() {
    let bulletArrayDirections = [0];
    if(this.multiBulletSkill) {
      bulletArrayDirections = [0, -5, 5];
      //bulletArrayDirections = [0, 5, 10, 15, 20, 25, -5, -10, -15, -20, -25];
    }

    for (var index = 0; index < bulletArrayDirections.length; index++) {
      var directionValue = bulletArrayDirections[index];
      const bullet = new Bullet({
        ship: this,
        radius: this.bulletRadius,
        direction : directionValue,
        bounce : this.bounceSkill
      });
      this.create(bullet, 'bullets');
    }
    this.lastShot = Date.now();
  }

  render(state){
    let colorStroke = 'red';
    this.invencible = false;

    // Controls
    if(state.keys.up){
      this.accelerate(1);
    }
    if(state.keys.left){
      this.rotate('LEFT');
    }
    if(state.keys.right){
      this.rotate('RIGHT');
    }
    if(state.keys.space && Date.now() - this.lastShot > this.shotFrequency){
      this.fireBullet();
    }
    if(state.keys.down){
      if(state.currentShield > 0) {
        state.currentShield = state.currentShield - 0.1;
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
    context.fillStyle = '#000000';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(0, -15);
    if(this.bigShip) {
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
