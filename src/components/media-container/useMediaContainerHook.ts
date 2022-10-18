import Bowser from 'bowser';
import { throttle } from 'lodash';
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useEvent } from 'react-use';
import useUnmount from 'react-use/lib/useUnmount';

import { useMediaStore } from '../../context';
import { ReactPlayerProps } from '../../types';
import { OVERLAY_HIDE_DELAY } from '../../utils/constants';

const MOUSE_MOVE_THROTTLE = 1000;
interface UseMediaContainerHookProps {
	url: string;
}
interface UseMediaContainerHook {
	isPlayerReady: boolean;
	onMouseLeave: () => void;
	onMouseEnter: () => void;
	onMouseMove: () => void;
	reactPlayerProps: ReactPlayerProps;
}
export const useMediaContainerHook = ({
	url,
}: UseMediaContainerHookProps): UseMediaContainerHook => {
	const readyFiredRef = useRef(false);
	const hasAutoplayedRef = useRef(false);
	const [
		reactPlayerRef,
		mediaContainerRef,
		initialState,
		playbackRate,
		isPlaying,
		isMuted,
		volume,
		emitter,
		setReady,
		setDuration,
		onProgress,
		onPause,
		setCurrentTime,
		isFullscreen,
		isPip,
		onPlay,
		showControls,
		setShowControls,
	] = useMediaStore(state => [
		state.reactPlayerRef,
		state.mediaContainerRef,
		state.initialState,
		state.playbackRate,
		state.isPlaying,
		state.isMuted,
		state.volume,
		state.emitter,
		state._setReady,
		state.setDuration,
		state._handleProgress,
		state.pause,
		state.setCurrentTime,
		state.isFullscreen,
		state.isPip,
		state.play,
		state.showControls,
		state.setShowControls,
	]);

	const reactPlayerProps: ReactPlayerProps = {
		autoPlay: initialState.isPlaying,
		playsinline: true,
		playbackRate,
		playing: isPlaying,
		muted: isMuted,
		volume,
		ref: reactPlayerRef,
		onReady: () => {
			emitter.emit('ready');
			if (!readyFiredRef?.current) {
				emitter.emit('firstReady');
				readyFiredRef.current = true;
			}
			setReady();
		},
		onEnded: () => emitter.emit('ended'),
		onDuration: duration => {
			emitter.emit('durationchange', { duration });
			setDuration(duration);
		},
		onProgress: ({ playedSeconds }) => onProgress(playedSeconds),
	};

	// Force a ready event for safari when the media has been loaded
	useEffect(() => {
		const browser = Bowser.getParser(window.navigator.userAgent);

		if (!browser.satisfies({ safari: '>1' })) {
			return;
		}
		const mediaEl = reactPlayerRef?.current?.getInternalPlayer();
		if (mediaEl) {
			mediaEl.load();
		}
	});

	const onReadyToPlay = useCallback(() => {
		const mediaEl = reactPlayerRef?.current?.getInternalPlayer();
		emitter.off('seeked', onReadyToPlay);
		mediaEl
			?.play()
			.then(() => emitter.emit('autoplayStart'))
			.catch((error: unknown) => {
				console.info('Player failed to autoplay', error);
				onPause();
			});
	}, [onPause, emitter, reactPlayerRef]);

	// Play is a async operation. so when the player is ready to autoplay media,
	// then we must be sure that first of all we solve setCurrentTime and after that the play method.
	// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play
	const onReadyToSeek = useCallback(() => {
		emitter.on('seeked', onReadyToPlay);
		emitter.off('ready', onReadyToSeek);
		window.setTimeout(() => {
			setCurrentTime(0);
		}, 0);
	}, [emitter, onReadyToPlay, setCurrentTime]);

	useLayoutEffect(() => {
		if (
			!hasAutoplayedRef.current &&
			reactPlayerRef?.current &&
			initialState?.isPlaying
		) {
			const el = reactPlayerRef?.current?.getInternalPlayer();
			if (el && el.parentElement) {
				el.parentElement?.focus();
			}
			const mediaEl = reactPlayerRef.current?.getInternalPlayer();
			if (!mediaEl) return;

			emitter.on('ready', onReadyToSeek);
		}
		hasAutoplayedRef.current = true;
	}, [emitter, initialState, onReadyToSeek, reactPlayerRef]);

	// Store the user's last "activity" (including mousemove over player) within a ref,
	// so that state re-renders are not triggered every mousemove.
	const lastActivityRef = useRef<number>();
	const markActivity = useCallback(() => {
		if (lastActivityRef) {
			lastActivityRef.current = Date.now();
		}
	}, []);
	const [lastMouseLeave, setLastMouseLeave] = useState<number>(0);
	const [lastMouseMove, setLastMouseMove] = useState<number>(0);
	const [isPlayerReady, setIsPlayerReady] = useState(Boolean(url));
	const hasAutoFocusedRef = useRef(false);

	const updateShowControls = useCallback(() => {
		if (isFullscreen) {
			return setShowControls(true);
		}
		const lastActivity = lastActivityRef?.current || 0;
		if (!isPlaying) {
			return setShowControls(true);
		}
		if (isPip) {
			return setShowControls(true);
		}
		return setShowControls(Date.now() - lastActivity < OVERLAY_HIDE_DELAY);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isFullscreen, lastActivityRef, lastMouseLeave, isPip]);

	useEffect(updateShowControls, [
		updateShowControls,
		showControls,
		isPlaying,
		lastMouseMove,
	]);

	useLayoutEffect(() => {
		if (!url || hasAutoFocusedRef.current) {
			return;
		}
		const mediaContainerElement = reactPlayerRef?.current?.wrapper;
		if (!mediaContainerElement) {
			throw new Error(
				'mediaContainerElement can not be null after componentDidMount.',
			);
		}
		const timeoutId = setTimeout(() => {
			mediaContainerElement.focus();
			hasAutoFocusedRef.current = true;
		}, 100);
		return () => clearTimeout(timeoutId);
	}, [url, reactPlayerRef]);

	useUnmount(() => {
		// Bug: media is stuck browser memory, so even after dismount the OS play/pause controls work
		// Clear src attribute so it's removed.
		const mediaEl = mediaContainerRef?.current?.querySelector('media');
		if (mediaEl) {
			mediaEl.setAttribute('src', '');
		}
	});

	const togglePlay = useCallback(() => {
		// PIP mode disables clicking on screen to toggle isPlaying
		if (isPip) {
			return;
		}
		if (!isPlaying) {
			return onPlay();
		}
		return onPause();
	}, [isPip, isPlaying, onPause, onPlay]);

	const onMouseEnter = useCallback(() => {
		markActivity();
		setLastMouseMove(Date.now());
	}, [markActivity]);

	const onMouseLeave = useCallback(() => {
		setShowControls(false);
	}, [setShowControls]);

	const onMouseMove = useMemo(() => {
		const throttled = throttle(() => {
			markActivity();
			setLastMouseLeave(Date.now());
		}, MOUSE_MOVE_THROTTLE);
		return () => {
			return throttled();
		};
	}, [markActivity]);

	// Add stop/pause events on clicking to media-player
	useEffect(() => {
		const mediaContainerElement = reactPlayerRef?.current?.wrapper;
		if (mediaContainerElement == null) {
			return console.error(
				'mediaContainerElement can not be null after componentDidMount.',
			);
		}
		mediaContainerElement.addEventListener('click', togglePlay);
		return () => {
			mediaContainerElement.removeEventListener('click', togglePlay);
		};
	}, [reactPlayerRef, togglePlay]);

	// Show media controls when controls are focused
	useEvent(
		'focus',
		() => {
			markActivity();
			updateShowControls();
		},
		mediaContainerRef?.current,
		{ capture: true },
	);

	// Updating media state with show controls
	useEffect(() => {
		setShowControls(showControls);
	}, [showControls]);

	// Updating media players bottom control's panel after OVERLAY_HIDE_DELAY time period
	useEffect(() => {
		if (!isPlaying) {
			return;
		}
		const timeoutId = setTimeout(updateShowControls, OVERLAY_HIDE_DELAY + 100);
		return () => clearTimeout(timeoutId);
	}, [updateShowControls, lastMouseMove, isPlaying]);

	useEffect(() => {
		// If media is already loaded with one valid url, don't re-load player.
		if (isPlayerReady) {
			return;
		}
		if (url) {
			setIsPlayerReady(true);
		} else if (!url) {
			setIsPlayerReady(true);
		}
	}, [url, isPlayerReady]);

	return {
		reactPlayerProps,
		isPlayerReady,
		onMouseLeave,
		onMouseEnter,
		onMouseMove,
	};
};
