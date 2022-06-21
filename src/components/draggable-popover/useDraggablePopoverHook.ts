import { useCallback, useMemo, useState } from 'react';

import { ResizableProps, ResizeCallback, Size } from 're-resizable';
import { DraggableBounds, DraggableProps } from 'react-draggable';

import { DEFAULT_PIP_SIZE } from '../../utils/constants';

interface UseDraggablePopoverHookProps {
	disablePortal?: boolean;
}

interface UseDraggablePopoverHook {
	/** PIP player width and height - updated on resize events */
	pipPlayerSize: Size;
	/** Callback that is called when resize event is stopped. Updates sizes for pipPlayer */
	resizeStopHandler: ResizeCallback;
	/** First positions when PIP mode is on */
	defaultPosition: DraggableProps['defaultPosition'];
	/** Controls when resizing should be enabled(Ex: on player standard mode we do not use resizing) */
	enableResizing: ResizableProps['enable'];
	/** Default size when pip mode is enabled */
	defaultSize: ResizableProps['defaultSize'];
	/** Bound points that keeps video into the viewport + margins respected */
	bounds: DraggableBounds;
}

/** Space from viewport borders(vertical and horizontal) */
const POPOVER_MARGIN = 16;
/** Scrollbar width may vary. Used 16px as a rounded value. More info: https://codepen.io/sambible/post/browser-scrollbar-widths */
const SCROLLBAR_WIDTH = 16;

export const useDraggablePopoverHook = ({
	disablePortal,
}: UseDraggablePopoverHookProps): UseDraggablePopoverHook => {
	const [pipPlayerSize, setPlayerPipSize] = useState<Size>({
		height: DEFAULT_PIP_SIZE.height,
		width: DEFAULT_PIP_SIZE.width,
	});

	const resizeStopHandler: ResizeCallback = useCallback(
		(_e, _direction, _ref, d) => {
			setPlayerPipSize(prevState => {
				return {
					width:
						(parseInt(`${prevState.width}`) || DEFAULT_PIP_SIZE.width) +
						d.width,
					height:
						(parseInt(`${prevState.height}`) || DEFAULT_PIP_SIZE.height) +
						d.height,
				};
			});
		},
		[],
	);

	/** Disable Resizing events when  *portal mode* is disabled */
	const enableResizing = useMemo(
		(): ResizableProps['enable'] =>
			disablePortal
				? {}
				: {
						bottomLeft: true,
						bottomRight: true,
						topLeft: true,
						topRight: true,
				  },
		[disablePortal],
	);

	const defaultSize = useMemo(
		(): ResizableProps['defaultSize'] =>
			disablePortal ? { width: '100%', height: '100%' } : DEFAULT_PIP_SIZE,
		[disablePortal],
	);

	// Get current wrapper position, and calculate it distance until the vw finished -16px
	const defaultPosition = useMemo((): DraggableProps['defaultPosition'] => {
		const vw = window.innerWidth;
		const vh = window.innerHeight;

		// If we have scrollbars then we add them too
		const verticalScrollbarWidth =
			document.body.offsetWidth > window.innerWidth ? SCROLLBAR_WIDTH : 0;
		const horizontalScrollbarWidth =
			document.body.offsetHeight > window.innerHeight ? SCROLLBAR_WIDTH : 0;
		if (!disablePortal) {
			return {
				y:
					vh -
					POPOVER_MARGIN -
					verticalScrollbarWidth -
					(parseInt(`${pipPlayerSize.height}`) || DEFAULT_PIP_SIZE.height),
				x:
					vw -
					POPOVER_MARGIN -
					horizontalScrollbarWidth -
					(parseInt(`${pipPlayerSize.width}`) || DEFAULT_PIP_SIZE.width),
			};
		}

		return { x: 0, y: 0 };
	}, [pipPlayerSize.height, pipPlayerSize.width, disablePortal]);

	const bounds = useMemo(
		(): DraggableBounds => ({
			left: POPOVER_MARGIN - defaultPosition.x,

			right: 0,
			top: POPOVER_MARGIN - defaultPosition.y,
			bottom: 0,
		}),
		[defaultPosition.x, defaultPosition.y],
	);

	return {
		pipPlayerSize,
		bounds,
		defaultPosition,
		defaultSize,
		enableResizing,
		resizeStopHandler,
	};
};
