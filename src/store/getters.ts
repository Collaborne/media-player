import { VideoGetters } from '../types';

// Getters return a return value, no side effects.
export const videoGetters: VideoGetters = {
	getLastActivity: state => state.lastActivityRef?.current || 0,
	getPlaybackRate: state => state.playbackRate,
	getFullscreen: state => state.fullscreen,
	getPaused: state => !state.playing,
	getPlaying: state => state.playing,
	getMuted: state => state.muted,
	getStartTime: state => state.startTime,
	getEndTime: state => state.endTime,
	getDuration: state => state.duration,
	getCurrentTime: state => state.currentTime,
	getCurrentRelativeTime: state => state.currentRelativeTime,
	getLoop: state => state.loop,
	getVolume: state => state.volume,
	getReady: state => state.ready,
	// NOTE: getHasPlayedOrSeeked does not work for autoplaying embeds
	getHasPlayedOrSeeked: state => state.hasPlayedOrSeeked,
	getPictureInPicture: state => state.pip,
};
