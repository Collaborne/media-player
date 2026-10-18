import Grid from '@mui/material/Grid';
import { FC, memo, useEffect, useRef } from 'react';
import intl from 'react-intl-universal';
import screenfull from 'screenfull';
import { shallow } from 'zustand/shallow';

import { useMediaStore } from '../../context/MediaProvider.js';
import { useIsAudio } from '../../hooks/index.js';
import { MEDIA_CONTAINER } from '../../utils/index.js';
import { CorePlayerProps } from '../core-player/CorePlayer.js';
import {
	DraggablePopover,
	DraggablePopoverProps,
} from '../draggable-popover/DraggablePopover.js';
import { MediaPoster } from '../media-poster/MediaPoster.js';
import { Player } from '../player/Player.js';

import { useIsPlayerReadyHook } from './useIsPlayerReadyHook.js';
import {
	useFilePlayerStyles,
	useMediaContainerStyles,
} from './useMediaContainerStyles.js';
import { useMouseActivityHook } from './useMouseActivityHook.js';
import { UsePipHook } from './UsePipHook.js';
import { useReactPlayerProps } from './useReactPlayerProps.js';

export interface MediaContainerProps
	extends
		Pick<
			CorePlayerProps,
			'children' | 'url' | 'className' | 'reactPlayerClassName' | 'pipContainer'
		>,
		Pick<
			DraggablePopoverProps,
			| 'audioPlaceholder'
			| 'xAxisDistance'
			| 'yAxisDistance'
			| 'pipPortalClassName'
		> {
	url: string;
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
		// ref for the PIP area(pip will appear there)
		const pipAreaRef = useRef<HTMLDivElement | null>(null);
		const [
			mediaContainerRef,
			isPip,
			isFullscreen,
			isPipEnabled,
			setIsFullscreen,
		] = useMediaStore(
			state => [
				state.mediaContainerRef,
				state.isPip,
				state.isFullscreen,
				state.isPipEnabled,
				state.setIsFullscreen,
			],
			shallow,
		);
		const {
			classes: { wrapper, pipText, reactPlayer, pipArea },
			cx,
		} = useMediaContainerStyles({
			isAudio,
		});
		const { wrapper: playerWrapper } = useFilePlayerStyles({ isAudio }).classes;

		const { isPlayerReady } = useIsPlayerReadyHook({ url });
		const { onMouseEnter, onMouseLeave, onMouseMove } = useMouseActivityHook();
		const { reactPlayerProps } = useReactPlayerProps();
		const reactClassNames = cx(
			reactPlayer,
			playerWrapper,
			reactPlayerClassName,
		);

		const playerProps = {
			url,
			className: reactClassNames,
			isFullscreen,
			reactPlayerProps,
		};

		useEffect(() => {
			if (screenfull.isEnabled) {
				screenfull.on('change', () => {
					setIsFullscreen(screenfull.isFullscreen);
				});
			}
		}, [mediaContainerRef, setIsFullscreen]);

		const renderPlayer = () =>
			isPipEnabled ? (
				<>
					<DraggablePopover
						audioPlaceholder={audioPlaceholder}
						xAxisDistance={xAxisDistance}
						yAxisDistance={yAxisDistance}
						pipDraggableAreaRef={pipContainer || pipAreaRef}
						pipPortalClassName={pipPortalClassName}
					>
						<Player {...playerProps} />
					</DraggablePopover>
					{isPip && !isAudio && (
						<MediaPoster width="100%" height="100%">
							<div className={pipText}>{intl.get('media.playing_pip')}</div>
						</MediaPoster>
					)}
				</>
			) : (
				<Player {...playerProps} />
			);

		// TODO: Add a UI/UX decision when player is not ready
		if (!isPlayerReady || !url) {
			return null;
		}

		return (
			<>
				{isPipEnabled && <UsePipHook isPlayerReady={isPlayerReady} />}
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
					{renderPlayer()}
					{children}
				</div>
			</>
		);
	},
);
