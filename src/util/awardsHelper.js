import React from 'react';
import { STORAGE_AWARDS } from './constants';
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

export const wonAwards = (localStorage[STORAGE_AWARDS]) ? localStorage[STORAGE_AWARDS].split(",") : [];

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
    var awardId = array.find(function (awardId) { return Number(awardId) === id; });
    return awardId;
}

function storeAwards(id) {
    if (!isAwardIdInArray(id, wonAwards)) {
        wonAwards.push(id);
        localStorage[STORAGE_AWARDS] = wonAwards;
    }
}
