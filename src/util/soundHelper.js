import { Howl } from 'howler';

Howler.volume(0.5);

/**
 *
 */
export const PLAYLIST = {
    BULLET: new Howl({src: ['./sounds/bullet.wav']}),
    SUPER_BULLET: new Howl({src: ['./sounds/superBullet.wav']}),
    FAST_BULLET: new Howl({src: ['./sounds/fastBullet.wav']}),
    BOUNCE_BULLET: new Howl({src: ['./sounds/bounceBullet.wav']}),
    MULTI_BULLET: new Howl({src: ['./sounds/multiBullet.wav']}),
    FIRE_RING: new Howl({src: ['./sounds/fireRing.wav']}),

    ENEMY: new Howl({src: ['./sounds/enemy.wav']}),
    ENEMY_SHOOT_EXPLORER: new Howl({src: ['./sounds/enemyShoot1.wav']}),
    ENEMY_SHOOT_HUNTER: new Howl({src: ['./sounds/enemyShoot2.wav']}),
    ENEMY_EXPLOSION: new Howl({src: ['./sounds/enemyExplosion.wav']}),

    SHIP: new Howl({src: ['./sounds/ship.wav']}),
    EXPLOSION: new Howl({src: ['./sounds/explosion.wav']}),
    POWERUP: new Howl({src: ['./sounds/powerup.wav']}),
    SHIELD: new Howl({src: ['./sounds/shield.wav']}),
    SHIELD_OUT: new Howl({src: ['./sounds/shieldOut.wav']}),

    INTRO_SELECT: new Howl({src: ['./sounds/introSelect.wav']}),
    OPTION_SELECT: new Howl({src: ['./sounds/optionSelect.wav']}),
    OPTION_DISABLED: new Howl({src: ['./sounds/optionDisabled.wav']}),
    START_GAME: new Howl({src: ['./sounds/startGame.wav']}),
    END_GAME: new Howl({src: ['./sounds/endGame.wav']})
};

export function enableSound(value) {
    Howler.mute(value);
}