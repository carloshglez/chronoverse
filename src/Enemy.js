import Particle from './Particle';
import { randomNumBetween, doExplode } from './util/helpers';

export default class Enemy {
  constructor(args) {
    this.ship = args.ship;
    this.type = args.type;
    this.position = args.position
    this.velocity = {
      x: randomNumBetween(-1.5, 1.5),
      y: randomNumBetween(-1.5, 1.5)
    }
    this.rotation = 0;
    this.rotationSpeed = 6;
    this.speed = 0.15;
    this.inertia = 0.99;
    this.radius = 20;
    this.lastAcc = 0;
    this.accFrequency = 250;
    this.create = args.create;
    this.addScore = args.addScore;
  }

  destroy(){
    this.delete = true;
    this.addScore(100);

    // Explode
    doExplode(this.radius, this.position, this.create);
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

  moveAsHunter(){
    if (Date.now() - this.lastAcc > this.accFrequency) {
      this.velocity.x -= Math.sin(-this.rotation * Math.PI / 180) * this.speed;
      this.velocity.y -= Math.cos(-this.rotation * Math.PI / 180) * this.speed;
      this.lastAcc = Date.now();
      this.accFrequency = randomNumBetween(100, 250);
    }
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.velocity.x *= this.inertia;
    this.velocity.y *= this.inertia;
  }

  moveAsExplorer(){
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  isEnemy(){
    return true;
  }

  render(state){
    // Move
    if(this.type === 1) {
      this.moveAsExplorer();
    }
    if(this.type === 2) {
      this.moveAsHunter();
    }

    // Rotation
    this.rotate();

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
    context.strokeStyle = 'Lime';
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
