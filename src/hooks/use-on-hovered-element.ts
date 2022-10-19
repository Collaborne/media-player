import { useCallback, useEffect, useState } from 'react';

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

export const useOnHoveredControlElement = () => {
	const [setShowControls, markActivity] = useMediaStore(state => [
		state.setShowControls,
		state.markActivity,
	]);
	return useOnHoveredElement({ markActivity, setShowControls });
};

export const useOnHoveredPipControlElement = () => {
	const [setShowControls, markActivity] = useMediaStore(state => [
		state.setShowPipControls,
		state.markPipActivity,
	]);
	return useOnHoveredElement({ markActivity, setShowControls });
};
