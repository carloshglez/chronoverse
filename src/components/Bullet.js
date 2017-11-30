import { rotatePoint } from '../util/helpers';

export default class Bullet {
  constructor(args) {
    this.iAm = args.iAm
    this.rotation = args.shipRotation;
    let posDelta = rotatePoint({x:args.directionValueX, y:-20}, {x:0,y:0}, this.rotation * Math.PI / 180);
    this.position = {
      x: args.shipPosition.x + posDelta.x,
      y: args.shipPosition.y + posDelta.y
    };
    this.velocity = {
      x:posDelta.x / 2,
      y:posDelta.y / 2
    };
    this.radius = args.radius;
    this.bounce = args.bounce;
    this.color = args.color;
  }

  destroy(){
    this.delete = true;
  }

  render(state){
    // Move
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;


    if (this.bounce) {
      //Bounce them!
      if(  this.position.x < 0
        || this.position.x > state.screen.width) {
        this.velocity.x *= (-1);
      }
      if(  this.position.y < 0
        || this.position.y > state.screen.height) {
        this.velocity.y *= (-1);
      }
    } else {
      // Delete if it goes out of bounds
      if ( this.position.x < 0
        || this.position.y < 0
        || this.position.x > state.screen.width
        || this.position.y > state.screen.height ) {
          this.destroy();
      }
    }

    // Draw
    const context = state.context;
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(this.rotation * Math.PI / 180);
    context.fillStyle = this.color;
    context.lineWidth = 0.5;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
    context.restore();
  }
}
