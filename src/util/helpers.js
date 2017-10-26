import Particle from '../Particle';

// From: http://codepen.io/bungu/pen/rawvJe

export const PW = {
  SHIELD: {
    id: 1,
    color: 'blue',
  },
  BIG_BULLET: {
    id: 2,
    color: 'yellow',
  },
  FAST_BULLET: {
    id: 3,
    color: 'green',
  },
  BIG_SHIP: {
    id: 4,
    color: 'purple',
  },
  SPEED: {
    id: 5,
    color: 'orange',
  },
  BOUNCE_BULLET: {
    id: 6,
    color: 'aqua',
  },
  MULTI_BULLET: {
    id: 7,
    color: 'pink',
  },
  TIME_BONUS: {
    id: 8,
    color: 'white',
  }
};

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
      x: (-Math.sin((360/count)*i*Math.PI/180) + Math.round(Math.random()*2-1)*Math.random()/3)*rad,
      y: (-Math.cos((360/count)*i*Math.PI/180) + Math.round(Math.random()*2-1)*Math.random()/3)*rad
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
    x: ((p.x-center.x)*Math.cos(angle) - (p.y-center.y)*Math.sin(angle)) + center.x,
    y: ((p.x-center.x)*Math.sin(angle) + (p.y-center.y)*Math.cos(angle)) + center.y
  };
};

/**
 * Random Number between 2 numbers
 */
export function randomNumBetween(min, max) {
  return Math.random() * (max - min + 1) + min;
};

/**
 *
 */
export function getRandomPowerUp() {
  var obj_keys = Object.keys(PW);
  var ran_key = obj_keys[Math.floor(Math.random() *obj_keys.length)];
  var powerUp = PW[ran_key];

  return powerUp;
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

/**
 *
 */
export function doExplode(radius, position, create) {
  for (let i = 0; i < radius; i++) {
    const particle = new Particle({
      lifeSpan: randomNumBetween(60, 100),
      size: randomNumBetween(1, 3),
      position: {
        x: position.x + randomNumBetween(-radius/4, radius/4),
        y: position.y + randomNumBetween(-radius/4, radius/4)
      },
      velocity: {
        x: randomNumBetween(-1.5, 1.5),
        y: randomNumBetween(-1.5, 1.5)
      }
    });
    create(particle, 'particles');
  }
}
