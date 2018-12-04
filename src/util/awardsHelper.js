import React from 'react';
import { LocalStorageManager } from './localStorageHelper';
import { strings } from './strings';
import FaTrophy from 'react-icons/lib/fa/trophy'

/**
 *
 */
let index = 0;
export const AWARDS = [
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: strings.lbAward00
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: strings.lbAward01
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: strings.lbAward02
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: strings.lbAward03
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: strings.lbAward04
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: strings.lbAward05
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: strings.lbAward06
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: strings.lbAward07
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: strings.lbAward08
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: strings.lbAward09
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: strings.lbAward10
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: strings.lbAward11
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: strings.lbAward12
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: strings.lbAward13
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: strings.lbAward14
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: strings.lbAward15
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: strings.lbAward16
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: strings.lbAward17
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: strings.lbAward18
    },
    {
        id: index++, won: false, icon: <FaTrophy />,
        text: strings.lbAward19
    }

];

export const wonAwards = LocalStorageManager.getAwards();

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
        LocalStorageManager.setAwards(wonAwards);
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
