import { notify } from 'react-notify-toast'

/**
 *
 */
export const PW = {
  SHIELD: {
    id: 1,
    color: 'Blue',
    drawShape: getShieldShape,
    text: 'Shield Up!',
    incrementValue: 30,
    apply: applyShield
  },
  SUPER_BULLET: {
    id: 2,
    color: 'GoldenRod',
    drawShape: getDefaultShape,
    text: 'SUPER Bullets!',
    time: 5,
    apply: applySuperBullet
  },
  FAST_BULLET: {
    id: 3,
    color: 'ForestGreen',
    drawShape: getFastBulletShape,
    text: 'WOW Fast Bullets!',
    time: 5,
    apply: applyFastBullet
  },
  BIG_SHIP: {
    id: 4,
    color: 'Purple',
    drawShape: getBigShipShape,
    text: 'Giant Ship!',
    time: 5,
    apply: applyBigShip
  },
  SPEED: {
    id: 5,
    color: 'Orange',
    drawShape: getSpeedShape,
    text: 'WOW Fast Ship!',
    time: 10,
    apply: applySpeed
  },
  BOUNCE_BULLET: {
    id: 6,
    color: 'DarkTurquoise',
    drawShape: getBounceBulletShape,
    text: 'Bounce Bullets!',
    time: 5,
    apply: applyBounceBullet
  },
  MULTI_BULLET: {
    id: 7,
    color: 'Pink',
    drawShape: getMultiBulletShape,
    text: 'Weapon Increased!',
    time: 15,
    apply: applyMultiBullet
  },
  TIME_BONUS: {
    id: 8,
    color: 'White',
    drawShape: getTimeBonusShape,
    text: 'Time Bonus! (+5)',
    time: 5,
    apply: applyTimeBonus
  },
  FIRE_RING: {
    id: 9,
    color: 'Maroon',
    drawShape: getDefaultShape,
    text: 'Fire Ring!',
    time: 5,
    apply: applyFireRing
  }
};

var showNotify = notify.createShowQueue();
function showNotification(color, text) {
    let textColor = 'White'
    if (color === 'White') {
        textColor = 'Black'
    }
    let notificationColor = { background: color, text: textColor };
    showNotify(text, 'custom', 5000, notificationColor);
}


function applyShield(_this) {
    _this.increaseShield(PW.SHIELD.incrementValue);
    showNotification(PW.SHIELD.color, PW.SHIELD.text);
}

function applySuperBullet(_this, ship) {
    _this.startTimer(ship, PW.SUPER_BULLET.time);
    ship.enableSuperBullets();
    showNotification(PW.SUPER_BULLET.color, PW.SUPER_BULLET.text);
}

function applyFastBullet(_this, ship) {
    _this.startTimer(ship, PW.FAST_BULLET.time);
    ship.enableFastBullets();
    showNotification(PW.FAST_BULLET.color, PW.FAST_BULLET.text);
}

function applyBigShip(_this, ship) {
    _this.startTimer(ship, PW.BIG_SHIP.time);
    ship.enableSuperShip();
    showNotification(PW.BIG_SHIP.color, PW.BIG_SHIP.text);
}

function applySpeed(_this, ship) {
    _this.startTimer(ship, PW.SPEED.time);
    ship.enableShipSpeed();
    showNotification(PW.SPEED.color, PW.SPEED.text);
}

function applyBounceBullet(_this, ship) {
    _this.startTimer(ship, PW.BOUNCE_BULLET.time);
    ship.enableBounceBullets();
    showNotification(PW.BOUNCE_BULLET.color, PW.BOUNCE_BULLET.text);
}

function applyMultiBullet(_this, ship) {
    _this.startTimer(ship, PW.MULTI_BULLET.time);
    ship.enableMultiBullets();
    showNotification(PW.MULTI_BULLET.color, PW.MULTI_BULLET.text);
}

function applyTimeBonus(_this) {
    showNotification(PW.TIME_BONUS.color, PW.TIME_BONUS.text)
    _this.increaseTimeCounter(PW.TIME_BONUS.time);
}

