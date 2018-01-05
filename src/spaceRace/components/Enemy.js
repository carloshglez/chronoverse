import Particle from './Particle';
import Bullet from './Bullet';
import { ENEMY_TYPE } from '../../util/constants';
import { PLAYLIST } from '../../util/soundHelper';
import { randomNumBetween, doExplode } from '../../util/helpers';

export default class Enemy {
  constructor(args) {
    this.iAm = 'enemy'
    this.ship = args.ship;
    this.type = args.type;
    this.position = args.position;
    this.velocity = {
      x: randomNumBetween(0.1, 1.5),
      y: randomNumBetween(-1.5, 1.5)
    };
    this.rotation = 0;
    this.rotationSpeed = 6;
    this.speed = 0.15;
    this.inertia = 0.99;
    this.radius = 20;
    this.lastAcc = 0;
    this.accFrequency = 250;
    this.lastShot = Date.now();
    this.shotFrequency = 3000;
    this.create = args.create;
    this.addScore = args.addScore;
    this.color = 'Lime'
  }

  destroy(){
    this.delete = true;
    this.addScore(100);

    // Explode
    doExplode(this.radius, this.position, this.create, this.color);
    PLAYLIST.ENEMY_EXPLOSION.play();
  }

  rotate(){
    let distX = this.ship.position.x - this.position.x;
    let distY = this.ship.position.y - this.position.y;
    let angleRadians = Math.atan2(distY, distX);
    this.rotation = angleRadians * 180 / Math.PI;

    if (this.rotation >= 360) {
      this.rotation -= 360;
    }
    if (this.rotation < 0) {
      this.rotation += 360;
    }

    this.rotation += this.rotationSpeed + 80;
  }

  moveAsHunter(state){
    if (Date.now() - this.lastAcc > this.accFrequency) {
      this.velocity.x -= Math.sin(-this.rotation * Math.PI / 180) * this.speed;
      this.velocity.y -= Math.cos(-this.rotation * Math.PI / 180) * this.speed;
      this.lastAcc = Date.now();
      this.accFrequency = randomNumBetween(100, 250);
    }

    let distX = this.position.x - this.ship.position.x;
    if (distX > state.screen.width / 2) {
      this.position.x += this.velocity.x;
      this.velocity.x *= this.inertia;
    }
    this.position.y += this.velocity.y;
    this.velocity.y *= this.inertia;
  }

  moveAsExplorer(){
    this.position.x -= this.velocity.x;
    this.position.y += this.velocity.y;
  }

  shoot(){
    if (Date.now() - this.lastShot > this.shotFrequency) {
      let bulletArrayDirectionsX = [0];
      for (var index = 0; index < bulletArrayDirectionsX.length; index++) {
        var directionValueX = bulletArrayDirectionsX[index];
        const bullet = new Bullet({
          shipRotation: this.rotation,
          shipPosition: this.position,
          radius: 2,
          directionValueX : directionValueX,
          bounce : false,
          color: this.color,
          iAm: 'enemyBullet'
        });
        this.create(bullet, 'bullets');
      }
      if(this.type === ENEMY_TYPE.EXPLORER) PLAYLIST.ENEMY_SHOOT_EXPLORER.play();
      if(this.type === ENEMY_TYPE.HUNTER) PLAYLIST.ENEMY_SHOOT_HUNTER.play();
      this.lastShot = Date.now();
    }
  }

  render(state){
    // Move
    if(this.type === ENEMY_TYPE.EXPLORER) this.moveAsExplorer();
    if(this.type === ENEMY_TYPE.HUNTER) this.moveAsHunter(state);

    // Rotation
    this.rotate();

    //Attack
    if(!this.ship.delete) {
      //Attack if player ship is alive
      this.shoot();
    } else {
      //Otherwise, become explorer enemy.
      this.type = ENEMY_TYPE.EXPLORER;
    }

    // Screen edges
    /*if(this.position.x > state.screen.width) this.position.x = 0;
    else */
    if(this.position.x < 0) this.position.x = state.screen.width;
    if(this.position.y > state.screen.height) this.position.y = 0;
    else if(this.position.y < 0) this.position.y = state.screen.height;

    // Draw
    const context = state.context;
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(this.rotation * Math.PI / 180);
    context.strokeStyle = this.color;
    context.fillStyle = 'Black';
    context.lineWidth = 2;

    context.beginPath();
    context.moveTo(0, -15);
    context.lineTo(10, 10);
    context.lineTo(5, 7);
    context.lineTo(-5, 7);
    context.lineTo(-10, 10);
    context.closePath();

    context.fill();
    context.stroke();
    context.restore();
  }
}
