import screenfull from 'screenfull';
import { VideoActions } from '../types/actions';
import { canPIP, closePIP, getVideoEl, openPIP } from '../utils';

export const videoActions: VideoActions = {
	// all public actions (not prefixed with `_`)
	// set "lastActivityRef" to a new Date
	// lastActivityRef is used to figure out when to hide/show player controls.
	play: state => {
		state.emitter.emit('play');

		const video = getVideoEl(state);

		if (
			video.currentTime >= state.endTime ||
			video.currentTime < state.startTime
		) {
			video.currentTime = state.startTime;
			state.playPromiseRef.current = video.play();
			return {
				playing: true,
				currentTime: state.startTime,
				currentRelativeTime: 0,
				hasPlayedOrSeeked: true,
			};
		}

		if (video) {
			state.playPromiseRef.current = video.play();
		}

		return { playing: true, hasPlayedOrSeeked: true };
	},
	setOneTimeStopPoint: (_state, seconds) => {
		// "one time stop point" is a point that pauses the video once reached, then is erased.
		// This is used within transcript to tell the player to pause once it reaches the end of a clip.
		return {
			oneTimeStopPoint: seconds,
		};
	},
	setNewBounds: (state, { startTime, endTime }) => {
		// Do nothing if time hasn't changed.
		if (state.startTime === startTime && state.endTime === endTime) {
			return state;
		}

		const video = getVideoEl(state);
		if (video) {
			video.currentTime = startTime;
		}

		return {
			playing: false,
			currentTime: startTime,
			currentRelativeTime: 0,
			startTime,
			endTime,
			duration: endTime - startTime,
		};
	},
	pause: state => {
		state.emitter?.emit('pause');
		const video = getVideoEl(state);

		// playing a video is async operation
		// details: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play
		// pausing a video is sync: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause
		if (video && state.playPromiseRef?.current) {
			void state.playPromiseRef.current.then(() => video.pause());
		}
		return { playing: false };
	},
	mute: state => {
		state.emitter?.emit('mute');

		return {
			muted: true,
		};
	},
	unmute: state => {
		state.emitter?.emit('unnmute');

		return {
			muted: false,
		};
	},
	setLoop: (_state, loop) => ({ loop }),
	setPlaybackRate: (state, playbackRate) => {
		state.emitter?.emit('setPlaybackRate', { playbackRate });
		return { playbackRate };
	},
	setVolume: (_state, volume) => ({ volume: Math.min(Math.max(volume, 0), 1) }),
	setCurrentTime: (state, relativeSeconds = 0) => {
		relativeSeconds = Math.min(
			state?.duration ?? 0,
			Math.max(0, relativeSeconds),
		);
		const videoEl = getVideoEl(state);

		if (videoEl) {
			const diffMs = (relativeSeconds - videoEl.currentTime) * 1000;
			videoEl.currentTime = state.startTime + relativeSeconds;
			state.emitter?.emit('seeked', { diffMs });
			state.emitter?.emit('timeUpdate', {
				seconds: relativeSeconds,
				duration: state.duration,
			});
		}
		return {
			currentTime: state.startTime + relativeSeconds,
			currentRelativeTime: relativeSeconds,
			oneTimeStopPoint: null, // Erase 'soft stop point' when user seeks.
			hasPlayedOrSeeked: true,
		};
	},
	requestFullscreen: async state => {
		const video = getVideoEl(state);
		if (!video) {
			return;
		}
		if (canPIP() && video && state.pip) {
			// Ignore pip exit DOM errors (we are just trying to exit any open pip),
			// if there is no open pip DOM will throw an error we ignore.
			// eslint-disable-next-line promise/valid-params
			await closePIP(video).catch(console.warn);
		}
		state.emitter.emit('fullscreenEnter');
		// requesting fullscreen for video player wrapper to include UI for the controls
		if (screenfull.isEnabled && video.parentElement?.parentElement) {
			void screenfull.request(video.parentElement?.parentElement);
		}
	},

	exitFullscreen: state => {
		state.emitter.emit('fullscreenExit');
		if (screenfull.isEnabled) {
			screenfull.exit().catch(console.error);
		}
	},
	setFullscreen: (_state, fullscreen) => ({ fullscreen }),

	setStartTime: (_state, startTime) => ({ startTime }),
	setEndTime: (_state, endTime) => ({ endTime }),

	setDuration: (state, duration) => {
		if (state.duration > 0) {
			return state;
		}

		return {
			duration,
			endTime: (state.startTime ?? 0) + duration,
			currentRelativeTime: 0,
			startTime: 0,
			currentTime: 0,
		};
	},

	requestPip: async state => {
		state.emitter.emit('pipEnter');
		const video = getVideoEl(state);
		if (canPIP()) {
			await openPIP(video).catch(console.warn);
		}
	},
	exitPip: async state => {
		state.emitter.emit('pipExit');
		const video = getVideoEl(state);
		if (canPIP()) {
			await closePIP(video).catch(console.warn);
		}
	},

	// Private Actions
	_setReady: state => {
		// In safari, any seeking that happens before a video is ready is canceled as soon
		// as the video loads.
		// Counteract this by re-seeking to state time on the first ready.
		const videoEl = getVideoEl(state);
		if (videoEl && !state.ready && videoEl.currentTime !== state.currentTime) {
			videoEl.currentTime = state.currentTime;
		}
		return { ready: true };
	},
	_handleProgress: (state, currentTime) => {
		const currentRelativeTime = Math.min(
			state.endTime ?? 0,
			Math.max(0, currentTime - (state.startTime ?? 0)),
		);
		if (state.playing) {
			state.emitter?.emit('timeUpdate', {
				seconds: currentRelativeTime,
				duration: state.duration,
			});
			state.emitter?.emit('progress', {
				seconds: currentRelativeTime,
				duration: state.duration,
			});
		}
		if (currentTime >= (state.endTime ?? 0)) {
			state.emitter?.emit('end');
		}
		let { playing, oneTimeStopPoint } = state;

		// If the currentTime is *approaching* the soft stop point but hasn't reached it yet,
		// go ahead and stop. We only receive time updates every 50ms, so we want to stop once
		// the video "almost" reaches the point.
		if (oneTimeStopPoint && currentTime >= oneTimeStopPoint) {
			playing = false;
			oneTimeStopPoint = null;
		} else if (currentTime >= (state.startTime ?? 0) + (state.duration ?? 0)) {
			playing = false;
			state.emitter?.emit('relativeEnd');
		}
		return {
			currentTime,
			currentRelativeTime,
			playing,
			oneTimeStopPoint,
		};
	},
};
