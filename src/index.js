import './styles/fonts/PTMono/PTMono-Regular.woff2';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'

import Connector from './Connector';
import storefactory from './appStateStore'
import { LocalStorageManager } from './util/localStorageHelper';

const initialState = {
    context: null,
    screen: {
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: window.devicePixelRatio || 1
    },
    keys: {
        left: 0,
        right: 0,
        up: 0,
        shield: 0,
        shoot: 0
    },
    asteroidCount: 0,
    powerUpCount: 0,
    enemyCount: 0,
    timeValue: 0,
    stats: {
        asteroidsDestroyed: 0,
        enemiesDestroyed: 0,
        bulletsFired: 0,
        bulletsHit: 0,
        powerUpUsage: 0,
        shieldUsage: 0,
        currentShield: 100,
        currentLife: 100,
        currentScore: 0,
        topScoreInUse: 0,
        topScoreClassic: LocalStorageManager.getClassicTopScore(),
        topScoreSpaceRace: LocalStorageManager.getSpaceRaceTopScore(),
        topScoreBattle: LocalStorageManager.getBattleTopScore()
    },
    game: {
        intro: true,
        select: false,
        inClassicGame: false,
        inSpaceRaceGame: false,
        inBattleGame: false,
        over: false,
        about: false,
        awards: false
    }
}

render(
    <Provider store={storefactory(initialState)}>
        <Connector />
    </Provider>,
    document.getElementById('root')
);
