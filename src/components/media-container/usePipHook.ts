import { useCallback, useEffect, useRef } from 'react';
import useIntersection from 'react-use/lib/useIntersection';

import { useMediaStore } from '../../context/MediaProvider';
import { useMediaListener } from '../../hooks/use-media-listener';
import { PROGRESS_INTERVAL } from '../../utils/constants';
import { getElementOffset } from '../../utils/html-elements';
import { ContainerSizePosition } from '../draggable-popover/DraggablePopover';

interface UsePipHookProps {
	isPlayerReady: boolean;
}
interface UsePipHook {
	containerSizeRef: React.MutableRefObject<ContainerSizePosition | undefined>;
}

/** Defines root margin when scrolling to bottom */
const BOTTOM_ROOT_MARGIN = '48px';

/** Bind Picture-in-Picture logic to the `<MediaContainer/>`. */
export const usePipHook = ({ isPlayerReady }: UsePipHookProps): UsePipHook => {
	const [
		listener,
		isPlaying,
		currentTime,
		setCurrentTime,
		hasPipTriggeredByClick,
		setHasPipTriggeredByClick,
		mediaContainerRef,
		reactPlayerRef,
		isPip,
		exitPip,
		requestPip,
	] = useMediaStore(state => [
		state.getListener(),
		state.isPlaying,
		state.currentTime,
		state.setCurrentTime,
		state.hasPipTriggeredByClick,
		state.setHasPipTriggeredByClick,
		state.mediaContainerRef,
		state.reactPlayerRef,
		state.isPip,
		state.exitPip,
		state.requestPip,
	]);

	// Checks if media container is in viewport when scrolling bottom
	const entryTop = useIntersection(mediaContainerRef, {
		rootMargin: BOTTOM_ROOT_MARGIN,
	});
	const isVisibleFromScrollingTop = Boolean(entryTop?.isIntersecting);

	// Checks if media container is in viewport when scrolling top
	const entryBottom = useIntersection(mediaContainerRef, {});
	const isVisibleFromScrollingBottom = Boolean(entryBottom?.isIntersecting);

	const containerSizeRef = useRef<ContainerSizePosition>();

	const calculateContainerSizes = useCallback(() => {
		const width = mediaContainerRef?.current?.offsetWidth;
		const height = mediaContainerRef?.current?.offsetHeight;
		const rect = mediaContainerRef?.current
			? getElementOffset(mediaContainerRef.current)
			: undefined;
		if (width && height && rect) {
			containerSizeRef.current = { width, height, ...rect };
		}
		// Calculates only on mounting the MediaContainer and passes this size to <MediaPoster/>
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
			setTimeout(requestPip, 1);
		}
		if (isPip && isVisibleFromScrollingBottom) {
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
			calculateContainerSizes();
			setTimeout(() => {
				setCurrentTime?.(currentTime);
			}, PROGRESS_INTERVAL - 1);
		},
		listener,
	);

	useMediaListener(
		'pipExit',
		() => {
			setTimeout(() => {
				setCurrentTime?.(currentTime);
			}, PROGRESS_INTERVAL - 1);
		},
		listener,
	);

	return { containerSizeRef };
};
