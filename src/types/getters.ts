import { VideoState } from '.';

export type VideoGetter<T> = (state: VideoState) => T;

/**
 * Video Getters for controlling video player
 * TODO: check necessity of getCurrentRelativeTime
 */

export interface VideoGetters {
	getLastActivity: VideoGetter<number>;
	getPlaybackRate: VideoGetter<number>;
	getPaused: VideoGetter<boolean>;
	getPlaying: VideoGetter<boolean>;
	getMuted: VideoGetter<boolean>;
	getStartTime: VideoGetter<number>;
	getEndTime: VideoGetter<number>;
	getDuration: VideoGetter<number>;
	getCurrentTime: VideoGetter<number>;
	getCurrentRelativeTime: VideoGetter<number>;
	getLoop: VideoGetter<boolean>;
	getVolume: VideoGetter<number>;
	getReady: VideoGetter<boolean>;
	getHasPlayedOrSeeked: VideoGetter<boolean>;
	getPictureInPicture: VideoGetter<boolean>;
	getHasPipTriggeredByClick: VideoGetter<boolean>;
}

export type VideoGettersKey = keyof VideoGetters;

export type VideoGettersApi = {
	[K in VideoGettersKey]: () => ReturnType<VideoGetters[K]>;
};
