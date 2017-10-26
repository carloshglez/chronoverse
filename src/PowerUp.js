import Particle from './Particle';
import { randomNumBetween, doExplode, PW } from './util/helpers';

export default class PowerUp {
  constructor(args) {
    this.type = args.type;
    this.position = args.position;
    this.rotation = 0;
    this.velocity = {
        x: randomNumBetween(-1.5, 1.5),
        y: randomNumBetween(-1.5, 1.5)
      }
    this.radius = 10;
    this.create = args.create;
  }

  destroy(){
    this.delete = true;

    // Explode
    doExplode(this.radius, this.position, this.create);
  }

  getPowerUpType() {
    return this.type;
  }

  render(state){
    // Move
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Screen edges
    if(this.position.x > state.screen.width + this.radius) this.position.x = -this.radius;
    else if(this.position.x < -this.radius) this.position.x = state.screen.width + this.radius;
    if(this.position.y > state.screen.height + this.radius) this.position.y = -this.radius;
    else if(this.position.y < -this.radius) this.position.y = state.screen.height + this.radius;

    // Draw
    const context = state.context;
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(this.rotation * Math.PI / 180);
    context.fillStyle = this.type.color;
    context.lineWidth = 0,5;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
    context.restore();
  }
}
