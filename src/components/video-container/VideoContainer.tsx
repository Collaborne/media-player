import clsx from 'clsx';
import { FC, ReactNode } from 'react';
import intl from 'react-intl-universal';
import ReactPlayer from 'react-player';

import { useVideoStore } from '../../context/VideoProvider';
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
	const [videoContainerRef, isPip, isFullscreen] = useVideoStore(state => [
		state.videoContainerRef,
		state.pip,
		state.isFullscreen,
	]);
	const { wrapper, pipText, reactPlayer } = useVideoContainerStyles().classes;

	const {
		containerSizeRef,
		isPlayerReady,
		onMouseLeave,
		onMouseEnter,
		reactPlayerProps,
	} = useVideoContainerHook({ videoUrl });

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
					<DraggablePopover disablePortal={!isPip}>
						<ReactPlayer
							url={videoUrl}
							progressInterval={PROGRESS_INTERVAL}
							width="100%"
							height={isFullscreen ? '100%' : 'unset'}
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
					{isPip && (
						<VideoPoster
							width={containerSizeRef?.current?.width || 0}
							height={containerSizeRef?.current?.height || 0}
						>
							<div className={pipText}>{intl.get('video.playing_pip')}</div>
						</VideoPoster>
					)}
					{children}
				</>
			)}
		</div>
	);
};

VideoContainer.displayName = 'VideoContainer';
