import clsx from 'clsx';
import { FC, ReactNode, useRef } from 'react';
import intl from 'react-intl-universal';
import ReactPlayer from 'react-player';
import { useVideoStore } from '../../context/VideoProvider';

import { useVideo } from '../../hooks/use-video';
import { PROGRESS_INTERVAL } from '../../utils/constants';
import { DraggablePopover } from '../draggable-popover/DraggablePopover';
import { VideoPoster } from '../video-poster/VideoPoster';

import { useVideoContainerHook } from './useVideoContainerHook';
import { useVideoContainerStyles } from './useVideoContainerStyles';

/** VideoContainer Props */
export interface VideoContainerProps {
	/** The url of the video file to be played */
	videoUrl: string;
	/** CSS class name applied to component  */
	className?: string;
	children?: ReactNode;
}

/** A React Component that consumes VideoContext's API and adds UI for the player and video controls  */
export const VideoContainer: FC<VideoContainerProps> = ({
	className,
	videoUrl,
	children,
}) => {
	const state = useVideoStore();
	const videoContainerRef = useVideoStore(state => state.videoContainerRef);
	const setReady = useVideoStore(state => state._setReady);
	const emitter = useVideoStore(state => state.emitter);
	const readyFiredRef = useRef(false);

	// const { api, reactPlayerProps, videoContainerRef, fullScreenApi } =
	// 	useVideo();
	const { wrapper, pipText, reactPlayer } = useVideoContainerStyles().classes;

	const { containerSizeRef, isPlayerReady, onMouseLeave, onMouseEnter } =
		useVideoContainerHook({ videoUrl });

	// TODO: Add a UI/UX decision when player is not ready or missing a videoUrl
	if (!videoUrl || !isPlayerReady) {
		return null;
	}

	return (
		<div
			ref={videoContainerRef}
			className={clsx(wrapper, className)}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			{Boolean(videoUrl) && (
				<>
					{/* <DraggablePopover disablePortal={isPip}> */}
					<ReactPlayer
						url={videoUrl}
						progressInterval={PROGRESS_INTERVAL}
						width="100%"
						// height={fullScreenApi?.isFullscreen ? '100%' : 'unset'}
						className={reactPlayer}
						data-testid="video-player"
						config={{
							file: {
								attributes: {
									crossOrigin: 'anonymous',
									preload: 'false',
								},
							},
						}}
						onReady={() => {
							emitter?.emit('ready');

							if (!readyFiredRef?.current) {
								emitter?.emit('firstReady');
								readyFiredRef.current = true;
							}
							setReady();
						}}
						playsinline
						playbackRate={state.playbackRate}
						playing={state.playing}
						muted={state.muted}
						ref={state.reactPlayerRef}
						onEnded={() => state.emitter.emit('ended')}
						onDuration={duration => state.setDuration(duration)}
						onProgress={({ playedSeconds }) =>
							state._handleProgress?.(playedSeconds)
						}
					/>
					{/* </DraggablePopover>
					{Boolean(api?.getPictureInPicture?.()) && (
						<VideoPoster
							width={containerSizeRef?.current?.width || 0}
							height={containerSizeRef?.current?.height || 0}
						>
							<div className={pipText}>{intl.get('video.playing_pip')}</div>
						</VideoPoster>
					)} */}
					{children}
				</>
			)}
		</div>
	);
};

VideoContainer.displayName = 'VideoContainer';