function applyFireRing(_this, ship) {
    _this.startTimer(ship, PW.FIRE_RING.time);
    ship.enableFireRing();
    showNotification(PW.FIRE_RING.color, PW.FIRE_RING.text)
}

function getDefaultShape(context) {
    context.beginPath();
    context.arc(0, 0, 15, 0, 2 * Math.PI);
    context.closePath();
}

function getShieldShape(context) {
    context.beginPath();
    context.lineTo(30,7.52);
    context.lineTo(20,7.52);
    context.lineTo(20,32.5);
    context.quadraticCurveTo(22.5,31.56,24.54,29.54);
    context.quadraticCurveTo(30,25.58,30,21.5);
    context.closePath();
    context.moveTo(34.55,4.58);
    context.lineTo(34.55,21.5);
    context.quadraticCurveTo(34.55,23.52,33.5,25.5);
    context.quadraticCurveTo(33.5,25.5,31.57,28.57);
    context.quadraticCurveTo(31.57,28.57,29.5,31.5);
    context.quadraticCurveTo(29.5,31.5,26.55,33.5);
    context.quadraticCurveTo(26.55,33.5,23.5,35.56);
    context.quadraticCurveTo(23.5,35.56,21.52,36.5);
    context.quadraticCurveTo(21.52,36.5,20.52,37.5);
    context.quadraticCurveTo(20.57,37.56,20,37.56);
    context.quadraticCurveTo(20,37.56,19.42,37.5);
    context.quadraticCurveTo(19.54,36.5,18.5,36.5);
    context.quadraticCurveTo(18.5,36.5,16.53,35.56);
    context.quadraticCurveTo(16.53,35.56,13.54,33.5);
    context.quadraticCurveTo(13.54,33.5,10.58,31.5);
    context.quadraticCurveTo(10.58,31.5,8.55,28.54);
    context.quadraticCurveTo(8.55,28.54,6.51,25.5);
    context.quadraticCurveTo(6.51,25.5,5.54,21.5);
    context.lineTo(5.54,4.55);
    context.quadraticCurveTo(5.54,3.555,6.59,3.51);
    context.quadraticCurveTo(6.59,3.51,7.53,2.57);
    context.lineTo(32.5,2.57);
    context.quadraticCurveTo(33.5,2.57,33.56,3.516);
    context.quadraticCurveTo(33.56,3.516,34.55,4.56);
    context.closePath();
}

function getFastBulletShape(context) {
    context.beginPath();
    context.quadraticCurveTo(22.42,25.86,24.14,24.14);
    context.quadraticCurveTo(24.14,24.14,25.85,20);
    context.quadraticCurveTo(25.85,20,24.14,15.86);
    context.quadraticCurveTo(24.14,15.86,20,14.14);
    context.quadraticCurveTo(20,14.14,15.86,15.86);
    context.quadraticCurveTo(15.86,15.86,14.144,20);
    context.quadraticCurveTo(14.144,20,15.86,24.14);
    context.quadraticCurveTo(15.86,24.14,20,25.85);
    context.closePath();
    context.moveTo(32.42,21.63);
    context.lineTo(35.93,24.37);
    context.quadraticCurveTo(36.484,24.765,36.094,25.46);
    context.lineTo(32.734,31.25);
    context.quadraticCurveTo(32.42,31.79,31.7,31.566);
    context.lineTo(27.578,29.926);
    context.quadraticCurveTo(25.938,31.09,24.765,31.566);
    context.lineTo(24.13,35.93);
    context.quadraticCurveTo(23.98,36.64,23.355,36.64);
    context.lineTo(16.632,36.64);
    context.quadraticCurveTo(16.012,36.64,15.85,35.93);
    context.lineTo(15.23,31.563);
    context.quadraticCurveTo(13.741,30.938,12.418,29.922);
    context.lineTo(8.272,31.563);
    context.quadraticCurveTo(7.57,31.796,7.26,31.25);
    context.lineTo(3.902,25.45);
    context.quadraticCurveTo(3.512,24.76,4.05,24.375);
    context.lineTo(7.57,21.64);
    context.quadraticCurveTo(7.49,21.09,7.49,20);
    context.quadraticCurveTo(7.49,20,7.572,18.36);
    context.lineTo(4.05,15.62);
    context.quadraticCurveTo(3.51,15.23,3.90,14.53);
    context.lineTo(7.275,8.74);
    context.quadraticCurveTo(7.57,8.20,8.28,8.43);
    context.lineTo(12.42,10.075);
    context.quadraticCurveTo(14.06,8.906,15.234,8.43);
    context.lineTo(15.85,4.06);
    context.quadraticCurveTo(16.015,3.35,16.64,3.35);
    context.lineTo(23.358,3.35);
    context.quadraticCurveTo(23.988,3.35,24.143,4.06);
    context.lineTo(24.76,8.43);
    context.quadraticCurveTo(26.24,9.06,27.575,10.075);
    context.lineTo(31.76,8.43);
    context.quadraticCurveTo(32.424,8.20,32.74,8.74);
    context.lineTo(36.09,14.53);
    context.quadraticCurveTo(36.4,15.23,35.935,15.627);
    context.lineTo(32.42,18.35);
    context.quadraticCurveTo(32.5,18.90,32.5,19.99);
    context.quadraticCurveTo(32.5,19.99,32.424,21.63);
    context.closePath();
}

