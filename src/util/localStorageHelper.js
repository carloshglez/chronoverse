import { STORAGE_CLASSIC_TOP_SCORE, STORAGE_SPACE_RACE_TOP_SCORE, STORAGE_AWARDS } from './constants';

export const LocalStorageManager = {
	setClassicTopScore: (value) => {
		localStorage[STORAGE_CLASSIC_TOP_SCORE] = value;
	},
	setSpaceRaceTopScore: (value) => {
		localStorage[STORAGE_SPACE_RACE_TOP_SCORE] = value;
	},
	setAwards: (value) => {
		localStorage[STORAGE_AWARDS] = value;
	},
	getClassicTopScore: () => {
		return localStorage[STORAGE_CLASSIC_TOP_SCORE] || 0;
	},
	getSpaceRaceTopScore: () => {
		return localStorage[STORAGE_SPACE_RACE_TOP_SCORE] || 0;
	},
	getAwards: () => {
		return (localStorage[STORAGE_AWARDS])
		? localStorage[STORAGE_AWARDS].split(',').map(Number)
		: [];
	}
}
