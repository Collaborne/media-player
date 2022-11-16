import { Position, ResizeEnable } from 'react-rnd';
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

interface UseDraggablePopoverHook {
	/** Default player size */
	defaultWidth: Size;
	/** Default positioning on layout */
	defaultPosition: Position;
	/** "Corners"  where we allow to start resizing */
	enableResizing: ResizeEnable;
}

const vw = window.innerWidth;
const vh = window.innerHeight;
export const useDraggablePopoverHook = ({
	disablePortal,
	xAxisDistance,
	yAxisDistance,
}: UseDraggablePopoverHookProps): UseDraggablePopoverHook => {
	// DraggablePopover DnD params:
	const windowSize = useWindowSize();

	const defaultWidth = disablePortal
		? { width: '100%', height: '100%' }
		: { ...DEFAULT_PIP_SIZE };

	const defaultPosition = (() => {
		if (disablePortal) {
			return { x: 0, y: 0 };
		}

		// Get player width + margin on 2 sides
		const pipPlayerWidth = DEFAULT_PIP_SIZE.width + xAxisDistance * 2;
		const pipPlayerHight = DEFAULT_PIP_SIZE.height + yAxisDistance * 2;

		return {
			y: (windowSize?.height || vh) - pipPlayerHight,
			x: (windowSize?.width || vw) - pipPlayerWidth,
		};
	})();

	const enableResizing = disablePortal
		? false
		: {
				topLeft: true,
				topRight: true,
				bottomLeft: true,
				bottomRight: true,
		  };
	return {
		defaultPosition,
		defaultWidth,
		enableResizing,
	};
};