function getBigShipShape(context) {
    context.beginPath();
    context.quadraticCurveTo(22.5,17.5,20,20.5);
    context.quadraticCurveTo(17.5,17.5,14.5,16.5);
    context.quadraticCurveTo(14.5,8.5,20.5,3.55);
    context.quadraticCurveTo(25.5,8.5,25.5,16.015);
    context.closePath();
    context.moveTo(3.57,16.5);
    context.quadraticCurveTo(8.5,16.5,13.5,19.5);
    context.quadraticCurveTo(13.5,19.5,19.5,25.5);
    context.quadraticCurveTo(22.5,21.795,26.5,19.5);
    context.quadraticCurveTo(26.5,19.5,36.5,16.5);
    context.quadraticCurveTo(36.5,23.5,32.93,28.5);
    context.quadraticCurveTo(32.93,28.5,23.28,35.5);
    context.quadraticCurveTo(21.5,36.5,19.5,36.5);
    context.quadraticCurveTo(18.5,36.405,16.5,35.5);
    context.quadraticCurveTo(10.5,33.5,7.5,28.5);
    context.quadraticCurveTo(7.5,28.5,3.57,16.5);
    context.closePath();
}

function getSpeedShape(context) {
    context.beginPath();
    context.quadraticCurveTo(20,23.75,17.305,26.445);
    context.quadraticCurveTo(17.305,26.445,10.86,29.14);
    context.quadraticCurveTo(10.86,29.14,4.5,26.445);
    context.quadraticCurveTo(4.5,26.445,1.56,20);
    context.lineTo(20,20);
    context.closePath();
    context.moveTo(20,20);
    context.quadraticCurveTo(16.25,20,13.555,17.305);
    context.quadraticCurveTo(13.555,17.305,10.5,10.5);
    context.quadraticCurveTo(10.5,10.5,13.5,4.5);
    context.quadraticCurveTo(13.5,4.5,20,1.56);
    context.lineTo(20,20);
    context.closePath();
    context.moveTo(20,20);
    context.quadraticCurveTo(23.75,20,26.445,22.695);
    context.quadraticCurveTo(26.445,22.695,29.14,29.14);
    context.quadraticCurveTo(29.14,29.14,26.445,35.5);
    context.quadraticCurveTo(26.445,35.5,20,38.5);
    context.lineTo(20,20);
    context.closePath();
    context.moveTo(20,20);
    context.quadraticCurveTo(20,16.25,22.695,13.555);
    context.quadraticCurveTo(22.695,13.555,29.14,10.86);
    context.quadraticCurveTo(29.14,10.86,35.5,13.555);
    context.quadraticCurveTo(35.5,13.555,38.5,20);
    context.lineTo(20,20);
    context.closePath();
}

