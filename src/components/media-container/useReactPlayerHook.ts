import Bowser from 'bowser';
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import useUnmount from 'react-use/lib/useUnmount';

import { useMediaStore } from '../../context';
import { ReactPlayerProps } from '../../types';

interface UseReactPlayerHookProps {
	url: string;
}
interface UseReactPlayerHook {
	isPlayerReady: boolean;
	reactPlayerProps: ReactPlayerProps;
}
export const useReactPlayerHook = ({
	url,
}: UseReactPlayerHookProps): UseReactPlayerHook => {
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
		isPip,
		onPlay,
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
		state.isPip,
		state.play,
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

	const [isPlayerReady, setIsPlayerReady] = useState(Boolean(url));
	const hasAutoFocusedRef = useRef(false);

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
	};
};
