import {
	FC,
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import clsx from 'clsx';
import ReactPlayer, { ReactPlayerProps } from 'react-player';

import useEventListener from '@use-it/event-listener';
import { useOnUnmount } from '../../hooks';
import { useVideo } from '../../hooks/use-video';
import { OVERLAY_HIDE_DELAY } from '../../utils/constants';
import { useVideoContainerStyles } from './useVideoContainer';

interface VideoContainerProps {
	className?: string;
	videoUrl?: string;
}

const dateNow = Date.now();

const VideoContainer: FC<VideoContainerProps> = ({ className, videoUrl }) => {
	const {
		videoRef,
		api,
		reactPlayerProps,
		lastActivityRef,
		markActivity,
		controlsConfig,
	} = useVideo();
	const [showOverlay, setShowOverlay] = useState(true);
	const [lastMouseLeave, setLastMouseLeave] = useState<number>(0);
	const [lastMouseMove, setLastMouseMove] = useState<number>(0);
	const videoContainerRef = useRef<HTMLDivElement>(null);
	const playing = Boolean(api?.getPlaying?.());

	const updateShowOverlay = useCallback(() => {
		if (controlsConfig?.alwaysShowConfig) {
			return setShowOverlay(true);
		}
		const lastActivity = lastActivityRef?.current || 0;
		if (api?.getPaused?.()) {
			setShowOverlay(true);
		} else if (lastMouseLeave && lastMouseLeave > lastActivity) {
			setShowOverlay(false);
		} else {
			setShowOverlay(Date.now() - lastActivity < OVERLAY_HIDE_DELAY);
		}
	}, [api, lastMouseLeave, lastMouseMove, lastActivityRef, controlsConfig]);

	useEffect(updateShowOverlay, [
		updateShowOverlay,
		showOverlay,
		playing,
		lastMouseMove,
	]);

	useLayoutEffect(() => {
		if (!videoUrl) return;

		const timeoutId = setTimeout(() => {
			if (videoRef?.current?.base?.parentNode) {
				videoRef.current.base.parentNode.focus();
			}
		}, 100);
		return () => clearTimeout(timeoutId);
	}, [videoUrl, videoRef]);

	useEffect(() => {
		if (!playing) return;
		const timeoutId = setTimeout(updateShowOverlay, OVERLAY_HIDE_DELAY + 100);
		return () => clearTimeout(timeoutId);
	}, [updateShowOverlay, lastMouseMove, playing]);

	// Show video controls when browser tab receives focus
	useEventListener(
		'visibilitychange',
		() => {
			markActivity?.();
			updateShowOverlay();
		},
		document,
	);

	// Show video controls when controls are focused
	useEventListener(
		'focus',
		() => {
			markActivity?.();
			updateShowOverlay();
		},
		videoContainerRef.current,
		{ capture: true },
	);

	useOnUnmount(() => {
		// Bug: video is stuck browser memory, so even after dismount the OS play/pause controls work
		// Clear src attribute so it's removed.
		const videoEl = videoContainerRef.current?.querySelector('video');
		if (videoEl) videoEl.setAttribute('src', '');
	});

	const { wrapper } = useVideoContainerStyles();
	return (
		<div
			ref={videoContainerRef}
			className={clsx(wrapper, className)}
			onMouseEnter={() => {
				markActivity?.();
				setLastMouseMove(dateNow);
			}}
			onMouseLeave={() => setLastMouseLeave(dateNow)}
		>
			{Boolean(videoUrl) && (
				<>
					<ReactPlayer
						url={videoUrl}
						progressInterval={50}
						className="react-player"
						css={['position: relative;']}
						{...reactPlayerProps}
					/>
				</>
			)}
		</div>
	);
};

export default VideoContainer;
