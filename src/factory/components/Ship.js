import Bullet from './Bullet';
import Particle from './Particle';
import { rotatePoint, randomNumBetween, doExplode, getBulletObject } from '../../util/helpers';
import { PW } from '../../util/powerUpHelper';
import { PLAYLIST } from '../../util/soundHelper';
import { GAME_MODE } from '../../util/factoryHelper';

export default class Ship {
	constructor(args) {
		this.iAm = 'ship'
		this.gameMode = args.gameMode;

		this.position = args.position
		this.velocity = {
			x: 0,
			y: 0
		}
		this.rotation = (this.gameMode === GAME_MODE.CLASSIC || this.gameMode === GAME_MODE.BATTLE) ? 0 : 90;
		this.rotationSpeed = 6;
		this.speed = 0.15;
		this.inertia = 0.99;
		this.radius = 20;
		this.bulletRadius = 2;
		this.lastShot = 0;
		this.shotFrequency = 300;
		this.create = args.create;
		this.onDie = args.onDie;
		this.shieldEnabled = false;
		this.superShip = false;
		this.bounceSkill = false;
		this.multiBulletSkill = false;
		this.fireRingSkill = false;
		this.useShield = args.useShield;
	}

	destroy() {
		this.delete = true;
		this.onDie();

		// Explode
		doExplode(this.radius, this.position, this.create);
	}

	isShieldEnabled() {
		return (this.shieldEnabled);
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
		this.speed = 0.45;
	}

	enableBounceBullets() {
		this.shotFrequency = 700;
		this.bounceSkill = true;
	}

	enableMultiBullets() {
		this.multiBulletSkill = true;
	}

	enableFireRing() {
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

	rotate(dir) {
		if (dir == 'LEFT') {
			this.rotation -= this.rotationSpeed;
		}
		if (dir == 'RIGHT') {
			this.rotation += this.rotationSpeed;
		}
	}

	accelerate(val) {
		if (this.gameMode === GAME_MODE.CLASSIC || this.gameMode === GAME_MODE.BATTLE) {
			this.velocity.x -= Math.sin(-this.rotation * Math.PI / 180) * this.speed;
			this.velocity.y -= Math.cos(-this.rotation * Math.PI / 180) * this.speed;
		}

		// Thruster particles
		let posDelta = rotatePoint({ x: 0, y: -10 }, { x: 0, y: 0 }, (this.rotation - 180) * Math.PI / 180);
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
		let bulletArrayDirectionsX = [0];
		if (this.multiBulletSkill) {
			bulletArrayDirectionsX = [-5, 0, 5];
		}
		if (this.fireRingSkill) {
			if (this.gameMode === GAME_MODE.CLASSIC || this.gameMode === GAME_MODE.BATTLE) {
				this.fireRing();
				return;
			} else {
				bulletArrayDirectionsX = [-30, -25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30];
			}
		}

		for (var index = 0; index < bulletArrayDirectionsX.length; index++) {
			var directionValueX = bulletArrayDirectionsX[index];
			const bullet = new Bullet(getBulletObject(this.rotation, this.position, this.bulletRadius, directionValueX, this.bounceSkill, this.setBulletColor(), 'shipBullet'));
			this.create(bullet, 'bullets');
		}

		this.setBulletSound();
		this.lastShot = Date.now();
	}

	fireRing() {
		this.enableFireRing();
		//let bulletArrayRotation = [-160, -140, -120, -100, -80, -60, -40, -20, 0, 20, 40, 60, 80, 100, 120, 140, 160, 180];
		for (var index = -160; index <= 180; index += 20) {
			var rotationValue = index;
			const bullet = new Bullet(getBulletObject(rotationValue, this.position, this.bulletRadius, 0, false, this.setBulletColor(), 'shipBullet'));
			this.create(bullet, 'bullets');
		}

		this.setBulletSound();
		this.lastShot = Date.now();
	}

	setBulletColor() {
		let color = 'yellow'

		if (this.bounceSkill) {
			color = PW.BOUNCE_BULLET.color
		} else if (this.multiBulletSkill) {
			color = PW.MULTI_BULLET.color
		} else if (this.shotFrequency == 700) {
			color = PW.SUPER_BULLET.color
		} else if (this.shotFrequency == 100) {
			color = PW.FAST_BULLET.color
		} else if (this.fireRingSkill) {
			color = PW.FIRE_RING.color
		}

		return color
	}

	setBulletSound() {
		let bulletSound = PLAYLIST.BULLET;

		if (this.bounceSkill) {
			bulletSound = PLAYLIST.BOUNCE_BULLET;
		} else if (this.multiBulletSkill) {
			bulletSound = PLAYLIST.MULTI_BULLET;
		} else if (this.shotFrequency == 700) {
			bulletSound = PLAYLIST.SUPER_BULLET;
		} else if (this.shotFrequency == 100) {
			bulletSound = PLAYLIST.FAST_BULLET;
		} else if (this.fireRingSkill) {
			bulletSound = PLAYLIST.FIRE_RING;
		}
		bulletSound.play();
	}

	render(state) {
		let colorStroke = 'red';
		this.shieldEnabled = false;

		// Controls
		if (state.keys.up || this.gameMode === GAME_MODE.SPACE_RACE) {
			this.accelerate(1);
			if (!PLAYLIST.SHIP.playing())
				PLAYLIST.SHIP.play();
		}
		if (state.keys.left) {
			(this.gameMode === GAME_MODE.CLASSIC || this.gameMode === GAME_MODE.BATTLE) ? this.rotate('LEFT') : this.velocity.y -= this.speed;
		}
		if (state.keys.right) {
			(this.gameMode === GAME_MODE.CLASSIC || this.gameMode === GAME_MODE.BATTLE) ? this.rotate('RIGHT') : this.velocity.y += this.speed;
		}
		if (state.keys.shoot && Date.now() - this.lastShot > this.shotFrequency) {
			this.fireBullet();
		}
		if (state.keys.shield) {
			if (this.useShield()) {
				colorStroke = 'blue';
				this.shieldEnabled = true;
			} else {
				this.shieldEnabled = false;
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
		if (this.position.x > state.screen.width) this.position.x = 0;
		else if (this.position.x < 0) this.position.x = state.screen.width;
		if (this.position.y > state.screen.height) this.position.y = 0;
		else if (this.position.y < 0) this.position.y = state.screen.height;

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
		if (this.superShip) {
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
		if (this.shieldEnabled) {
			context.shadowBlur = 150;
			context.shadowColor = colorStroke;
		}
		context.closePath();
		context.fill();
		context.stroke();
		context.restore();
	}
}
