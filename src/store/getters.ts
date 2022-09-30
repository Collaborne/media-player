import { VideoGetters } from '../types';

// Getters return a return value, no side effects.
export const videoGetters: VideoGetters = {
	getPlaybackRate: state => state.playbackRate,
	getPaused: state => !state.playing,
	getPlaying: state => state.playing,
	getMuted: state => state.muted,
	getStartTime: state => state.startTime,
	getEndTime: state => state.endTime,
	getDuration: state => state.duration,
	getCurrentTime: state => state.currentTime,
	getLoop: state => state.loop,
	getVolume: state => state.volume,
	getReady: state => state.ready,
	// NOTE: getHasPlayedOrSeeked does not work for autoplaying embeds
	getHasPlayedOrSeeked: state => state.hasPlayedOrSeeked,
	getPictureInPicture: state => state.pip,
	getHasPipTriggeredByClick: state => state.hasPipTriggeredByClick,
	getShowControls: state => state.showControls,
	getDidPlayAnimationStart: state => state.didPlayAnimationStart,
	getDidPauseAnimationStart: state => state.didPauseAnimationStart,
	getShowPipControls: state => state.showPipControls,
};
