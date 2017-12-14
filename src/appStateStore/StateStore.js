import storefactory from './'
import * as actions from './actions'
import { STORAGE_CLASSIC_TOP_SCORE, STORAGE_SPACE_RACE_TOP_SCORE } from '../util/constants';

export default class StateStore {
    constructor(args) {

    }

    getStore() {
        return this.store
    }

    getState() {
        return this.getStore().getState()
    }

    dispatch(action) {
        this.getStore().dispatch(action)
    }

/*
    getScreen() {
        return this.getState().screen;
    }
    getEventKeys() {
        return this.getState().keys;
    }
    getContext() {
        return this.getState().context;
    }
    getGameState() {
        return this.getState().game;
    }
    getAsteroidCount() {
        return this.getState().asteroidCount;
    }
    getPowerUpCount() {
        return this.getState().powerUpCount;
    }
    getEnemyCount() {
        return this.getState().enemyCount;
    }
    getTimeValue() {
        return this.getState().timeValue;
    }
    getGameState() {
        return this.getState().game;
    }
    getStats() {
        return this.getState().stats;
    }
    getAsteroidsDestroyed() {
        return this.getState().stats.asteroidsDestroyed;
    }
    getEnemiesDestroyed() {
        return this.getState().stats.enemiesDestroyed;
    }
    getBulletsFired() {
        return this.getState().stats.bulletsFired;
    }
    getBulletsHit() {
        return this.getState().stats.bulletsHit;
    }
    getPowerUpUsage() {
        return this.getState().stats.powerUpUsage;
    }
    getShieldUsage() {
        return this.getState().stats.shieldUsage;
    }
    getCurrentShield() {
        return this.getState().stats.currentShield;
    }
    getCurrentScore() {
        return this.getState().stats.currentScore;
    }
    getTopScoreInUse() {
        return this.getState().stats.topScoreInUse;
    }
    getTopScoreClassic() {
        return this.getState().stats.topScoreClassic;
    }
    getTopScoreSpaceRace() {
        return this.getState().stats.topScoreSpaceRace;
    }

    setScreen(screen) {
        this.dispatch(actions.setScreen(screen))
    }
    setEventKeys(keys) {
        this.dispatch(actions.setEventKeys(keys));
    }
    setContext(context) {
        this.dispatch(actions.setContext(context));
    }
    setAsteroidCount(count) {
        this.dispatch(actions.setAsteroidCount(count));
    }
    setPowerUpCount(count) {
        this.dispatch(actions.setPowerUpCount(count));
    }
    setEnemyCount(count) {
        this.dispatch(actions.setEnemyCount(count));
    }
    setTimeValue(value) {
        this.dispatch(actions.setTimeValue(count));
    }
    setGameState(gameState) {
        this.dispatch(actions.setGameState(gameState));
    }
    resetEventKeys() {
        this.dispatch(actions.resetEventKeys());
    }
    resetGameCounters() {
        this.dispatch(actions.setAsteroidCount(0));
        this.dispatch(actions.setPowerUpCount(0));
        this.dispatch(actions.setEnemyCount(0));
        this.dispatch(actions.setTimeValue(0));
    }
    resetStats() {
        this.dispatch(actions.setAsteroidsDestroyed(0));
        this.dispatch(actions.setEnemiesDestroyed(0));
        this.dispatch(actions.setBulletsFired(0));
        this.dispatch(actions.setBulletsHit(0));
        this.dispatch(actions.setPowerUpUsage(0));
        this.dispatch(actions.setShieldUsage(0));
        this.dispatch(actions.setCurrentShield(100));
        this.dispatch(actions.setCurrentScore(0));
        this.dispatch(actions.setTopScoreInUse(localStorage[STORAGE_CLASSIC_TOP_SCORE] || 0));   		// v1.2.0 <-- topScoreInUse: 0,
        this.dispatch(actions.setTopScoreClassic(localStorage[STORAGE_CLASSIC_TOP_SCORE] || 0));
        this.dispatch(actions.setTopScoreSpaceRace(localStorage[STORAGE_SPACE_RACE_TOP_SCORE] || 0));
    }
    setAsteroidsDestroyed(value) {
        this.dispatch(actions.setAsteroidsDestroyed(value));
    }
    setEnemiesDestroyed(value) {
        this.dispatch(actions.setEnemiesDestroyed(value));
    }
    setBulletsFired(value) {
        this.dispatch(actions.setBulletsFired(value));
    }
    setBulletsHit(value) {
        this.dispatch(actions.setBulletsHit(value));
    }
    setPowerUpUsage(value) {
        this.dispatch(actions.setPowerUpUsage(value));
    }
    setShieldUsage(value) {
        this.dispatch(actions.setShieldUsage(value));
    }
    setCurrentShield(value) {
        this.dispatch(actions.setCurrentShield(value));
    }
    setCurrentScore(value) {
        this.dispatch(actions.setCurrentScore(value));
    }
    setTopScoreInUse(value) {
        this.dispatch(actions.setTopScoreInUse(value));
    }
    setTopScoreClassic(value) {
        this.dispatch(actions.setTopScoreClassic(value));
    }
    setTopScoreSpaceRace(value) {
        this.dispatch(actions.setTopScoreSpaceRace(value));
    }
*/
}
