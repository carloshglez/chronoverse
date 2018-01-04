import { STORAGE_CLASSIC_TOP_SCORE, STORAGE_SPACE_RACE_TOP_SCORE, STORAGE_AWARDS } from './constants';

export function setStorageClassicTopScore(value) {
	localStorage[STORAGE_CLASSIC_TOP_SCORE] = value;
}

export function setStorageSpaceRaceTopScore(value) {
	localStorage[STORAGE_SPACE_RACE_TOP_SCORE] = value;
}

export function setStorageAwards(value) {
	localStorage[STORAGE_AWARDS] = value;
}

export function getStorageClassicTopScore() {
	return localStorage[STORAGE_CLASSIC_TOP_SCORE] || 0;
}

export function getStorageSpaceRaceTopScore() {
	return localStorage[STORAGE_SPACE_RACE_TOP_SCORE] || 0;
}

export function getStorageAwards() {
	return (localStorage[STORAGE_AWARDS])
    ? localStorage[STORAGE_AWARDS].split(',').map(Number)
    : [];
}
