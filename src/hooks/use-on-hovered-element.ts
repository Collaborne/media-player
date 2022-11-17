import { useCallback, useEffect, useState } from 'react';
import shallow from 'zustand/shallow';

import { useMediaStore } from '../context';
import { OVERLAY_HIDE_DELAY } from '../utils/constants';

interface UseOnHoveredElement {
	onMouseEnter: VoidFunction;
	onMouseLeave: VoidFunction;
}

interface UseOnHoveredElementProps {
	setShowControls: (isUpdated: boolean) => void;
	markActivity: VoidFunction;
}

/**
 * Implements general hover functionality on a any UI Controls Element
 * @category hooks
 * @category MediaStore
 */
export const useOnHoveredElement = ({
	setShowControls,
	markActivity,
}: UseOnHoveredElementProps): UseOnHoveredElement => {
	const [isHovered, setIsHovered] = useState(false);

	const onMouseEnter = useCallback(() => {
		setIsHovered(true);
	}, []);

	const onMouseLeave = useCallback(() => {
		setIsHovered(false);
	}, []);
	const updateShowControls = useCallback(() => {
		if (isHovered) {
			setShowControls(true);
		}
	}, [isHovered, setShowControls]);

	useEffect(updateShowControls, [updateShowControls]);

	// Update lastActivityRef within a `OVERLAY_HIDE_DELAY`
	useEffect(() => {
		if (!isHovered) {
			return;
		}
		const timeoutId = setTimeout(markActivity, OVERLAY_HIDE_DELAY);
		return () => clearTimeout(timeoutId);
	}, [updateShowControls, isHovered, markActivity]);

	return {
		onMouseEnter,
		onMouseLeave,
	};
};

/**
 * Implements general hover functionality on a player UI Controls Element
 * @category hooks
 * @category MediaStore
 */
export const useOnHoveredControlElement = () => {
	const [setShowControls, markActivity] = useMediaStore(
		state => [state.setShowControls, state.markActivity],
		shallow,
	);
	return useOnHoveredElement({ markActivity, setShowControls });
};

/**
 * Implements general hover functionality on a PIP player UI Controls Element
 * @category hooks
 * @category MediaStore
 */
export const useOnHoveredPipControlElement = () => {
	const [setShowControls, markActivity] = useMediaStore(
		state => [state.setShowPipControls, state.markPipActivity],
		shallow,
	);
	return useOnHoveredElement({ markActivity, setShowControls });
};
