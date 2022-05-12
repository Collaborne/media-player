import { VideoState } from '../types';

interface StatePersistKeys {
	volume?: number;
	playbackRate?: number;
	showCaptions?: boolean;
	muted?: boolean;
}

const STATE_PERSIST_KEYS: StatePersistKeys = {
	volume: 1,
	playbackRate: 1,
	showCaptions: false,
	muted: false,
};

const persistKeyValue = (key: string, value: string) => {
	try {
		window.localStorage[`video_state--${key}`] = JSON.stringify(value);
	} catch (_) {
		// When localStorage doesn't work (embeds), use window so the value still "Persists".
		window[`video_state--${key}`] = value;
	}
};

export const readPersistedKeyValue = (
	key: string,
	defaultValue: boolean | number,
): StatePersistKeys => {
	try {
		return JSON.parse(window.localStorage[`video_state--${key}`]);
	} catch (_) {
		// When localStorage doesn't work (embeds), use window so the value still "Persists".
		return window[`video_state--${key}`] ?? defaultValue;
	}
};

export const readPersistedPlaybackRate = (): StatePersistKeys =>
	readPersistedKeyValue('playbackRate', 1);

export const withPersistedState = (state: VideoState): StatePersistKeys => {
	const result = { ...state };
	for (const key in STATE_PERSIST_KEYS) {
		const defaultValue = STATE_PERSIST_KEYS[key];
		result[key] = readPersistedKeyValue(key, defaultValue);
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
