
export const STORAGE_CLASSIC_TOP_SCORE = 'topscore';
export const STORAGE_SPACE_RACE_TOP_SCORE = 'topscore_sp';
export const STORAGE_AWARDS = 'awards';

/**
 *
 */
export const KEY = {
	LEFT: 37,
	A: 65,
	RIGHT: 39,
	D: 68,
	UP: 38,
	W: 87,
	SHIELD: 40,
	S: 83,
	SHOOT: 32
};

/**
 *
 */
export const ENEMY_TYPE = {
	EXPLORER: 1,
	HUNTER: 2
};

/**
 *
 */
export const GAME_STATE = {
	INTRO: 'intro',
    SELECT: 'select',
    CLASSIC: 'inClassicGame',
    SPACE_RACE: 'inSpaceRaceGame',
	OVER: 'over',
	ABOUT: 'about',
	AWARDS: 'awards'
};

/**
 *
 */
export const GAME_RULES = {
    CLASSIC: {
		id: 1,
		title: 'Classic',
		topScore: 0,
		onClickEvent: null,
		unlockAt: 0,
		unlockMessage: ''
	},
    SPACE_RACE: {
		id: 2,
		title: 'Space Race',
		topScore: 0,
		onClickEvent: null,
		unlockAt: 2000,
		unlockMessage: 'Get 2000 points'
	}
};
