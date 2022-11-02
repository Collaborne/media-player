import { FC } from 'react';
import intl from 'react-intl-universal';
import ReactPlayer from 'react-player';

import { useMediaStore } from '../../context/MediaProvider';
import { useIsAudio } from '../../hooks';
import { PROGRESS_INTERVAL } from '../../utils/constants';
import { CorePlayerProps } from '../core-player/CorePlayer';
import { DraggablePopover } from '../draggable-popover/DraggablePopover';
import { MediaPoster } from '../media-poster/MediaPoster';

import { useMediaContainerStyles } from './useMediaContainerStyles';
import { useMouseActivityHook } from './useMouseActivityHook';
import { usePipHook } from './usePipHook';
import { useReactPlayerHook } from './useReactPlayerHook';

export type MediaContainerProps = Pick<
	CorePlayerProps,
	'audioPlaceholder' | 'children' | 'url' | 'className'
>;

/** A React Component that consumes MediaContext's API and adds UI for the player and media controls
 * @category React Component
 * @category UI Controls
 */
export const MediaContainer: FC<MediaContainerProps> = ({
	className,
	url,
	children,
	audioPlaceholder,
}) => {
	const isAudio = useIsAudio();
	const [mediaContainerRef, isPip, isFullscreen] = useMediaStore(state => [
		state.mediaContainerRef,
		state.isPip,
		state.isFullscreen,
	]);
	const {
		classes: { wrapper, pipText, reactPlayer },
		cx,
	} = useMediaContainerStyles({
		isAudio,
	});

	const { isPlayerReady, reactPlayerProps } = useReactPlayerHook({ url });
	const { onMouseEnter, onMouseLeave, onMouseMove } = useMouseActivityHook();
	const { containerSizeRef } = usePipHook({ isPlayerReady });

	// TODO: Add a UI/UX decision when player is not ready or missing a url
	if (!url || !isPlayerReady) {
		return null;
	}

	return (
		<div
			ref={mediaContainerRef}
			className={cx(wrapper, className)}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onMouseMove={onMouseMove}
		>
			{Boolean(url) && (
				<>
					<DraggablePopover
						disablePortal={!isPip}
						audioPlaceholder={audioPlaceholder}
					>
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
					{isPip && !isAudio && (
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
