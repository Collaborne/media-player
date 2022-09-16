import { VideoState } from '.';

export type VideoGetter<T> = (state: VideoState) => T;

/** List of getters for the VideoState */
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
	getLoop: VideoGetter<boolean>;
	getVolume: VideoGetter<number>;
	getReady: VideoGetter<boolean>;
	getHasPlayedOrSeeked: VideoGetter<boolean>;
	getPictureInPicture: VideoGetter<boolean>;
	getHasPipTriggeredByClick: VideoGetter<boolean>;
	getShowControls: VideoGetter<boolean>;
	getShowPipControls: VideoGetter<boolean>;
	getDidPauseAnimationStart: VideoGetter<boolean>;
	getDidPlayAnimationStart: VideoGetter<boolean>;
}

export type VideoGettersKey = keyof VideoGetters;

export type VideoGettersApi = {
	[K in VideoGettersKey]: () => ReturnType<VideoGetters[K]>;
};
