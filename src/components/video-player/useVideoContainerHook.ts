import useEventListener from '@use-it/event-listener';
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import useIntersection from 'react-use/lib/useIntersection';
import useUnmount from 'react-use/lib/useUnmount';

import { useVideo } from '../../hooks';
import { OVERLAY_HIDE_DELAY, PROGRESS_INTERVAL } from '../../utils/constants';
import { getElementOffset } from '../../utils/html-elements';
import { ContainerSizePosition } from '../draggable-popover/DraggablePopover';

interface UseVideoContainerHookProps {
	videoUrl: string;
	hasPlayEnabled?: boolean;
	onPlay?: VoidFunction;
}
interface UseVideoContainerHook {
	isPlayerReady: boolean;
	onMouseLeave: () => void;
	onMouseEnter: () => void;
	containerSizeRef: React.MutableRefObject<ContainerSizePosition | undefined>;
	showControls: boolean;
}

/** Defines root margin when scrolling to bottom */
const BOTTOM_ROOT_MARGIN = '48px';

export const useVideoContainerHook = ({
	videoUrl,
	hasPlayEnabled,
	onPlay,
}: UseVideoContainerHookProps): UseVideoContainerHook => {
	const {
		reactPlayerRef,
		api,
		lastActivityRef,
		markActivity,
		controlsConfig,
		videoContainerRef,
		fullScreenApi,
	} = useVideo();
	const [showControls, setShowControls] = useState(true);
	const [lastMouseLeave, setLastMouseLeave] = useState<number>(0);
	const [lastMouseMove, setLastMouseMove] = useState<number>(0);
	const [isPlayerReady, setIsPlayerReady] = useState(Boolean(videoUrl));

	const hasAutoFocusedRef = useRef(false);
	const containerSizeRef = useRef<ContainerSizePosition>();

	const isPlaying = Boolean(api?.getPlaying?.());
	const isFullscreen = Boolean(fullScreenApi?.isFullscreen);
	const isPip = Boolean(api?.getPictureInPicture?.());
	const hasPipTriggeredByClick = Boolean(api?.getHasPipTriggeredByClick?.());

	// Checks if video container is in viewport when scrolling bottom
	const entryTop = useIntersection(videoContainerRef, {
		rootMargin: BOTTOM_ROOT_MARGIN,
	});
	const isVisibleFromScrollingTop = Boolean(entryTop?.isIntersecting);

	// Checks if video container is in viewport when scrolling top
	const entryBottom = useIntersection(videoContainerRef, {});
	const isVisibleFromScrollingBottom = Boolean(entryBottom?.isIntersecting);
	const onPlayCb = () => onPlay?.();

	const updateShowControls = useCallback(() => {
		if (controlsConfig?.alwaysShowConfig || isFullscreen) {
			return setShowControls(true);
		}
		const lastActivity = lastActivityRef?.current || 0;
		if (!isPlaying) {
			return setShowControls(true);
		}
		return setShowControls(Date.now() - lastActivity < OVERLAY_HIDE_DELAY);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		controlsConfig?.alwaysShowConfig,
		isFullscreen,
		lastActivityRef,
		api,
		lastMouseLeave,
	]);

	useEffect(updateShowControls, [
		updateShowControls,
		showControls,
		isPlaying,
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
		if (!isPlaying) {
			return api?.play?.();
		}
		return api?.pause?.();
	}, [isPip, isPlaying, api]);

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
	useEventListener(
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// On wheel event - updating that pip isn't triggered by a click on pip icon button
	// In this way we can evite overlapping of wheel vs click onPip
	useEffect(() => {
		const onWheel = () => {
			if (!isVisibleFromScrollingBottom || !isVisibleFromScrollingTop) {
				api?.setHasPipTriggeredByClick?.(false);
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
		if (!isPlaying || !isPlayerReady || !videoEl || !hasPlayEnabled) {
			return;
		}
		if (!isPip && !isVisibleFromScrollingTop) {
			api?.requestPip?.();
		}
		if (isPip && isVisibleFromScrollingBottom) {
			api?.exitPip?.();
		}
	}, [
		isPlayerReady,
		isPlaying,
		isVisibleFromScrollingTop,
		isVisibleFromScrollingBottom,
		reactPlayerRef,
		api,
		hasPlayEnabled,
		isPip,
		hasPipTriggeredByClick,
	]);

	// TODO: Open a issue for ReactPlayer on github
	// Listening for pip events and updating currentTime for ProgressBar
	// This is used for covering bugs with ReactPlayer
	useEventListener(
		'pipEnter',
		() => {
			const currentTime = api?.getCurrentRelativeTime?.();
			calculateContainerSizes();
			onPlayCb();
			setTimeout(() => {
				api?.setCurrentTime?.(currentTime);
			}, PROGRESS_INTERVAL - 1);
		},
		api as unknown as HTMLElement,
	);

	useEventListener(
		'pipExit',
		() => {
			const currentTime = api?.getCurrentRelativeTime?.();
			setTimeout(() => {
				api?.setCurrentTime?.(currentTime);
			}, PROGRESS_INTERVAL - 1);
		},
		api as unknown as HTMLElement,
	);

	// Updating video players bottom control's panel after OVERLAY_HIDE_DELAY time period
	useEffect(() => {
		if (!isPlaying) {
			return;
		}
		const timeoutId = setTimeout(updateShowControls, OVERLAY_HIDE_DELAY + 100);
		return () => clearTimeout(timeoutId);
	}, [updateShowControls, lastMouseMove, isPlaying]);

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

	// On multiple videos per page, play only one (last triggered)
	useEffect(() => {
		if (!hasPlayEnabled) {
			api?.pause?.();
		}
		if (api?.getPictureInPicture?.()) {
			api?.exitPip?.();
		}
	}, [api, hasPlayEnabled]);
	// Call onPlay when we have play event(setCurrentPlayingUrl to current one)
	useEventListener('play', onPlayCb, api as unknown as HTMLElement);

	return {
		isPlayerReady,
		onMouseLeave,
		onMouseEnter,
		containerSizeRef,
		showControls,
	};
};
