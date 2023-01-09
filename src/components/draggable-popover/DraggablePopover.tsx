import Paper from '@mui/material/Paper';
import Portal, { PortalProps } from '@mui/material/Portal';
import { isElement } from 'lodash';
import { FC, memo, RefObject, useRef } from 'react';
import { Rnd, Props as RndProps } from 'react-rnd';

import { useMediaStore } from '../../context';
import { useIsAudio } from '../../hooks';
import { usePipControlsContext } from '../../hooks/use-pip-controls-context';
import { DRAGGABLE_POPOVER } from '../../utils';
import { MediaContainerProps } from '../media-container/MediaContainer';
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
export interface DraggablePopoverProps
	extends Omit<PortalProps, 'disablePortal'>,
		Pick<
			MediaContainerProps,
			'xAxisDistance' | 'yAxisDistance' | 'pipPortalClassName'
		> {
	rndProps?: RndProps;
	className?: string;
	audioPlaceholder?: string;
	'data-testid'?: string;
	pipContainer: RefObject<HTMLElement>;
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
		xAxisDistance,
		yAxisDistance,
		'data-testid': dataTestId = DRAGGABLE_POPOVER,
		pipPortalClassName,
		pipContainer,

		...props
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
			disablePortal: !isPip,
			xAxisDistance,
			yAxisDistance,
			pipPortalRef,
			pipContainer,
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
			<Portal
				disablePortal={!isPip}
				container={pipContainer?.current}
				{...props}
			>
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
