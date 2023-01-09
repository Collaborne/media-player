import Grid from '@mui/material/Grid';
import { FC, memo, useRef } from 'react';
import intl from 'react-intl-universal';
import shallow from 'zustand/shallow';

import { useMediaStore } from '../../context/MediaProvider';
import { useIsAudio } from '../../hooks';
import { MEDIA_CONTAINER } from '../../utils';
import { CorePlayerProps } from '../core-player/CorePlayer';
import { DraggablePopover } from '../draggable-popover/DraggablePopover';
import { MediaPoster } from '../media-poster/MediaPoster';
import { Player } from '../player/Player';

import { useIsPlayerReadyHook } from './useIsPlayerReadyHook';
import { useMediaContainerStyles } from './useMediaContainerStyles';
import { useMouseActivityHook } from './useMouseActivityHook';
import { usePipHook } from './usePipHook';
import { useReactPlayerProps } from './useReactPlayerProps';

export interface MediaContainerProps
	extends Pick<
		CorePlayerProps,
		| 'audioPlaceholder'
		| 'children'
		| 'url'
		| 'className'
		| 'reactPlayerClassName'
		| 'pipContainer'
		| 'pipPortalClassName'
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
		pipContainer,
		pipPortalClassName,
	}) => {
		const isAudio = useIsAudio();
		const pipAreaRef = useRef<HTMLElement>(null);
		const [mediaContainerRef, isPip, isFullscreen] = useMediaStore(
			state => [state.mediaContainerRef, state.isPip, state.isFullscreen],
			shallow,
		);
		const {
			classes: { wrapper, pipText, reactPlayer, pipArea },
			cx,
		} = useMediaContainerStyles({
			isAudio,
		});

		const { isPlayerReady } = useIsPlayerReadyHook({ url });
		usePipHook({ isPlayerReady });
		const { onMouseEnter, onMouseLeave, onMouseMove } = useMouseActivityHook();
		const { reactPlayerProps } = useReactPlayerProps();
		const reactClassNames = cx(reactPlayer, reactPlayerClassName);

		// TODO: Add a UI/UX decision when player is not ready
		if (!isPlayerReady || !url) {
			return null;
		}

		console.log(pipContainer);

		return (
			<>
				{!pipContainer && (
					<Grid ref={pipAreaRef} className={cx(pipArea, pipPortalClassName)} />
				)}
				<div
					ref={mediaContainerRef}
					className={cx(wrapper, className)}
					onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}
					onMouseMove={onMouseMove}
					data-testid={MEDIA_CONTAINER}
				>
					<DraggablePopover
						audioPlaceholder={audioPlaceholder}
						xAxisDistance={xAxisDistance}
						yAxisDistance={yAxisDistance}
						pipContainer={pipContainer || pipAreaRef}
						pipPortalClassName={pipPortalClassName}
					>
						<Player
							url={url}
							className={reactClassNames}
							isFullscreen={isFullscreen}
							reactPlayerProps={reactPlayerProps}
						/>
					</DraggablePopover>
					{isPip && !isAudio && (
						<MediaPoster width="100%" height="100%">
							<div className={pipText}>{intl.get('media.playing_pip')}</div>
						</MediaPoster>
					)}
					{children}
				</div>
			</>
		);
	},
);
