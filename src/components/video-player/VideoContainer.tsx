import clsx from 'clsx';
import { FC, memo } from 'react';
import intl from 'react-intl-universal';
import ReactPlayer from 'react-player';

import { useVideo } from '../../hooks/use-video';
import { PROGRESS_INTERVAL } from '../../utils/constants';
import { ControlProps, Controls } from '../controls/Controls';
import { DraggablePopover } from '../draggable-popover/DraggablePopover';
import { VideoPoster } from '../video-poster/VideoPoster';

import { useVideoContainerHook } from './useVideoContainerHook';
import { useVideoContainerStyles } from './useVideoContainerStyles';

interface VideoContainerProps extends Omit<ControlProps, 'isVisible'> {
	videoUrl: string;
	hasPlayEnabled: boolean;
	onPlay: VoidFunction;
	className?: string;
}

const VideoContainer: FC<VideoContainerProps> = memo(
	({
		className,
		videoUrl,
		hasPlayEnabled,
		onPlay,
		onDelete,
		onDownload,
		removeAsCover,
		setAsCover,
		actionPanelClassName,
		hasImageCover,
		isCover,
	}) => {
		const { api, reactPlayerProps, videoContainerRef, fullScreenApi } =
			useVideo();
		const { wrapper, pipText, reactPlayer } = useVideoContainerStyles().classes;

		const {
			containerSizeRef,
			isPlayerReady,
			onMouseLeave,
			onMouseEnter,
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
						<Controls
							isVisible={showControls}
							onDelete={onDelete}
							onDownload={onDownload}
							removeAsCover={removeAsCover}
							setAsCover={setAsCover}
							actionPanelClassName={actionPanelClassName}
							hasImageCover={hasImageCover}
							isCover={isCover}
						/>
					</>
				)}
			</div>
		);
	},
);

VideoContainer.displayName = 'VideoContainer';

export default VideoContainer;
