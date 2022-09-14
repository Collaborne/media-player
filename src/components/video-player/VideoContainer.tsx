import clsx from 'clsx';
import { FC } from 'react';
import intl from 'react-intl-universal';
import ReactPlayer from 'react-player';

import { useVideo } from '../../hooks/use-video';
import { PROGRESS_INTERVAL } from '../../utils/constants';
import { ControlProps, Controls } from '../controls/Controls';
import { DraggablePopover } from '../draggable-popover/DraggablePopover';
import { VideoPoster } from '../video-poster/VideoPoster';

import { useVideoContainerHook } from './useVideoContainerHook';
import { useVideoContainerStyles } from './useVideoContainerStyles';

/** VideoContainer Props */
export interface VideoContainerProps extends Omit<ControlProps, 'isVisible'> {
	/** The url of the video file to be played */
	videoUrl: string;
	/** Callback triggered by play event */
	onPlay?: VoidFunction;
	/** CSS class name applied to component  */
	className?: string;
}

/** A React Component that consumes VideoContext's API and adds UI for the player and video controls  */
export const VideoContainer: FC<VideoContainerProps> = ({
	className,
	videoUrl,
}) => {
	const { api, reactPlayerProps, videoContainerRef, fullScreenApi } =
		useVideo();
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
					<DraggablePopover
						disablePortal={Boolean(!api?.getPictureInPicture?.())}
					>
						<ReactPlayer
							url={videoUrl}
							progressInterval={PROGRESS_INTERVAL}
							width="100%"
							height={fullScreenApi?.isFullscreen ? '100%' : 'unset'}
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
					<Controls />
				</>
			)}
		</div>
	);
};

VideoContainer.displayName = 'VideoContainer';
