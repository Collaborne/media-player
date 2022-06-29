import { useCallback, useMemo, useState } from 'react';

import { ResizableProps, ResizeCallback, Size } from 're-resizable';
import {
	ControlPosition,
	DraggableBounds,
	DraggableEventHandler,
	DraggableProps,
} from 'react-draggable';

import { DEFAULT_PIP_SIZE } from '../../utils/constants';
import {
	Position,
	ResizableDelta,
	ResizeEnable,
	RndResizeCallback,
} from 'react-rnd';

interface UseDraggablePopoverHookProps {
	disablePortal?: boolean;
}

interface UseDraggablePopoverHook {
	defaultWidth: Size;
	defaultPosition: Position;
	enableResizing: ResizeEnable;
}

/** Space from viewport borders(vertical and horizontal) */
const POPOVER_MARGIN = 16;
/** Scrollbar width may vary. Used 16px as a rounded value. More info: https://codepen.io/sambible/post/browser-scrollbar-widths */
const SCROLLBAR_WIDTH = 16;

export const useDraggablePopoverHook = ({
	disablePortal,
}: UseDraggablePopoverHookProps): UseDraggablePopoverHook => {
	const defaultWidth = useMemo<Size>(
		() =>
			disablePortal
				? { width: '100%', height: '100%' }
				: { ...DEFAULT_PIP_SIZE },
		[disablePortal],
	);

	const defaultPosition = useMemo<Position>(() => {
		if (disablePortal) {
			return { x: 0, y: 0 };
		}
		const vw = window.innerWidth;
		const vh = window.innerHeight;
		const pipWidth = DEFAULT_PIP_SIZE.width;
		const pipHeight = DEFAULT_PIP_SIZE.height;
		return {
			y: vh - pipHeight,
			x: vw - pipWidth,
		};
	}, [disablePortal]);

	const enableResizing = useMemo<ResizeEnable>(
		() =>
			disablePortal
				? false
				: {
						topLeft: true,
						topRight: true,
						bottomLeft: true,
						bottomRight: true,
				  },
		[disablePortal],
	);

	return { defaultPosition, defaultWidth, enableResizing };
};
