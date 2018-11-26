import Ship from './components/Ship';
import Asteroid from './components/Asteroid';
import PowerUp from './components/PowerUp';
import Enemy from './components/Enemy';
import { PW } from '../util/powerUpHelper';
import { ENEMY_TYPE } from '../util/constants';
import { PLAYLIST } from '../util/soundHelper';
import { randomNumBetween, getRandomItem, getNextAsteroidsCount, getNextPowerUpCount, getNextEnemyCount } from '../util/helpers';
import { GAME_MODE } from '../util/factoryHelper';

export default class Factory {
    constructor(args) {
        this.gameMode = null

        this.screenWidth = args.screenWidth
        this.screenHeight = args.screenHeight
        this.ship = null

        this.createObject = args.createObject
        this.gameOver = args.gameOver
        this.useShield = args.useShield
        this.addScore = args.addScore
        this.setAsteroidCount = args.setAsteroidCount
        this.setEnemyCount = args.setEnemyCount
        this.setPowerUpCount = args.setPowerUpCount
    }

    setGameMode(gameMode) {
        this.gameMode = gameMode
    }

    generateShip() {
        let ship = new Ship({
            position: this.gameMode.getShipPosition(this.screenWidth, this.screenHeight),
            create: this.createObject,
            onDie: this.gameOver,
            useShield: this.useShield,
            gameMode: this.gameMode
        })
        this.createObject(ship, 'ship')
        this.ship = ship
    }

    generateAsteroids(howMany) {
        for (let i = 0; i < howMany; i++) {
            let asteroid = new Asteroid({
                size: randomNumBetween(10, 60),
                position: this.gameMode.getAsteroidPosition(this.screenWidth, this.screenHeight, this.ship.position),
                create: this.createObject,
                addScore: this.addScore,
                gameMode: this.gameMode
            });
            this.createObject(asteroid, 'asteroids');
        }
        this.setAsteroidCount(howMany);
    }

    generateEnemy(howMany) {
        for (let i = 0; i < howMany; i++) {
            let enemy = new Enemy({
                position: this.gameMode.getEnemyPosition(this.screenWidth, this.screenHeight, this.ship.position),
                ship: this.ship,
                type: getRandomItem(ENEMY_TYPE),
                addScore: this.addScore,
                create: this.createObject,
                gameMode: this.gameMode
            });
            this.createObject(enemy, 'enemies');
        }
        this.setEnemyCount(howMany * 1000);
    }

    generatePowerUp(howMany) {
        for (let i = 0; i < howMany; i++) {
            let powerUp = new PowerUp({
                position: this.gameMode.getPowerUpPosition(this.screenWidth, this.screenHeight, this.ship.position),
                create: this.createObject,
                powerUp: getRandomItem(PW),
                gameMode: this.gameMode
            });
            this.createObject(powerUp, 'powerUps');
        }
        this.setPowerUpCount(howMany);
    }

    nextSetOfComponents(currentScore, enemyCount, currentAsteroidCount, powerUpsArray, asteroidsArray, enemiesArray) {
        if (this.gameMode === GAME_MODE.CLASSIC || this.gameMode === GAME_MODE.SPACE_RACE) {
            if (!asteroidsArray.length) {
                let nextAsteroidCount = getNextAsteroidsCount(currentAsteroidCount);
                this.generateAsteroids(nextAsteroidCount)
        
                let powerUpCount = getNextPowerUpCount(powerUpsArray, nextAsteroidCount);
                this.generatePowerUp(powerUpCount);
        
                let enemyGoal = enemyCount + 1000;
                if (currentScore >= enemyGoal) {
                    let enemyCount = (Math.floor((enemyGoal) / 1000));
                    this.generateEnemy(enemyCount)
                    PLAYLIST.ENEMY.play();
                }
            }
        }
        if (this.gameMode === GAME_MODE.BATTLE) {
            if (!enemiesArray.length) {
                if (enemyCount >= 1000) {
                    enemyCount = (Math.floor((enemyCount) / 1000));
                }

                let nextEnemyCount = getNextEnemyCount(enemyCount);
                this.generateEnemy(nextEnemyCount);
                
                let powerUpCount = getNextPowerUpCount(powerUpsArray, nextEnemyCount);
                this.generatePowerUp(powerUpCount);
                PLAYLIST.ENEMY.play();
            }
        }
    }
}
