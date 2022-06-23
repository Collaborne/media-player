import { FC, memo } from 'react';
import clsx from 'clsx';
import ReactPlayer from 'react-player';
import intl from 'react-intl-universal';

import { useVideo } from '../../hooks/use-video';
import { PROGRESS_INTERVAL } from '../../utils/constants';
import { useVideoContainerStyles } from './useVideoContainerStyles';
import { Controls } from '../controls/Controls';
import { DraggablePopover } from '../draggable-popover/DraggablePopover';
import { VideoPoster } from '../video-poster/VideoPoster';
import { useVideoContainerHook } from './useVideoContainerHook';

interface VideoContainerProps {
	videoUrl: string;
	hasPlayEnabled: boolean;
	onPlay: VoidFunction;
	className?: string;
}

const VideoContainer: FC<VideoContainerProps> = memo(
	({ className, videoUrl, hasPlayEnabled, onPlay }) => {
		const { api, reactPlayerProps, videoContainerRef } = useVideo();
		const { wrapper, pipText } = useVideoContainerStyles().classes;

		const {
			containerSizeRef,
			isPlayerReady,
			onMouseLeave,
			onMouseMove,
			showControls,
		} = useVideoContainerHook({ hasPlayEnabled, onPlay, videoUrl });

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
