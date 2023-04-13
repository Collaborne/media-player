import Paper from '@mui/material/Paper';
import Portal from '@mui/material/Portal';
import { isElement } from 'lodash';
import { FC, memo, ReactNode, RefObject, useRef } from 'react';
import { Rnd, Props as RndProps } from 'react-rnd';

import { useMediaStore } from '../../context';
import { useIsAudio } from '../../hooks';
import { usePipControlsContext } from '../../hooks/use-pip-controls-context';
import { DRAGGABLE_POPOVER } from '../../utils';
import { MediaPoster } from '../media-poster/MediaPoster';

import { useDraggablePopoverHook } from './useDraggablePopoverHook';
import { useDraggablePopoverStyles } from './useDraggablePopoverStyles';
import { usePipMouseActivityHook } from './usePipMouseActivity';

export type ContainerSizePosition = {
	width: number;
	height: number;
	left: number;
	top: number;
};
/** Default positioning on X and Y axis of PIP player */
const DEFAULT_AXIS_DISTANCE = 16;
export interface DraggablePopoverProps {
	rndProps?: RndProps;
	className?: string;
	/** URL to image that is displayed in PIP player for audio files */
	audioPlaceholder?: string;
	'data-testid'?: string;
	// Ref to a div, that will be used as a container for dragging PIP player
	pipDraggableAreaRef: RefObject<HTMLDivElement>;
	/** ClassName for pip container where PIP player layout belongs too */
	pipPortalClassName?: string;
	/** Distance from window border right, on X axis in `pixels`, for PIP player position initialization */
	xAxisDistance?: number;
	/** Distance from window border bottom, on Y axis in `pixels`, for PIP player position initialization */
	yAxisDistance?: number;
	children: ReactNode;
}

/**
 * Popover/Portal component that is responsible for PIP logic and UI
 * @category React Component
 * @category UI Controls
 */
export const DraggablePopover: FC<DraggablePopoverProps> = memo(
	({
		className,
		children,
		rndProps,
		audioPlaceholder,
		xAxisDistance = DEFAULT_AXIS_DISTANCE,
		yAxisDistance = DEFAULT_AXIS_DISTANCE,
		'data-testid': dataTestId = DRAGGABLE_POPOVER,
		pipPortalClassName,
		pipDraggableAreaRef,
	}) => {
		const { PIPControls } = usePipControlsContext();

		const pipPortalRef = useRef<HTMLDivElement>(null);
		const isAudio = useIsAudio();
		const isPip = useMediaStore(state => state.isPip);

		const {
			dimensions,
			enableResizing,
			handleDragStop,
			handleResizeStop,
			portalWrapperRef,
		} = useDraggablePopoverHook({
			isPip,
			xAxisDistance,
			yAxisDistance,
			pipPortalRef,
			pipDraggableAreaRef,
		});
		const { onMouseEnter, onMouseLeave, onMouseMove } =
			usePipMouseActivityHook();

		const {
			classes: { paper, portalWrapper, resizeSquares },
			cx,
		} = useDraggablePopoverStyles({
			isAudio,
			isPip,
		});

		return (
			<Portal disablePortal={!isPip} container={pipDraggableAreaRef?.current}>
				<div
					className={cx(portalWrapper, pipPortalClassName)}
					data-testid={dataTestId}
					ref={el => {
						isElement(el) && el !== null && portalWrapperRef(el);
					}}
				>
					<Rnd
						bounds="parent"
						disableDragging={!isPip}
						enableResizing={enableResizing}
						lockAspectRatio
						allowAnyClick
						resizeHandleClasses={{
							topLeft: resizeSquares,
							topRight: resizeSquares,
							bottomLeft: resizeSquares,
							bottomRight: resizeSquares,
						}}
						{...rndProps}
						minWidth={241}
						minHeight={146}
						onDragStop={handleDragStop}
						onResizeStop={handleResizeStop}
						size={{ height: dimensions.height, width: dimensions.width }}
						position={{ x: dimensions.x, y: dimensions.y }}
					>
						<Paper
							elevation={0}
							className={cx(paper, className)}
							onMouseMove={onMouseMove}
							onMouseLeave={onMouseLeave}
							onMouseEnter={onMouseEnter}
						>
							{children}
							{isPip && (
								<>
									{isAudio && (
										<MediaPoster
											img={audioPlaceholder}
											width="100%"
											height="100%"
										/>
									)}
									<PIPControls />
								</>
							)}
						</Paper>
					</Rnd>
				</div>
			</Portal>
		);
	},
);
