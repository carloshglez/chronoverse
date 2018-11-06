import C from './constants'
import { strings } from '../util/strings';
import { enableSound } from '../util/soundHelper';

/*----------------------------------------------------------*/
/*----------------------------------------------------------*/
export function setScreen(screen) {
    return {
        type: C.SET_SCREEN,
        payload: screen
    }
}

export function setEventKeys (keys) {
    return {
        type: C.SET_EVENT_KEYS,
        payload: keys
    }
}

export function resetEventKeys () {
    return {
        type: C.RESET_EVENT_KEYS
    }
}

export function setContext (context) {
    return {
        type: C.SET_CONTEXT,
        payload: context
    }
}

export function setGameState (gameState) {
    return {
        type: C.SET_GAME_STATE,
        payload: gameState
    }
}

export function setGameSound (gameSound) {
    enableSound(gameSound);
    return {
        type: C.SET_GAME_SOUND,
        payload: gameSound
    }
}

export function setGameLang (gameLang) {
    strings.setLanguage(gameLang);
    return {
        type: C.SET_GAME_LANG,
        payload: gameLang
    }
}

/*----------------------------------------------------------*/
/*----------------------------------------------------------*/
export function setAsteroidCount (value) {
    return {
        type: C.SET_ASTEROID_COUNT,
        payload: value
    }
}

export function setPowerUpCount (value) {
    return {
        type: C.SET_POWERUP_COUNT,
        payload: value
    }
}

export function setEnemyCount (value) {
    return {
        type: C.SET_ENEMY_COUNT,
        payload: value
    }
}

export function setTimeValue (value) {
    return {
        type: C.SET_TIME_VALUE,
        payload: value
    }
}

/*----------------------------------------------------------*/
/*----------------------------------------------------------*/
export function setAsteroidsDestroyed (value) {
    return {
        type: C.SET_ASTEROIDS_DESTROYED,
        payload: value
    }
}

export function setEnemiesDestroyed (value) {
    return {
        type: C.SET_ENEMIES_DESTROYED,
        payload: value
    }
}

export function setBulletsFired (value) {
    return {
        type: C.SET_BULLETS_FIRED,
        payload: value
    }
}

export function setBulletsHit (value) {
    return {
        type: C.SET_BULLETS_HIT,
        payload: value
    }
}

export function setPowerUpUsage (value) {
    return {
        type: C.SET_POWERUP_USAGE,
        payload: value
    }
}

export function setShieldUsage (value) {
    return {
        type: C.SET_SHIELD_USAGE,
        payload: value
    }
}

export function setCurrentShield (value) {
    return {
        type: C.SET_CURRENT_SHIELD,
        payload: value
    }
}

export function setCurrentScore (score) {
    return {
        type: C.SET_CURRENT_SCORE,
        payload: score
    }
}

export function setTopScoreInUse (score) {
    return {
        type: C.SET_TOP_SCORE_IN_USE,
        payload: score
    }
}

export function setTopScoreClassic (score) {
    return {
        type: C.SET_TOP_SCORE_CLASSIC,
        payload: score
    }
}

export function setTopScoreSpaceRace (score) {
    return {
        type: C.SET_TOP_SCORE_SPACERACE,
        payload: score
    }
}