function getBounceBulletShape(context) {
    context.beginPath();
    context.quadraticCurveTo(38.36,14.5,37.5,15.5);
    context.quadraticCurveTo(37.5,15.5,35.5,16.64);
    context.quadraticCurveTo(34.5,16.64,34.5,16.5);
    context.lineTo(28.5,22.5);
    context.quadraticCurveTo(28.5,22.97,28.5,23.5);
    context.quadraticCurveTo(28.5,24.69,27.5,25.5);
    context.quadraticCurveTo(27.5,25.5,25.5,26.5);
    context.quadraticCurveTo(25.5,26.5,22.5,25.5);
    context.quadraticCurveTo(22.5,25.5,21.5,23.5);
    context.quadraticCurveTo(21.5,22.5,21.5,22.5);
    context.lineTo(17.5,18.5);
    context.quadraticCurveTo(17.5,18.5,16.5,18.5);
    context.quadraticCurveTo(16.5,18.5,15.5,18.5);
    context.lineTo(8.205,25.5);
    context.quadraticCurveTo(8.5,26.25,8.5,26.5);
    context.quadraticCurveTo(8.5,27.5,7.345,28.5);
    context.quadraticCurveTo(7.345,28.5,5.5,30.5);
    context.quadraticCurveTo(5.5,30.5,2.57,28.5);
    context.quadraticCurveTo(2.57,28.5,1.5,26.5);
    context.quadraticCurveTo(1.5,26.5,2.57,24.5);
    context.quadraticCurveTo(2.57,24.5,5.5,23.5);
    context.quadraticCurveTo(5.5,23.5,5.5,23.44);
    context.lineTo(13.5,15.5);
    context.quadraticCurveTo(13.5,15.5,13.5,15.5);
    context.quadraticCurveTo(13.5,13.5,14.34,12.5);
    context.quadraticCurveTo(14.34,12.5,16.645,11.5);
    context.quadraticCurveTo(16.645,11.5,18.5,12.66);
    context.quadraticCurveTo(18.5,12.66,20.005,15.5);
    context.quadraticCurveTo(20.005,15.63,19.925,15.865);
    context.lineTo(24.5,20.5);
    context.quadraticCurveTo(24.5,20.005,25.5,20.005);
    context.quadraticCurveTo(25.5,20.005,25.5,20.5);
    context.lineTo(31.5,14.5);
    context.quadraticCurveTo(31.5,13.5,31.5,13.5);
    context.quadraticCurveTo(31.5,12.5,32.5,11.5);
    context.quadraticCurveTo(32.5,11.5,35,10);
    context.quadraticCurveTo(35,10,37.5,11.5);
    context.quadraticCurveTo(37.5,11.5,38.36,13.36);
    context.closePath();
}

