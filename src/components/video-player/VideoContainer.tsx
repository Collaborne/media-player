import clsx from 'clsx';
import { FC, memo, useMemo } from 'react';
import intl from 'react-intl-universal';
import ReactPlayer from 'react-player';

import { useVideo } from '../../hooks/use-video';
import { PROGRESS_INTERVAL } from '../../utils/constants';
import { Controls } from '../controls/Controls';
import { DraggablePopover } from '../draggable-popover/DraggablePopover';
import { VideoPoster } from '../video-poster/VideoPoster';

import { useVideoContainerHook } from './useVideoContainerHook';
import { useVideoContainerStyles } from './useVideoContainerStyles';

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
			onMouseEnter,
			showControls,
		} = useVideoContainerHook({ hasPlayEnabled, onPlay, videoUrl });

		const playerInlineStyle = useMemo<
			Record<'width' | 'height', string>
		>(() => {
			if (api?.getFullscreen?.()) {
				return { width: '100%', height: '100%' };
			}
			return { width: 'fit-content', height: 'fit-content' };
		}, [api?.getFullscreen]);

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
								{...playerInlineStyle}
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

VideoContainer.displayName = 'VideoContainer';

export default VideoContainer;
