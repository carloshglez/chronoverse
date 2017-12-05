// From: http://codepen.io/bungu/pen/rawvJe

/**
 * Generates vertices for asteroid polygon with certain count and radius
 * @param  {Number} count   Number of vertices
 * @param  {Number} rad     Maximal radius of polygon
 * @return {Array}        Array of vertices: {x: Number, y: Number}
 */
export function asteroidVertices(count, rad) {
	let p = [];
	for (let i = 0; i < count; i++) {
		p[i] = {
			x: (-Math.sin((360 / count) * i * Math.PI / 180) + Math.round(Math.random() * 2 - 1) * Math.random() / 3) * rad,
			y: (-Math.cos((360 / count) * i * Math.PI / 180) + Math.round(Math.random() * 2 - 1) * Math.random() / 3) * rad
		};
	}
	return p;
};

/**
 * Rotate point around center on certain angle
 * @param {Object} p        {x: Number, y: Number}
 * @param {Object} center   {x: Number, y: Number}
 * @param {Number} angle    Angle in radians
 */
export function rotatePoint(p, center, angle) {
	return {
		x: ((p.x - center.x) * Math.cos(angle) - (p.y - center.y) * Math.sin(angle)) + center.x,
		y: ((p.x - center.x) * Math.sin(angle) + (p.y - center.y) * Math.cos(angle)) + center.y
	};
};

/**
 * Random Number between 2 numbers
 */
export function randomNumBetween(min, max) {
	return Math.random() * (max - min + 1) + min;
};

/**
 * Random Number between 2 numbers excluding a certain range
 */
export function randomNumBetweenExcluding(min, max, exMin, exMax) {
	let random = randomNumBetween(min, max);
	while (random > exMin && random < exMax) {
		random = Math.random() * (max - min + 1) + min;
	}
	return random;
};


import Particle from '../classic/components/Particle';

/**
 *
 */
export const KEY = {
	LEFT: 37,
	A: 65,
	RIGHT: 39,
	D: 68,
	UP: 38,
	W: 87,
	SHIELD: 40,
	S: 83,
	SHOOT: 32
};

/**
 *
 */
export const ENEMY_TYPE = {
	EXPLORER: 1,
	HUNTER: 2
};

/**
 *
 *
 * @export
 * @param {any} radius
 * @param {any} position
 * @param {any} create
 * @param {string} [color='White']
 */
export function doExplode(radius, position, create, color = 'White') {
	for (let i = 0; i < radius; i++) {
		const particle = new Particle({
			lifeSpan: randomNumBetween(60, 100),
			size: randomNumBetween(1, 3),
			position: {
				x: position.x + randomNumBetween(-radius / 4, radius / 4),
				y: position.y + randomNumBetween(-radius / 4, radius / 4)
			},
			velocity: {
				x: randomNumBetween(-1.5, 1.5),
				y: randomNumBetween(-1.5, 1.5)
			},
			color: color
		});
		create(particle, 'particles');
	}
}

/**
 *
 */
export function getRandomItem(array) {
    var obj_keys = Object.keys(array);
    var ran_key = obj_keys[Math.floor(Math.random() *obj_keys.length)];
    return array[ran_key];
};

export function getNextAsteroidsCount(currentAsteroidCount) {
	return (currentAsteroidCount < 10) ? currentAsteroidCount + 1 : 1;
}

export function getNextPowerUpCount(powerUpArray, asteroidCount) {
	return ((asteroidCount % 3 === 0) ? 2 : 0) - powerUpArray.length;
}

export function getNextEnemyCount(enemyGoal) {
	return (Math.floor((enemyGoal) / 1000));
}