function getMultiBulletShape(context) {
    context.beginPath();
    context.quadraticCurveTo(32.5,26.5,33.5,28.5);
    context.quadraticCurveTo(33.5,28.5,34.845,31.5);
    context.quadraticCurveTo(34.845,33.5,33.4,35.5);
    context.quadraticCurveTo(33.4,35.5,30,36.5);
    context.quadraticCurveTo(30,36.5,26.5,35.5);
    context.quadraticCurveTo(26.5,35.5,25.5,31.64);
    context.quadraticCurveTo(25.5,30.5,25.5,30.5);
    context.lineTo(13.5,23.5);
    context.quadraticCurveTo(11.5,25,10,25);
    context.quadraticCurveTo(7.97,25,6.5,23.5);
    context.quadraticCurveTo(6.5,23.5,5.5,20);
    context.quadraticCurveTo(5.5,20,6.5,16.5);
    context.quadraticCurveTo(6.5,16.5,10.5,15);
    context.quadraticCurveTo(11.5,15,13.5,16.5);
    context.lineTo(25.5,9.5);
    context.quadraticCurveTo(25.5,8.5,25.5,8.5);
    context.quadraticCurveTo(25.5,6.5,26.5,4.5);
    context.quadraticCurveTo(26.5,4.5,30.005,3.55);
    context.quadraticCurveTo(30.005,3.55,33.5,4.5);
    context.quadraticCurveTo(33.5,4.5,35.5,8.5);
    context.quadraticCurveTo(35.5,8.5,33.5,11.875);
    context.quadraticCurveTo(33.5,11.875,30.5,13.5);
    context.quadraticCurveTo(28.5,13.5,26.5,11.5);
    context.lineTo(14.5,18.5);
    context.quadraticCurveTo(15,19.5,15,20);
    context.quadraticCurveTo(15,20,14.845,21.5);
    context.lineTo(26.72,28.5);
    context.quadraticCurveTo(28.5,26.5,30.5,26.5);
    context.closePath();
    context.fill();
}

function getTimeBonusShape(context) {
    context.beginPath();
    context.moveTo(22.5,12.5);
    context.lineTo(22.5,22.5);
    context.quadraticCurveTo(22.5,22.5,22.5,22.5);
    context.quadraticCurveTo(22.5,22.5,22.5,22.5);
    context.lineTo(15.5,22.5);
    context.quadraticCurveTo(14.5,22.5,14.5,22.5);
    context.quadraticCurveTo(14.5,22.5,14.5,22.5);
    context.lineTo(14.5,20.5);
    context.quadraticCurveTo(14.5,20.5,14.5,20.5);
    context.quadraticCurveTo(14.5,20.5,15,20);
    context.lineTo(20,20);
    context.lineTo(20,12.5);
    context.quadraticCurveTo(20,11.5,20.2,11.5);
    context.quadraticCurveTo(20.2,11.5,20.5,11.5);
    context.lineTo(22.5,11.5);
    context.quadraticCurveTo(22.5,11.5,22.5,11.5);
    context.quadraticCurveTo(22.5,11.5,22.5,12.5);
    context.closePath();
    context.moveTo(32.5,20);
    context.quadraticCurveTo(32.5,16.5,30.5,13.5);
    context.quadraticCurveTo(30.5,13.5,26.5,9.5);
    context.quadraticCurveTo(26.5,9.5,20,7.5);
    context.quadraticCurveTo(20,7.5,13.5,9.5);
    context.quadraticCurveTo(13.5,9.5,9.5,13.5);
    context.quadraticCurveTo(9.5,13.5,7.5,20);
    context.quadraticCurveTo(7.5,20,9.5,26.5);
    context.quadraticCurveTo(9.5,26.5,13.5,30.5);
    context.quadraticCurveTo(13.5,30.5,20,32.5);
    context.quadraticCurveTo(20,32.5,26.5,30.5);
    context.quadraticCurveTo(26.5,30.5,30.5,26.5);
    context.quadraticCurveTo(30.5,26.5,32.5,20);
    context.closePath();
    context.moveTo(37.5,20);
    context.quadraticCurveTo(37.5,24.5,34.5,28.5);
    context.quadraticCurveTo(34.5,28.5,28.5,34.5);
    context.quadraticCurveTo(28.5,34.5,20,37.5);
    context.quadraticCurveTo(20,37.5,11.4,34.5);
    context.quadraticCurveTo(11.4,34.5,5.55,28.5);
    context.quadraticCurveTo(5.55,28.5,2.57,20);
    context.quadraticCurveTo(2.57,20,5.5,11.5);
    context.quadraticCurveTo(5.5,11.5,11.5,5.55);
    context.quadraticCurveTo(11.5,5.55,20,2.5);
    context.quadraticCurveTo(20,2.5,28.5,5.55);
    context.quadraticCurveTo(28.5,5.55,34.5,11.5);
    context.quadraticCurveTo(34.5,11.5,37.5,20);
    context.closePath();
}
