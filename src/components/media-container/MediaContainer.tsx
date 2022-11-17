import { FC, memo } from 'react';
import intl from 'react-intl-universal';
import shallow from 'zustand/shallow';

import { useMediaStore } from '../../context/MediaProvider';
import { useIsAudio } from '../../hooks';
import { CorePlayerProps } from '../core-player/CorePlayer';
import { DraggablePopover } from '../draggable-popover/DraggablePopover';
import { MediaPoster } from '../media-poster/MediaPoster';
import { Player } from '../player/Player';

import { useIsPlayerReadyHook } from './useIsPlayerReadyHook';
import { useMediaContainerStyles } from './useMediaContainerStyles';
import { useMouseActivityHook } from './useMouseActivityHook';
import { usePipHook } from './usePipHook';

export interface MediaContainerProps
	extends Pick<
		CorePlayerProps,
		| 'audioPlaceholder'
		| 'children'
		| 'url'
		| 'className'
		| 'reactPlayerClassName'
	> {
	xAxisDistance: number;
	yAxisDistance: number;
}

/** A React Component that consumes MediaContext's API and adds UI for the player and media controls
 * @category React Component
 * @category UI Controls
 */
export const MediaContainer: FC<MediaContainerProps> = memo(
	({
		className,
		url,
		children,
		xAxisDistance,
		yAxisDistance,
		audioPlaceholder,
		reactPlayerClassName,
	}) => {
		const isAudio = useIsAudio();
		const [mediaContainerRef, isPip] = useMediaStore(
			state => [state.mediaContainerRef, state.isPip, state.isFullscreen],
			shallow,
		);
		const {
			classes: { wrapper, pipText, reactPlayer },
			cx,
		} = useMediaContainerStyles({
			isAudio,
		});

		const { isPlayerReady } = useIsPlayerReadyHook({ url });
		const { containerSizeRef } = usePipHook({ isPlayerReady });
		const { onMouseEnter, onMouseLeave, onMouseMove } = useMouseActivityHook();

		const reactClassNames = cx(reactPlayer, reactPlayerClassName);

		// TODO: Add a UI/UX decision when player is not ready
		if (!isPlayerReady || !url) {
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
				<DraggablePopover
					disablePortal={!isPip}
					audioPlaceholder={audioPlaceholder}
					xAxisDistance={xAxisDistance}
					yAxisDistance={yAxisDistance}
				>
					<Player url={url} className={reactClassNames} />
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
			</div>
		);
	},
);
