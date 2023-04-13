import { FC, useEffect, useRef } from 'react';
import useIntersection from 'react-use/lib/useIntersection';
import { shallow } from 'zustand/shallow';

import { useMediaStore } from '../../context/MediaProvider';
import { useMediaListener } from '../../hooks/use-media-listener';

interface UsePipHookProps {
	isPlayerReady: boolean;
}
const ROOT_MARGIN = '-48px 0px -0px 0px';

/** Bind Picture-in-Picture logic to the `<MediaContainer/>`. */
export const UsePipHook: FC<UsePipHookProps> = ({ isPlayerReady }) => {
	const [
		getListener,
		isPlaying,
		setCurrentTime,
		hasPipTriggeredByClick,
		setHasPipTriggeredByClick,
		mediaContainerRef,
		reactPlayerRef,
		isPip,
		exitPip,
		requestPip,
	] = useMediaStore(
		state => [
			state.getListener,
			state.isPlaying,
			state.setCurrentTime,
			state.hasPipTriggeredByClick,
			state.setHasPipTriggeredByClick,
			state.mediaContainerRef,
			state.reactPlayerRef,
			state.isPip,
			state.exitPip,
			state.requestPip,
		],
		shallow,
	);

	const listener = getListener();
	// Store currentTime into a ref, to avoid rerenders
	const currentTimeRef = useRef(0);

	useMediaListener(
		'timeupdate',
		e => (currentTimeRef.current = e.seconds),
		listener,
	);

	// Checks if media container is in viewport when scrolling bottom
	const intersectionObservable = useIntersection(mediaContainerRef, {
		rootMargin: ROOT_MARGIN,
		threshold: 0,
	});

	const isVisible = intersectionObservable?.isIntersecting;

	// If we have called PIP events via click, refresh hasPipTriggeredByClick
	// eg: triggering PIP by click, being in viewport wont overlap events
	useEffect(() => {
		if (isVisible !== undefined) {
			setHasPipTriggeredByClick(isVisible);
		}
	}, [isVisible, setHasPipTriggeredByClick]);

	// If the player is mounted, ready and isPlaying then display/hide pip player
	useEffect(() => {
		// Allow to enter PIP mode, except clicks on pip icon button
		if (hasPipTriggeredByClick) {
			return;
		}
		const mediaEl = reactPlayerRef?.current?.getInternalPlayer();

		if (!isPlaying || !isPlayerReady || !mediaEl) {
			return;
		}

		if (!isPip && !isVisible) {
			requestPip();
		}
		if (isPip && isVisible) {
			exitPip();
		}
	}, [
		isPlayerReady,
		isPlaying,
		isVisible,
		reactPlayerRef,
		isPip,
		hasPipTriggeredByClick,
		requestPip,
		exitPip,
	]);

	// When entering for the first time in PIP, react player got unmounted

	useMediaListener(
		'pipEnter',
		async () => {
			const mediaEl = reactPlayerRef?.current?.getInternalPlayer();
			if (mediaEl) {
				mediaEl.currentTime = currentTimeRef.current;
				setCurrentTime?.(currentTimeRef.current);
			}
		},
		listener,
	);

	return null;
};
