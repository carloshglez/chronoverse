import { randomNumBetween, doExplode } from '../../util/helpers';

export default class PowerUp {
	constructor(args) {
		this.iAm = 'powerUp'
		this.gameMode = args.gameMode;

		this.powerUp = args.powerUp;
		this.position = args.position;
		this.rotation = 0;
		this.rotationSpeed = randomNumBetween(-1, 1);
		this.velocity = this.gameMode.getVelocity();
		this.radius = 15;
		this.create = args.create;
	}

	destroy() {
		this.delete = true;

		// Explode
		doExplode(this.radius, this.position, this.create);
	}

	getPowerUpType() {
		return this.powerUp;
	}

	render(state) {
		// Move
		let newPosition = this.gameMode.getNewPosition(this.velocity.x, this.velocity.y);
		this.position.x += newPosition.x;
		this.position.y += newPosition.y;

		// Rotation
		this.rotation += this.rotationSpeed;
		if (this.rotation >= 360) {
			this.rotation -= 360;
		}
		if (this.rotation < 0) {
			this.rotation += 360;
		}

		// Screen edges
		if (this.position.x > state.screen.width + this.radius) this.position.x = -this.radius;
		else if (this.position.x < -this.radius) this.position.x = state.screen.width + this.radius;
		if (this.position.y > state.screen.height + this.radius) this.position.y = -this.radius;
		else if (this.position.y < -this.radius) this.position.y = state.screen.height + this.radius;

		// Draw
		const context = state.context;
		context.save();
		context.translate(this.position.x, this.position.y);
		context.rotate(this.rotation * Math.PI / 180);
		context.fillStyle = this.powerUp.color;
		context.lineWidth = 0.5;

		this.powerUp.drawShape(context);

		context.fill();
		context.stroke();
		context.restore();
	}
}
