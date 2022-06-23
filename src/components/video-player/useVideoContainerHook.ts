import useEventListener from '@use-it/event-listener';
import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
	useLayoutEffect,
} from 'react';
import { useOnUnmount, useInViewport, useVideo } from '../../hooks';
import { OVERLAY_HIDE_DELAY, PROGRESS_INTERVAL } from '../../utils/constants';
import { getElementOffset } from '../../utils/html-elements';
import { ContainerSizePosition } from '../draggable-popover/DraggablePopover';

interface UseVideoContainerHookProps {
	videoUrl: string;
	hasPlayEnabled: boolean;
	onPlay: VoidFunction;
}
interface UseVideoContainerHook {
	isPlayerReady: boolean;
	onMouseLeave: () => void;
	onMouseMove: () => void;
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
		videoRef,
		api,
		lastActivityRef,
		markActivity,
		controlsConfig,
		videoContainerRef,
	} = useVideo();
	const [showControls, setShowControls] = useState(true);
	const [lastMouseLeave, setLastMouseLeave] = useState<number>(0);
	const [lastMouseMove, setLastMouseMove] = useState<number>(0);
	const [isPlayerReady, setIsPlayerReady] = useState(Boolean(videoUrl));

	const hasAutoFocusedRef = useRef(false);
	const containerSizeRef = useRef<ContainerSizePosition>();

	// Checks if video container is in viewport when scrolling bottom
	const entryTop = useInViewport(videoContainerRef, {
		rootMargin: BOTTOM_ROOT_MARGIN,
	});
	const isVisibleFromScrollingTop = useMemo(
		() => Boolean(entryTop?.isIntersecting),
		[entryTop?.isIntersecting],
	);

	// Checks if video container is in viewport when scrolling top
	const entryBottom = useInViewport(videoContainerRef, {});
	const isVisibleFromScrollingBottom = useMemo(
		() => Boolean(entryBottom?.isIntersecting),
		[entryBottom?.isIntersecting],
	);

	const isPlaying = useMemo(
		() => Boolean(api?.getPlaying?.()),
		[api?.getPlaying],
	);

	const updateShowControls = useCallback(() => {
		if (controlsConfig?.alwaysShowConfig || api?.getPictureInPicture?.()) {
			return setShowControls(true);
		}
		const lastActivity = lastActivityRef?.current || 0;
		if (api?.getPaused?.()) {
			return setShowControls(true);
		}
		return setShowControls(Date.now() - lastActivity < OVERLAY_HIDE_DELAY);
	}, [
		controlsConfig?.alwaysShowConfig,
		lastMouseLeave,
		api?.getPaused,
		api?.getPictureInPicture,
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
		const timeoutId = setTimeout(() => {
			if (videoRef?.current?.getInternalPlayer()) {
				videoRef.current?.getInternalPlayer()?.parentElement?.focus();
				hasAutoFocusedRef.current = true;
			}
		}, 100);
		return () => clearTimeout(timeoutId);
	}, [videoUrl, videoRef]);

	useOnUnmount(() => {
		// Bug: video is stuck browser memory, so even after dismount the OS play/pause controls work
		// Clear src attribute so it's removed.
		const videoEl = videoContainerRef?.current?.querySelector('video');
		if (videoEl) {
			videoEl.setAttribute('src', '');
		}
	});

	const togglePlay = useCallback(() => {
		// PIP mode disables clicking on screen to toggle playing
		if (api?.getPictureInPicture?.()) {
			return;
		}
		if (api?.getPaused?.()) {
			return api?.play?.();
		}
		return api?.pause?.();
	}, [api?.play, api?.pause, api?.getPictureInPicture]);

	const onMouseMove = useCallback(() => {
		markActivity?.();
		setLastMouseMove(Date.now());
	}, [markActivity]);

	const onMouseLeave = useCallback(() => setLastMouseLeave(Date.now()), []);

	// Add stop/pause events on clicking to video-player
	useEventListener(
		'click',
		togglePlay,
		videoRef?.current?.getInternalPlayer() || undefined,
	);

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
	}, []);

	// If the player is mounted, ready and playing then display/hide pip player
	useEffect(() => {
		const videoEl = videoRef?.current?.getInternalPlayer();
		if (!isPlaying || !isPlayerReady || !videoEl || !hasPlayEnabled) {
			return;
		}
		if (!api?.getPictureInPicture?.() && !isVisibleFromScrollingTop) {
			api?.requestPip?.();
		}
		if (api?.getPictureInPicture?.() && isVisibleFromScrollingBottom) {
			api?.exitPip?.();
		}
	}, [
		isPlayerReady,
		isPlaying,
		isVisibleFromScrollingTop,
		isVisibleFromScrollingBottom,
		videoRef,
		api,
		hasPlayEnabled,
	]);

	// TODO: Open a issue for ReactPlayer on github
	// Listening for pip events and updating currentTime for ProgressBar
	// This is used for covering bugs with ReactPlayer
	useEventListener(
		'pipEnter',
		() => {
			const currentTime = api?.getCurrentRelativeTime?.();
			calculateContainerSizes();
			onPlay();
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
	useEventListener('play', onPlay, api as unknown as HTMLElement);

	return {
		isPlayerReady,
		onMouseLeave,
		onMouseMove,
		containerSizeRef,
		showControls,
	};
};