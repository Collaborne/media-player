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
		const videoContainerRef = useRef<HTMLDivElement>(null);
		const playing = useMemo(() => Boolean(api?.getPlaying?.()), [api]);

		const updateShowOverlay = useCallback(() => {
			if (controlsConfig?.alwaysShowConfig) {
				return setShowControls(true);
			}
			const lastActivity = lastActivityRef?.current || 0;
			if (api?.getPaused?.()) {
				return setShowControls(true);
			}
			if (lastMouseLeave > lastActivity) {
				return setShowControls(false);
			}
			return setShowControls(Date.now() - lastActivity < OVERLAY_HIDE_DELAY);
		}, [api, lastMouseLeave, lastActivityRef, controlsConfig]);

		useEffect(updateShowOverlay, [
			updateShowOverlay,
			showControls,
			playing,
			lastMouseMove,
		]);

		useLayoutEffect(() => {
			if (!videoUrl) return;

			const timeoutId = setTimeout(() => {
				if (videoRef?.current?.getInternalPlayer()) {
					videoRef.current.getInternalPlayer().focus();
				}
			}, 100);
			return () => clearTimeout(timeoutId);
		}, [videoUrl, videoRef]);

		useOnUnmount(() => {
			// Bug: video is stuck browser memory, so even after dismount the OS play/pause controls work
			// Clear src attribute so it's removed.
			const videoEl = videoContainerRef.current?.querySelector('video');
			if (videoEl) videoEl.setAttribute('src', '');
		});

		const { wrapper } = useVideoContainerStyles();

		const togglePlay = useCallback(() => {
			if (api?.getPaused?.()) {
				return api?.play?.();
			}
			return api?.pause?.();
		}, [api]);

		const onMouseEnterHandler = useCallback(() => {
			markActivity?.();
			setLastMouseMove(Date.now());
		}, [markActivity]);

		const onMouseLeaveHandler = useCallback(
			() => setLastMouseLeave(Date.now()),
			[],
		);

		useEventListener(
			'click',
			togglePlay,
			videoRef?.current?.getInternalPlayer() || undefined,
		);

		return (
			<div
				ref={videoContainerRef}
				className={clsx(wrapper, className)}
				onMouseEnter={onMouseEnterHandler}
				onMouseLeave={onMouseLeaveHandler}
			>
				{Boolean(videoUrl) && (
					<ReactPlayer
						url={videoUrl}
						progressInterval={50}
						width="100%"
						height="100%"
						className="react-player"
						css={['position: relative;']}
						{...reactPlayerProps}
					/>
				)}
				<Controls isVisible={showControls} />
			</div>
		);
	},
);

export default VideoContainer;
