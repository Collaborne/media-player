import { useCallback, useEffect, useState } from 'react';

import { useMediaStore } from '../context';
import { OVERLAY_HIDE_DELAY } from '../utils/constants';

interface UseOnHoveredControlElement {
	onMouseEnter: VoidFunction;
	onMouseLeave: VoidFunction;
}

export const useOnHoveredControlElement = (): UseOnHoveredControlElement => {
	const [isHovered, setIsHovered] = useState(false);
	const [setShowControls, markActivity] = useMediaStore(state => [
		state.setShowControls,
		state.markActivity,
	]);

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
