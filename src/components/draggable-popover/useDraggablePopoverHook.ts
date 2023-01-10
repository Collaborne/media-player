import { RefObject, useEffect, useRef, useState } from 'react';
import {
	Position,
	ResizeEnable,
	RndDragCallback,
	RndResizeCallback,
} from 'react-rnd';
import { useMeasure, usePrevious } from 'react-use';
import { UseMeasureRef } from 'react-use/lib/useMeasure';

import { DEFAULT_PIP_SIZE } from '../../utils/constants';
import { MediaContainerProps } from '../media-container/MediaContainer';

export type Size = {
	width: string | number;
	height: string | number;
};
interface UseDraggablePopoverHookProps
	extends Pick<MediaContainerProps, 'xAxisDistance' | 'yAxisDistance'> {
	isPip: boolean;
	pipPortalRef: RefObject<HTMLDivElement>;
	pipContainer: RefObject<HTMLDivElement>;
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
}

const vw = window.innerWidth;

const DEFAULT_DIMENSIONS: Dimensions = {
	width: '100%',
	height: '100%',
	y: 0,
	x: 0,
};

export const useDraggablePopoverHook = ({
	isPip,
	xAxisDistance,
	yAxisDistance,
	pipContainer,
}: UseDraggablePopoverHookProps): UseDraggablePopoverHook => {
	// DraggablePopover DnD params:
	const [portalWrapperRef, containerSize] = useMeasure();
	const hasMovedOrResizedRef = useRef(false);
	const hasWindowResized = useRef(false);

	const prevContainerSize = usePrevious(containerSize);
	const firstPositionRef = useRef<Dimensions>({
		width: DEFAULT_PIP_SIZE.width,
		height: DEFAULT_PIP_SIZE.height,
		x: 0,
		y: 0,
	});

	// Get player width + margin on 2 sides
	const pipPlayerWidth = DEFAULT_PIP_SIZE.width + xAxisDistance;
	const pipPlayerHight = DEFAULT_PIP_SIZE.height + yAxisDistance;

	const [dimensions, setDimensions] = useState<Dimensions>(DEFAULT_DIMENSIONS);

	const enableResizing = !isPip
		? false
		: {
				topLeft: true,
				topRight: true,
				bottomLeft: true,
				bottomRight: true,
		  };

	const handleDragStop: RndDragCallback = (_e, d) => {
		hasMovedOrResizedRef.current = true;
		setDimensions(prev => ({ ...prev, x: d.x, y: d.y }));
	};

	const handleResizeStop: RndResizeCallback = (
		_e,
		_direction,
		ref,
		_delta,
		position,
	) => {
		hasMovedOrResizedRef.current = true;
		setDimensions(prev => ({
			...prev,
			width: ref.style.width,
			height: ref.style.height,
			...position,
		}));
	};

	useEffect(() => {
		const onWindowResize = () => {
			if (!isPip) {
				hasWindowResized.current = false;
			}
			hasWindowResized.current = true;
		};

		window.addEventListener('resize', onWindowResize);
		return () => window.removeEventListener('resize', onWindowResize);
	}, [isPip]);

	// When media goes off from PIP mode, reset hasMovedOrResizedRef
	useEffect(() => {
		if (!isPip) {
			hasMovedOrResizedRef.current = false;
		}
	}, [isPip]);

	// Get first mounting positions for the PIP player
	useEffect(() => {
		if (!pipContainer.current || hasMovedOrResizedRef.current) {
			return;
		}
		const width = pipContainer.current.offsetWidth;
		const height = pipContainer.current.offsetHeight;

		firstPositionRef.current = {
			x: width - pipPlayerWidth,
			y: height - pipPlayerHight,
			width: DEFAULT_PIP_SIZE.width,
			height: DEFAULT_PIP_SIZE.height,
		};
		// Recalculate default position size depending on Portal resizing
	}, [containerSize]);

	useEffect(() => {
		// If: media is in PIP mode and wasn't resized or moved
		// then position it with initial values
		if (isPip && !hasMovedOrResizedRef.current) {
			return setDimensions(firstPositionRef.current);
		}

		if (!isPip) {
			setDimensions(DEFAULT_DIMENSIONS);
		}
	}, [isPip]);

	useEffect(() => {
		const hasOnlyWindowResized =
			hasWindowResized.current && !hasMovedOrResizedRef.current;
		if (isPip && hasOnlyWindowResized) {
			return setDimensions(firstPositionRef.current);
		}
		if (isPip && hasMovedOrResizedRef.current) {
			console.log('calculating new params');
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
	}, [isPip, containerSize]);

	return {
		enableResizing,
		dimensions,
		handleDragStop,
		handleResizeStop,
		portalWrapperRef,
	};
};
