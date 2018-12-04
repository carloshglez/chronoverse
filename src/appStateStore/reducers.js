import C from './constants'
import { combineReducers } from 'redux'
import { GAME_STATE } from '../util/constants';

export const context = (state = null, action) => {
    switch (action.type) {
        case C.SET_CONTEXT:
            return action.payload
        default:
            return state
    }
}

export const screen = (state = {}, action) => {
    switch (action.type) {
        case C.SET_SCREEN:
            return ({ width: action.payload.width, height: action.payload.height, ratio: action.payload.ratio })
        default:
            return state
    }
}

export const keys = (state = {}, action) => {
    switch (action.type) {
        case C.SET_EVENT_KEYS:
            return (action.payload)
        case C.RESET_EVENT_KEYS:
            return ({
                left: 0,
                right: 0,
                up: 0,
                shield: 0,
                shoot: 0
            }
            )
        default:
            return state
    }
}

export const game = (state = {}, action) => {
    switch (action.type) {
        case C.SET_GAME_STATE:
            return ({
                intro: (action.payload === GAME_STATE.INTRO) ? true : false,
                select: (action.payload === GAME_STATE.SELECT) ? true : false,
                inClassicGame: (action.payload === GAME_STATE.CLASSIC) ? true : false,
                inSpaceRaceGame: (action.payload === GAME_STATE.SPACE_RACE) ? true : false,
                over: (action.payload === GAME_STATE.OVER) ? true : false,
                about: (action.payload === GAME_STATE.ABOUT) ? true : false,
                awards: (action.payload === GAME_STATE.AWARDS) ? true : false,
                settings: (action.payload === GAME_STATE.SETTINGS) ? true : false
            })
        default:
            return state
    }
}

export const sound = (state = false, action) => {
    switch (action.type) {
        case C.SET_GAME_SOUND:
            return action.payload
        default:
            return state
    }
}

export const language = (state = 'es', action) => {
    switch (action.type) {
        case C.SET_GAME_LANG:
            return action.payload
        default:
            return state
    }
}

export const asteroidCount = (state = 0, action) => {
    switch (action.type) {
        case C.SET_ASTEROID_COUNT:
            return parseInt(action.payload)
        default:
            return state
    }
}

export const powerUpCount = (state = 0, action) => {
    switch (action.type) {
        case C.SET_POWERUP_COUNT:
            return parseInt(action.payload)
        default:
            return state
    }
}

export const enemyCount = (state = 0, action) => {
    switch (action.type) {
        case C.SET_ENEMY_COUNT:
            return parseInt(action.payload)
        default:
            return state
    }
}

export const timeValue = (state = 0, action) => {
    switch (action.type) {
        case C.SET_TIME_VALUE:
            return parseInt(action.payload)
        default:
            return state
    }
}

export const asteroidsDestroyed = (state = 0, action) => {
    switch (action.type) {
        case C.SET_ASTEROIDS_DESTROYED:
            return parseInt(action.payload)
        default:
            return state
    }
}

export const enemiesDestroyed = (state = 0, action) => {
    switch (action.type) {
        case C.SET_ENEMIES_DESTROYED:
            return parseInt(action.payload)
        default:
            return state
    }
}

export const bulletsFired = (state = 0, action) => {
    switch (action.type) {
        case C.SET_BULLETS_FIRED:
            return parseInt(action.payload)
        default:
            return state
    }
}

export const bulletsHit = (state = 0, action) => {
    switch (action.type) {
        case C.SET_BULLETS_HIT:
            return parseInt(action.payload)
        default:
            return state
    }
}

export const powerUpUsage = (state = 0, action) => {
    switch (action.type) {
        case C.SET_POWERUP_USAGE:
            return parseInt(action.payload)
        default:
            return state
    }
}

export const shieldUsage = (state = 0, action) => {
    switch (action.type) {
        case C.SET_SHIELD_USAGE:
            return parseInt(action.payload)
        default:
            return state
    }
}

export const currentShield = (state = 0, action) => {
    switch (action.type) {
        case C.SET_CURRENT_SHIELD:
            return parseInt(action.payload)
        default:
            return state
    }
}

export const currentScore = (state = 0, action) => {
    switch (action.type) {
        case C.SET_CURRENT_SCORE:
            return parseInt(action.payload)
        default:
            return state
    }
}

export const topScoreInUse = (state = 0, action) => {
    switch (action.type) {
        case C.SET_TOP_SCORE_IN_USE:
            return parseInt(action.payload)
        default:
            return state
    }
}

export const topScoreClassic = (state = 0, action) => {
    switch (action.type) {
        case C.SET_TOP_SCORE_CLASSIC:
            return parseInt(action.payload)
        default:
            return state
    }
}

export const topScoreSpaceRace = (state = 0, action) => {
    switch (action.type) {
        case C.SET_TOP_SCORE_SPACERACE:
            return parseInt(action.payload)
        default:
            return state
    }
}

export default combineReducers({
    context,
    screen,
    keys,
    game,
    sound,
    language,
    asteroidCount,
    powerUpCount,
    enemyCount,
    timeValue,
    stats: combineReducers({
        asteroidsDestroyed,
        enemiesDestroyed,
        bulletsFired,
        bulletsHit,
        powerUpUsage,
        shieldUsage,
        currentShield,
        currentScore,
        topScoreInUse,
        topScoreClassic,
        topScoreSpaceRace
    })
})
