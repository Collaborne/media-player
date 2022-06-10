import {
	FC,
	memo,
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import clsx from 'clsx';
import ReactPlayer from 'react-player';
import intl from 'react-intl-universal';

import useEventListener from '@use-it/event-listener';
import { useOnUnmount } from '../../hooks';
import { useVideo } from '../../hooks/use-video';
import { OVERLAY_HIDE_DELAY, PROGRESS_INTERVAL } from '../../utils/constants';
import { useVideoContainerStyles } from './useVideoContainerStyles';
import { Controls } from '../controls/Controls';
import {
	ContainerSizePosition,
	DraggablePopover,
} from '../draggable-popover/DraggablePopover';
import { VideoPoster } from '../video-poster/VideoPoster';
import { getElementOffset } from '../../utils/html-elements';

interface VideoContainerProps {
	className?: string;
	videoUrl?: string;
}

const VideoContainer: FC<VideoContainerProps> = memo(
	({ className, videoUrl }) => {
		const {
			videoRef,
			api,
			reactPlayerProps,
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

		const { wrapper, pipText } = useVideoContainerStyles();

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

		// TODO: Open a issue for ReactPlayer on github
		// Listening for pip events and updating currentTime for ProgressBar
		// This is used for covering bugs with ReactPlayer
		useEventListener(
			'pipEnter',
			() => {
				const currentTime = api?.getCurrentRelativeTime?.();
				calculateContainerSizes();
				setTimeout(() => {
					api?.setCurrentTime?.(currentTime);
				}, PROGRESS_INTERVAL - 1);
			},
			api as any,
		);

		useEventListener(
			'pipExit',
			() => {
				const currentTime = api?.getCurrentRelativeTime?.();
				setTimeout(() => {
					api?.setCurrentTime?.(currentTime);
				}, PROGRESS_INTERVAL - 1);
			},
			api as any,
		);

		// Updating video players bottom control's panel after OVERLAY_HIDE_DELAY time period
		useEffect(() => {
			if (!isPlaying) {
				return;
			}
			const timeoutId = setTimeout(
				updateShowControls,
				OVERLAY_HIDE_DELAY + 100,
			);
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

		// TODO: Add a UI/UX decision when player is not ready or missing a videoUrl
		if (!videoUrl || !isPlayerReady) {
			return null;
		}

		return (
			<div
				ref={videoContainerRef}
				className={clsx(wrapper, className)}
				onMouseMove={onMouseMove}
				onMouseLeave={onMouseLeave}
			>
				{Boolean(videoUrl) && (
					<>
						<DraggablePopover
							disablePortal={Boolean(!api?.getPictureInPicture?.())}
						>
							<ReactPlayer
								url={videoUrl}
								progressInterval={PROGRESS_INTERVAL}
								width="100%"
								height="100%"
								className="react-player"
								css={['position: relative']}
								config={{
									file: {
										attributes: {
											crossOrigin: 'anonymous',
											preload: 'false',
										},
									},
								}}
								{...reactPlayerProps}
							/>
						</DraggablePopover>
						{Boolean(api?.getPictureInPicture?.()) && (
							<VideoPoster
								width={containerSizeRef?.current?.width || 0}
								height={containerSizeRef?.current?.height || 0}
							>
								<div className={pipText}>{intl.get('video.playing_pip')}</div>
							</VideoPoster>
						)}
						<Controls isVisible={showControls} />
					</>
				)}
			</div>
		);
	},
);

export default VideoContainer;
