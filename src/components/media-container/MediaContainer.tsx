import clsx from 'clsx';
import { FC, ReactNode } from 'react';
import intl from 'react-intl-universal';
import ReactPlayer from 'react-player';

import { useMediaStore } from '../../context/MediaProvider';
import { PROGRESS_INTERVAL } from '../../utils/constants';
import { DraggablePopover } from '../draggable-popover/DraggablePopover';
import { MediaPoster } from '../media-poster/MediaPoster';

import { useMediaContainerHook } from './useMediaContainerHook';
import { useMediaContainerStyles } from './useMediaContainerStyles';
import { usePipHook } from './usePipHook';

export interface MediaContainerProps {
	/** The url of the media file to be played */
	url: string;
	/** CSS class name applied to component  */
	className?: string;
	children?: ReactNode;
}

/** A React Component that consumes MediaContext's API and adds UI for the player and media controls  */
export const MediaContainer: FC<MediaContainerProps> = ({
	className,
	url,
	children,
}) => {
	const [mediaContainerRef, isPip, isFullscreen] = useMediaStore(state => [
		state.mediaContainerRef,
		state.pip,
		state.isFullscreen,
	]);
	const { wrapper, pipText, reactPlayer } = useMediaContainerStyles().classes;

	const { isPlayerReady, onMouseLeave, onMouseEnter, reactPlayerProps } =
		useMediaContainerHook({ url });
	const { containerSizeRef } = usePipHook({ isPlayerReady });

	// TODO: Add a UI/UX decision when player is not ready or missing a url
	if (!url || !isPlayerReady) {
		return null;
	}

	return (
		<div
			ref={mediaContainerRef}
			className={clsx(wrapper, className)}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			{Boolean(url) && (
				<>
					<DraggablePopover disablePortal={!isPip}>
						<ReactPlayer
							url={url}
							progressInterval={PROGRESS_INTERVAL}
							width="100%"
							height={isFullscreen ? '100%' : 'unset'}
							className={reactPlayer}
							data-testid="media-player"
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
						<MediaPoster
							width={containerSizeRef?.current?.width || 0}
							height={containerSizeRef?.current?.height || 0}
						>
							<div className={pipText}>{intl.get('media.playing_pip')}</div>
						</MediaPoster>
					)}
					{children}
				</>
			)}
		</div>
	);
};

MediaContainer.displayName = 'MediaContainer';
