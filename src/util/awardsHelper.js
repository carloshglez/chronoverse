import React from 'react';
import { setStorageAwards, getStorageAwards } from './localStorageHelper';
import FaTrophy from 'react-icons/lib/fa/trophy'

/**
 *
 */
let index = 0;
const AWARDS = [
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: 'Play for the first time'
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: 'Score: 500 points'
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: 'Score: 1,000 points'
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: 'Score: 2,000 points'
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: 'Score: +3,000 points'
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: 'Destroy 10 asteroids'
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: 'Destroy 50 asteroids'
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: 'Destroy +100 asteroids'
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: 'Destroy 3 enemies'
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: 'Destroy +5 enemies'
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: 'Hit Percentage +50% and +10 bullets'
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: 'Hit Percentage +80% and +10 bullets'
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: 'Hit Percentage 100% and +10 bullets'
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: 'Bullets Fired: 100'
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: 'Bullets Fired: 300'
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: 'Bullets Fired: +500'
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: 'Run out the shield'
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: 'Shield usage: 50%'
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: 'Use 3 power-ups'
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: 'Use +5 power-ups'
    }

];

export const wonAwards = getStorageAwards();

export function getAwardsArray() {
    AWARDS.forEach((item) => {
        if (isAwardIdInArray(item.id, wonAwards)) {
            item.won = true;
        }
    })
    return AWARDS.sort((a, b) => Number(a.id) - Number(b.id));
}

export function winAward(id) {
    var sortedAwards = getAwardsArray();
    sortedAwards[id].won = true;
    //Store the new array...
    storeAwards(id);
}

function isAwardIdInArray(id, array) {
    var includes = array.includes(id);
    return includes;
}

function storeAwards(id) {
    if (!isAwardIdInArray(id, wonAwards)) {
        wonAwards.push(id);
        setStorageAwards(wonAwards);
    }
}

export function evaluateResults(stats) {
    let wonAwardsCount = wonAwards.length;

    if (!isAwardIdInArray(0, wonAwards)) winAward(0);

    if (stats.currentScore >= 500) winAward(1);
    if (stats.currentScore >= 1000) winAward(2);
    if (stats.currentScore >= 2000) winAward(3);
    if (stats.currentScore >= 3000) winAward(4);

    if (stats.asteroidsDestroyed >= 10) winAward(5);
    if (stats.asteroidsDestroyed >= 50) winAward(6);
    if (stats.asteroidsDestroyed >= 100) winAward(7);

    if (stats.enemiesDestroyed >= 3) winAward(8);
    if (stats.enemiesDestroyed >= 5) winAward(9);

    if (stats.bulletsFired >= 10) {
        let hitPercentaje = (Math.floor((stats.bulletsHit * 100) / stats.bulletsFired))
        if (hitPercentaje >= 50) winAward(10);
        if (hitPercentaje >= 80) winAward(11);
        if (hitPercentaje >= 100) winAward(12);
    }

    if (stats.bulletsFired >= 100) winAward(13);
    if (stats.bulletsFired >= 300) winAward(14);
    if (stats.bulletsFired >= 500) winAward(15);

    if (stats.shieldUsage >= 99) winAward(16);
    if (stats.shieldUsage >= 50) winAward(17);

    if (stats.powerUpUsage >= 3) winAward(18);
    if (stats.powerUpUsage >= 5) winAward(19);

    let newWonAwardsCount = wonAwards.length;

    return (newWonAwardsCount > wonAwardsCount);
}
