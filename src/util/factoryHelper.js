import { randomNumBetweenExcluding, randomNumBetween } from './helpers';
import { strings } from './strings';

export const GAME_MODE = {
    CLASSIC: {
        rules: {
            id: 1,
            title: strings.lbClassic,
            topScore: 0,
            onClickEvent: null,
            unlockAt: 0,
            unlockMessage: ''
        },
        getShipPosition: (width, height) => {
            return { x: width / 2, y: height / 2 }
        },
        getAsteroidPosition: (width, height, shipPosition) => {
            return getMainPosition(width, height, shipPosition)
        },
        getEnemyPosition: (width, height, shipPosition) => {
            return getMainPosition(width, height, shipPosition)
        },
        getPowerUpPosition: (width, height, shipPosition) => {
            return getMainPosition(width, height, shipPosition)
        },
        getVelocity: () => {
            return {
                x: randomNumBetween(-1.5, 1.5),
                y: randomNumBetween(-1.5, 1.5)
            }
        },
        getNewPosition: (velocityX, velocityY) => {
            return {
                x: velocityX,
                y: velocityY
            }
        }
    },
    SPACE_RACE: {
        rules: {
            id: 2,
            title: strings.lbSpaceRace,
            topScore: 0,
            onClickEvent: null,
            unlockAt: 2000,
            unlockMessage: strings.lbSpaceRaceUnlockMsg
        },
        getShipPosition: (width, height) => {
            return { x: width / 8, y: height / 2 }
        },
        getAsteroidPosition: (width, height, shipPosition) => {
            return {
                x: width + 60,
                y: getYMainPosition(width, height, shipPosition)
            }
        },
        getEnemyPosition: (width, height, shipPosition) => {
            return {
                x: width + 20,
                y: getYMainPosition(width, height, shipPosition)
            }
        },
        getPowerUpPosition: (width, height, shipPosition) => {
            return {
                x: width + 15,
                y: getYMainPosition(width, height, shipPosition)
            }
        },
        getVelocity: () => {
            return {
                x: randomNumBetween(0.1, 1.5),
                y: randomNumBetween(-1.5, 1.5)
            }
        },
        getNewPosition: (velocityX, velocityY) => {
            return {
                x: -velocityX,
                y: velocityY
            }
        }
    }
}

function getMainPosition(width, height, shipPosition) {
    return {
        x: getXMainPosition(width, height, shipPosition),
        y: getYMainPosition(width, height, shipPosition)
    }
}

function getXMainPosition(width, height, shipPosition) {
    return randomNumBetweenExcluding(0, width, shipPosition.x - 60, shipPosition.x + 60)
}

function getYMainPosition(width, height, shipPosition) {
    return randomNumBetweenExcluding(0, height, shipPosition.y - 60, shipPosition.y + 60)
}
