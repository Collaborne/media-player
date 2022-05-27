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

import useEventListener from '@use-it/event-listener';
import { useOnUnmount } from '../../hooks';
import { useVideo } from '../../hooks/use-video';
import { OVERLAY_HIDE_DELAY } from '../../utils/constants';
import { useVideoContainerStyles } from './useVideoContainerStyles';
import { Controls } from '../controls/Controls';

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
		} = useVideo();
		const [showControls, setShowControls] = useState(true);
		const [lastMouseLeave, setLastMouseLeave] = useState<number>(0);
		const [lastMouseMove, setLastMouseMove] = useState<number>(0);
		const [isPlayerReady, setIsPlayerReady] = useState(Boolean(videoUrl));

		const videoContainerRef = useRef<HTMLDivElement>(null);
		const hasAutoFocusedRef = useRef(false);

		const isPlaying = useMemo(
			() => Boolean(api?.getPlaying?.()),
			[api?.getPlaying],
		);

		const updateShowControls = useCallback(() => {
			if (controlsConfig?.alwaysShowConfig) {
				return setShowControls(true);
			}
			const lastActivity = lastActivityRef?.current || 0;
			if (api?.getPaused?.()) {
				return setShowControls(true);
			}
			return setShowControls(Date.now() - lastActivity < OVERLAY_HIDE_DELAY);
		}, [controlsConfig?.alwaysShowConfig, lastMouseLeave, api?.getPaused]);

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
					videoRef.current.getInternalPlayer().parentElement?.focus();
					hasAutoFocusedRef.current = true;
				}
			}, 100);
			return () => clearTimeout(timeoutId);
		}, [videoUrl, videoRef]);

		useOnUnmount(() => {
			// Bug: video is stuck browser memory, so even after dismount the OS play/pause controls work
			// Clear src attribute so it's removed.
			const videoEl = videoContainerRef.current?.querySelector('video');
			if (videoEl) {
				videoEl.setAttribute('src', '');
			}
		});

		const { wrapper } = useVideoContainerStyles();

		const togglePlay = useCallback(() => {
			if (api?.getPaused?.()) {
				return api?.play?.();
			}
			return api?.pause?.();
		}, [api?.play, api?.pause]);

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
			videoContainerRef.current,
			{ capture: true },
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
					<ReactPlayer
						url={videoUrl}
						progressInterval={50}
						width="100%"
						height="100%"
						className="react-player"
						css={['position: relative;']}
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
				)}
				<Controls isVisible={showControls} />
			</div>
		);
	},
);

export default VideoContainer;
