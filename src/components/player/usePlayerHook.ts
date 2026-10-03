import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import useUnmount from 'react-use/lib/useUnmount';
import { shallow } from 'zustand/shallow';

import { useMediaStore } from '../../context';

interface UsePlayerHookProps {
	url: string;
}

export const usePlayerHook = ({ url }: UsePlayerHookProps) => {
	const hasAutoplayedRef = useRef(false);
	const [
		reactPlayerRef,
		initialState,
		isPlaying,
		emitter,
		onPause,
		setCurrentTime,
		isPip,
		onPlay,
	] = useMediaStore(
		state => [
			state.reactPlayerRef,
			state.initialState,
			state.isPlaying,
			state.emitter,
			state.pause,
			state.setCurrentTime,
			state.isPip,
			state.play,
		],
		shallow,
	);

	const onReadyToPlay = useCallback(() => {
		const mediaEl = reactPlayerRef?.current;
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
			initialState.autoPlay
		) {
			const el = reactPlayerRef?.current;
			if (el && el.parentElement) {
				el.parentElement?.focus();
			}
			const mediaEl = reactPlayerRef.current;
			if (!mediaEl) {
				return;
			}

			emitter.on('ready', onReadyToSeek);
		}
		hasAutoplayedRef.current = true;
	}, [emitter, initialState.autoPlay, onReadyToSeek, reactPlayerRef]);

	const hasAutoFocusedRef = useRef(false);

	useLayoutEffect(() => {
		if (!url || hasAutoFocusedRef.current) {
			return;
		}
		const mediaContainerElement = reactPlayerRef?.current?.parentElement;
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
		const mediaEl = reactPlayerRef.current;
		if (mediaEl) {
			mediaEl.removeAttribute('src');
			mediaEl.load();
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
		const mediaContainerElement = reactPlayerRef?.current?.parentElement;
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

	return {};
};
