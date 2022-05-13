import { VideoState } from '../types';

interface StatePersistKeys {
	volume?: number;
	playbackRate?: number;
	muted?: boolean;
}

const STATE_PERSIST_KEYS: StatePersistKeys = {
	volume: 1,
	playbackRate: 1,
	muted: false,
};

const persistKeyValue = (key: string, value: string) => {
	window.localStorage[`video_state--${key}`] = JSON.stringify(value);
};

export const readPersistedKeyValue = (key: string): StatePersistKeys =>
	JSON.parse(window.localStorage[`video_state--${key}`]);

export const readPersistedPlaybackRate = (): StatePersistKeys =>
	readPersistedKeyValue('playbackRate');

export const withPersistedState = (state: VideoState): StatePersistKeys => {
	const result = { ...state };
	for (const key in STATE_PERSIST_KEYS) {
		result[key] = readPersistedKeyValue(key);
	}
	return result;
};

export const writePersistedState = (changes: StatePersistKeys): void => {
	for (const key in STATE_PERSIST_KEYS) {
		if (key in changes) {
			persistKeyValue(key, changes[key]);
		}
	}
};
