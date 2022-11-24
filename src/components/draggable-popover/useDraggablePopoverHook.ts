import { useEffect, useState } from 'react';
import {
	Position,
	ResizeEnable,
	RndDragCallback,
	RndResizeCallback,
} from 'react-rnd';
import { usePrevious, useScrollbarWidth } from 'react-use';
import useWindowSize from 'react-use/lib/useWindowSize';

import { DEFAULT_PIP_SIZE } from '../../utils/constants';
import { MediaContainerProps } from '../media-container/MediaContainer';

export type Size = {
	width: string | number;
	height: string | number;
};
interface UseDraggablePopoverHookProps
	extends Pick<MediaContainerProps, 'xAxisDistance' | 'yAxisDistance'> {
	disablePortal?: boolean;
}

type Dimensions = Size & Position;
interface UseDraggablePopoverHook {
	/** Default player size */
	dimensions: Dimensions;
	enableResizing: ResizeEnable;
	handleDragStop: RndDragCallback;
	handleResizeStop: RndResizeCallback;
}

const vw = window.innerWidth;
const vh = window.innerHeight;

/** In case if width is not provided for browsers scrollbar, this constant will be used */
const SCROLLBAR_WIDTH = 16;

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
	const windowSize = useWindowSize();
	const prevWindowSize = usePrevious(windowSize);
	const scrollbarWidth = useScrollbarWidth() ?? SCROLLBAR_WIDTH;

	// Get player width + margin on 2 sides
	const pipPlayerWidth =
		DEFAULT_PIP_SIZE.width + xAxisDistance + scrollbarWidth;
	const pipPlayerHight =
		DEFAULT_PIP_SIZE.height + yAxisDistance + scrollbarWidth;

	const [dimensions, setDimensions] = useState<Dimensions>(DEFAULT_DIMENSIONS);

	useEffect(() => {
		if (!disablePortal) {
			return setDimensions({
				width: DEFAULT_PIP_SIZE.width,
				height: DEFAULT_PIP_SIZE.height,
				y: (windowSize?.height || vh) - pipPlayerHight,
				x: (windowSize?.width || vw) - pipPlayerWidth,
			});
		}

		setDimensions(DEFAULT_DIMENSIONS);
		// should occur only on switching PIP mode(isPip=disablePortal)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [disablePortal]);

	useEffect(() => {
		if (!disablePortal) {
			setDimensions(prev => {
				const newX =
					prev.x +
					windowSize.width -
					(prevWindowSize?.width ?? windowSize.width);
				return {
					...prev,
					x: newX > 0 ? newX : 0,
				};
			});
		}
		// Should occur only in PIP mode and when is browser resized(windowSize changed)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [windowSize, disablePortal]);

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
	return {
		enableResizing,
		dimensions,
		handleDragStop,
		handleResizeStop,
	};
};
