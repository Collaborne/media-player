import { throttle } from 'lodash';
import { useCallback, useEffect, useRef } from 'react';
import useIntersection from 'react-use/lib/useIntersection';
import shallow from 'zustand/shallow';

import { useMediaStore } from '../../context/MediaProvider';
import { useMediaListener } from '../../hooks/use-media-listener';
import { PROGRESS_INTERVAL } from '../../utils/constants';

interface UsePipHookProps {
	isPlayerReady: boolean;
}
interface UsePipHook {}

/** Defines root margin when scrolling to bottom */
const BOTTOM_ROOT_MARGIN = '48px';

/**  A const for throttling onWheel event in ms */
const WHEEL_THROTTLE = 1000;
/** Bind Picture-in-Picture logic to the `<MediaContainer/>`. */
export const usePipHook = ({ isPlayerReady }: UsePipHookProps): UsePipHook => {
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
	const entryTop = useIntersection(mediaContainerRef, {
		rootMargin: BOTTOM_ROOT_MARGIN,
	});
	const isVisibleFromScrollingTop = Boolean(entryTop?.isIntersecting);

	// Checks if media container is in viewport when scrolling top
	const entryBottom = useIntersection(mediaContainerRef, {});
	const isVisibleFromScrollingBottom = Boolean(entryBottom?.isIntersecting);

	// On wheel event - updating that pip isn't triggered by a click on pip icon button
	// In this way we can evite overlapping of wheel vs click onPip
	const onWheel = useCallback(() => {
		const isInsideScrollingArea =
			isVisibleFromScrollingBottom && isVisibleFromScrollingTop;
		setHasPipTriggeredByClick(isInsideScrollingArea);
	}, [
		isVisibleFromScrollingBottom,
		isVisibleFromScrollingTop,
		setHasPipTriggeredByClick,
	]);
	useEffect(() => {
		const onWheelThrottled = throttle(onWheel, WHEEL_THROTTLE);
		document.body.addEventListener('wheel', onWheelThrottled);
		return () => document.body.removeEventListener('wheel', onWheelThrottled);
	}, [onWheel]);

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
		if (!isPip && !isVisibleFromScrollingTop) {
			// New MediaStore context wont be ready to be passed into PIP mode(it will be again initialized),
			// so need to await all processes via creating a macrotask
			setTimeout(requestPip, 1);
		}
		if (isPip && isVisibleFromScrollingBottom) {
			// New MediaStore context wont be ready to be passed into PIP mode(it will be again initialized),
			// so need to await all processes via creating a macrotask
			setTimeout(exitPip, 1);
		}
	}, [
		isPlayerReady,
		isPlaying,
		isVisibleFromScrollingTop,
		isVisibleFromScrollingBottom,
		reactPlayerRef,
		isPip,
		hasPipTriggeredByClick,
		requestPip,
		exitPip,
	]);

	// Listening for pip events and updating currentTime for ProgressBar
	// This is used for covering bugs with ReactPlayer
	useMediaListener(
		'pipEnter',
		() => {
			setTimeout(() => {
				setCurrentTime?.(currentTimeRef.current);
			}, PROGRESS_INTERVAL - 1);
		},
		listener,
	);

	useMediaListener(
		'pipExit',
		() => {
			setTimeout(() => {
				setCurrentTime?.(currentTimeRef.current);
			}, PROGRESS_INTERVAL - 1);
		},
		listener,
	);

	return {};
};
