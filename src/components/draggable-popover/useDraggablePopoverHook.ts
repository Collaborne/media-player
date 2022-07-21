import { useMemo } from 'react';
import { Position, ResizeEnable } from 'react-rnd';
import useWindowSize from 'react-use/lib/useWindowSize';

import { DEFAULT_PIP_SIZE } from '../../utils/constants';

export type Size = {
	width: string | number;
	height: string | number;
};
interface UseDraggablePopoverHookProps {
	disablePortal?: boolean;
}

interface UseDraggablePopoverHook {
	/** Default player size */
	defaultWidth: Size;
	/** Default positioning on layout */
	defaultPosition: Position;
	/** "Corners"  where we allow to start resizing */
	enableResizing: ResizeEnable;
}

/** Space from viewport borders(vertical and horizontal) */
const POPOVER_MARGIN = 16;
const vw = window.innerWidth;
const vh = window.innerHeight;
export const useDraggablePopoverHook = ({
	disablePortal,
}: UseDraggablePopoverHookProps): UseDraggablePopoverHook => {
	const windowSize = useWindowSize();

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

		// Get player width + margin on 2 sides
		const pipPlayerWidth = DEFAULT_PIP_SIZE.width + POPOVER_MARGIN * 2;
		const pipPlayerHight = DEFAULT_PIP_SIZE.height + POPOVER_MARGIN * 2;

		return {
			y: (windowSize?.height || vh) - pipPlayerHight,
			x: (windowSize?.width || vw) - pipPlayerWidth,
		};
	}, [disablePortal, windowSize?.height, windowSize?.width]);

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
