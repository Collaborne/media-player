/* eslint-disable max-lines */
import Bowser from 'bowser';
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import { useEvent } from 'react-use';
import useIntersection from 'react-use/lib/useIntersection';
import useUnmount from 'react-use/lib/useUnmount';

import { useMediaStore } from '../../context';
import { useVideoListener } from '../../hooks';
import { ReactPlayerProps } from '../../types';
import { OVERLAY_HIDE_DELAY, PROGRESS_INTERVAL } from '../../utils/constants';
import { getElementOffset } from '../../utils/html-elements';
import { ContainerSizePosition } from '../draggable-popover/DraggablePopover';

interface UseVideoContainerHookProps {
	videoUrl: string;
}
interface UseVideoContainerHook {
	isPlayerReady: boolean;
	onMouseLeave: () => void;
	onMouseEnter: () => void;
	containerSizeRef: React.MutableRefObject<ContainerSizePosition | undefined>;
	reactPlayerProps: ReactPlayerProps;
}

/** Defines root margin when scrolling to bottom */
const BOTTOM_ROOT_MARGIN = '48px';

export const useVideoContainerHook = ({
	videoUrl,
}: UseVideoContainerHookProps): UseVideoContainerHook => {
	// UseProvider hooks
	const readyFiredRef = useRef(false);
	const hasAutoplayedRef = useRef(false);
	const [
		reactPlayerRef,
		listener,
		videoContainerRef,
		initialState,
		playbackRate,
		playing,
		muted,
		volume,
		emitter,
		setReady,
		setDuration,
		onProgress,
		onPause,
		setCurrentTime,
		isFullscreen,
		hasPipTriggeredByClick,
		isPip,
		onPlay,
		requestPip,
		exitPip,
		currentTime,
		setHasPipTriggeredByClick,
	] = useMediaStore(state => [
		state.reactPlayerRef,
		state.getListener(),
		state.videoContainerRef,
		state.initialState,
		state.playbackRate,
		state.playing,
		state.muted,
		state.volume,
		state.emitter,
		state._setReady,
		state.setDuration,
		state._handleProgress,
		state.pause,
		state.setCurrentTime,
		state.isFullscreen,
		state.hasPipTriggeredByClick,
		state.pip,
		state.play,
		state.requestPip,
		state.exitPip,
		state.currentTime,
		state.setHasPipTriggeredByClick,
	]);

	const reactPlayerProps: ReactPlayerProps = {
		autoPlay: initialState.playing,
		playsinline: true,
		playbackRate,
		playing,
		muted,
		volume,
		ref: reactPlayerRef,
		onReady: () => {
			emitter?.emit('ready');
			if (!readyFiredRef?.current) {
				emitter?.emit('firstReady');
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

	// Force a ready event for safari when the video has been loaded
	useEffect(() => {
		const browser = Bowser.getParser(window.navigator.userAgent);

		if (!browser.satisfies({ safari: '>1' })) {
			return;
		}
		const videoEl = reactPlayerRef?.current?.getInternalPlayer();
		if (videoEl) {
			videoEl.load();
		}
	});

	const onReadyToPlay = useCallback(() => {
		const mediaEl = reactPlayerRef?.current?.getInternalPlayer();
		emitter.off('seeked', onReadyToPlay);
		mediaEl
			?.play()
			.then(() => emitter?.emit('autoplayStart'))
			.catch((error: unknown) => {
				console.info('Player failed to autoplay', error);
				onPause();
			});
	}, [onPause, emitter, reactPlayerRef]);

	// Play is a async operation. so when the player is ready to autoplay video,
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
			initialState?.playing
		) {
			const el = reactPlayerRef?.current?.getInternalPlayer();
			if (el && el.parentElement) {
				el.parentElement?.focus();
			}
			const videoEl = reactPlayerRef.current?.getInternalPlayer();
			if (!videoEl) return;

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
	const [showControls, setShowControls] = useState(true);
	const [lastMouseLeave, setLastMouseLeave] = useState<number>(0);
	const [lastMouseMove, setLastMouseMove] = useState<number>(0);
	const [isPlayerReady, setIsPlayerReady] = useState(Boolean(videoUrl));

	const hasAutoFocusedRef = useRef(false);
	const containerSizeRef = useRef<ContainerSizePosition>();

	// Checks if video container is in viewport when scrolling bottom
	const entryTop = useIntersection(videoContainerRef, {
		rootMargin: BOTTOM_ROOT_MARGIN,
	});
	const isVisibleFromScrollingTop = Boolean(entryTop?.isIntersecting);

	// Checks if video container is in viewport when scrolling top
	const entryBottom = useIntersection(videoContainerRef, {});
	const isVisibleFromScrollingBottom = Boolean(entryBottom?.isIntersecting);

	const updateShowControls = useCallback(() => {
		if (isFullscreen) {
			return setShowControls(true);
		}
		const lastActivity = lastActivityRef?.current || 0;
		if (!playing) {
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
		playing,
		lastMouseMove,
	]);

	useLayoutEffect(() => {
		if (!videoUrl || hasAutoFocusedRef.current) {
			return;
		}
		const videoContainerElement = reactPlayerRef?.current?.wrapper;
		if (!videoContainerElement) {
			throw new Error(
				'videoContainerElement can not be null after componentDidMount.',
			);
		}
		const timeoutId = setTimeout(() => {
			videoContainerElement.focus();
			hasAutoFocusedRef.current = true;
		}, 100);
		return () => clearTimeout(timeoutId);
	}, [videoUrl, reactPlayerRef]);

	useUnmount(() => {
		// Bug: video is stuck browser memory, so even after dismount the OS play/pause controls work
		// Clear src attribute so it's removed.
		const videoEl = videoContainerRef?.current?.querySelector('video');
		if (videoEl) {
			videoEl.setAttribute('src', '');
		}
	});

	const togglePlay = useCallback(() => {
		// PIP mode disables clicking on screen to toggle playing
		if (isPip) {
			return;
		}
		if (!playing) {
			return onPlay();
		}
		return onPause();
	}, [isPip, playing, onPause, onPlay]);

	const onMouseEnter = useCallback(() => {
		markActivity?.();
		setLastMouseMove(Date.now());
	}, [markActivity]);

	const onMouseLeave = useCallback(() => setLastMouseLeave(Date.now()), []);

	// Add stop/pause events on clicking to video-player
	useEffect(() => {
		const videoContainerElement = reactPlayerRef?.current?.wrapper;
		if (videoContainerElement == null) {
			return console.error(
				'videoContainerElement can not be null after componentDidMount.',
			);
		}
		videoContainerElement.addEventListener('click', togglePlay);
		return () => {
			videoContainerElement.removeEventListener('click', togglePlay);
		};
	}, [reactPlayerRef, togglePlay]);

	// Show video controls when controls are focused
	useEvent(
		'focus',
		() => {
			markActivity?.();
			updateShowControls();
		},
		videoContainerRef?.current,
		{ capture: true },
	);

	const calculateContainerSizes = useCallback(() => {
		const width = videoContainerRef?.current?.offsetWidth;
		const height = videoContainerRef?.current?.offsetHeight;
		const rect = videoContainerRef?.current
			? getElementOffset(videoContainerRef.current)
			: undefined;
		if (width && height && rect) {
			containerSizeRef.current = { width, height, ...rect };
		}
		// Calculates only on mounting the VideoContainer and passes this size to <VideoPoster/>
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// On wheel event - updating that pip isn't triggered by a click on pip icon button
	// In this way we can evite overlapping of wheel vs click onPip
	useEffect(() => {
		const onWheel = () => {
			if (!isVisibleFromScrollingBottom || !isVisibleFromScrollingTop) {
				setHasPipTriggeredByClick(false);
			}
		};
		document.body.addEventListener('wheel', onWheel);
		return () => document.body.removeEventListener('wheel', onWheel);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isVisibleFromScrollingBottom, isVisibleFromScrollingTop]);

	// If the player is mounted, ready and playing then display/hide pip player
	useEffect(() => {
		// Allow to enter PIP mode, except clicks on pip icon button
		if (hasPipTriggeredByClick) {
			return;
		}
		const videoEl = reactPlayerRef?.current?.getInternalPlayer();
		if (!playing || !isPlayerReady || !videoEl) {
			return;
		}
		if (!isPip && !isVisibleFromScrollingTop) {
			requestPip?.();
		}
		if (isPip && isVisibleFromScrollingBottom) {
			exitPip?.();
		}
	}, [
		isPlayerReady,
		playing,
		isVisibleFromScrollingTop,
		isVisibleFromScrollingBottom,
		reactPlayerRef,
		isPip,
		hasPipTriggeredByClick,
		requestPip,
		exitPip,
	]);

	// TODO: Open a issue for ReactPlayer on github
	// Listening for pip events and updating currentTime for ProgressBar
	// This is used for covering bugs with ReactPlayer
	useVideoListener(
		'pipEnter',
		() => {
			calculateContainerSizes();
			setTimeout(() => {
				setCurrentTime?.(currentTime);
			}, PROGRESS_INTERVAL - 1);
		},
		listener,
	);
	// Updating video state with show controls
	useEffect(() => {
		setShowControls?.(showControls);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showControls]);

	useVideoListener(
		'pipExit',
		() => {
			setTimeout(() => {
				setCurrentTime?.(currentTime);
			}, PROGRESS_INTERVAL - 1);
		},
		listener,
	);

	// Updating video players bottom control's panel after OVERLAY_HIDE_DELAY time period
	useEffect(() => {
		if (!playing) {
			return;
		}
		const timeoutId = setTimeout(updateShowControls, OVERLAY_HIDE_DELAY + 100);
		return () => clearTimeout(timeoutId);
	}, [updateShowControls, lastMouseMove, playing]);

	useEffect(() => {
		// If video is already loaded with one valid url, don't re-load player.
		if (isPlayerReady) {
			return;
		}
		if (videoUrl) {
			setIsPlayerReady(true);
		} else if (!videoUrl) {
			setIsPlayerReady(true);
		}
	}, [videoUrl, isPlayerReady]);

	return {
		isPlayerReady,
		onMouseLeave,
		onMouseEnter,
		containerSizeRef,
		reactPlayerProps,
	};
};
