import { RefObject, useEffect, useState } from 'react';
import {
	Position,
	ResizeEnable,
	RndDragCallback,
	RndResizeCallback,
} from 'react-rnd';
import { useMeasure, usePrevious } from 'react-use';
import { UseMeasureRef } from 'react-use/lib/useMeasure';

import { sleep } from '../../utils';
import { DEFAULT_PIP_SIZE } from '../../utils/constants';
import { MediaContainerProps } from '../media-container/MediaContainer';

export type Size = {
	width: string | number;
	height: string | number;
};
interface UseDraggablePopoverHookProps
	extends Pick<MediaContainerProps, 'xAxisDistance' | 'yAxisDistance'> {
	disablePortal?: boolean;
	pipPortalRef: RefObject<HTMLDivElement>;
}

type Dimensions = Size & Position;
interface UseDraggablePopoverHook {
	/** Default player size */
	dimensions: Dimensions;
	enableResizing: ResizeEnable;
	handleDragStop: RndDragCallback;
	handleResizeStop: RndResizeCallback;
	/** Ref for the layout where PIP player will be mounted. Also used for a box for resizing and dragging */
	portalWrapperRef: UseMeasureRef<Element>;
	/** Controls if PIP player was calculated and ready to be mounted into the new container */
	isPipPositioning: boolean;
}

const vw = window.innerWidth;

const DEFAULT_DIMENSIONS: Dimensions = {
	width: '100%',
	height: '100%',
	y: 0,
	x: 0,
};

export const useDraggablePopoverHook = ({
	disablePortal,
	xAxisDistance,
	yAxisDistance,
}: UseDraggablePopoverHookProps): UseDraggablePopoverHook => {
	// DraggablePopover DnD params:
	const [portalWrapperRef, containerSize] = useMeasure();
	const [isFirstMeasure, setIsFirstMeasure] = useState(true);
	const [isPipPositioning, setIsPipPositioning] = useState(false);
	const prevContainerSize = usePrevious(containerSize);

	// Get player width + margin on 2 sides
	const pipPlayerWidth = DEFAULT_PIP_SIZE.width + xAxisDistance;
	const pipPlayerHight = DEFAULT_PIP_SIZE.height + yAxisDistance;

	const [dimensions, setDimensions] = useState<Dimensions>(DEFAULT_DIMENSIONS);

	const enableResizing = disablePortal
		? false
		: {
				topLeft: true,
				topRight: true,
				bottomLeft: true,
				bottomRight: true,
		  };

	const handleDragStop: RndDragCallback = (_e, d) => {
		setDimensions(prev => ({ ...prev, x: d.x, y: d.y }));
	};

	const handleResizeStop: RndResizeCallback = (
		_e,
		_direction,
		ref,
		_delta,
		position,
	) => {
		setDimensions(prev => ({
			...prev,
			width: ref.style.width,
			height: ref.style.height,
			...position,
		}));
	};

	// Get second measure. When portal is first enabled - it gets sizes from the MEDIA_CONTAINER, not from pip portal layout
	useEffect(() => {
		if (!disablePortal) {
			return setIsFirstMeasure(false);
		}
		setIsFirstMeasure(true);
	}, [containerSize, disablePortal]);

	useEffect(() => {
		const computeOnPortalOpen = async () => {
			if (!disablePortal && !isFirstMeasure) {
				setIsPipPositioning(true);
				await sleep(1);
				setIsPipPositioning(false);
				return setDimensions({
					width: DEFAULT_PIP_SIZE.width,
					height: DEFAULT_PIP_SIZE.height,
					y: containerSize?.height - pipPlayerHight,
					x: containerSize?.width - pipPlayerWidth,
				});
			}
			setDimensions(DEFAULT_DIMENSIONS);
		};
		void computeOnPortalOpen();

		// should occur only on switching PIP mode(isPip=disablePortal)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [disablePortal, isFirstMeasure]);

	useEffect(() => {
		if (!disablePortal) {
			const width = containerSize?.width ?? document.body.offsetWidth;

			const prevWidth = prevContainerSize?.width ?? vw;
			setDimensions(prev => {
				const newX = prev.x + width - prevWidth;
				return {
					...prev,
					x: newX > 0 ? newX : 0,
				};
			});
		}
		// Should occur only in PIP mode and when is browser resized(windowSize changed)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [disablePortal, containerSize]);

	return {
		enableResizing,
		dimensions,
		handleDragStop,
		handleResizeStop,
		portalWrapperRef,
		isPipPositioning,
	};
};
