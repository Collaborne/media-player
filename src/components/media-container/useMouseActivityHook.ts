import { throttle } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useEvent from 'react-use/lib/useEvent';
import shallow from 'zustand/shallow';

import { useMediaStore } from '../../context';
import { OVERLAY_HIDE_DELAY } from '../../utils/constants';

interface UseMouseActivityHook {
	onMouseMove: VoidFunction;
	onMouseEnter: VoidFunction;
	onMouseLeave: VoidFunction;
}

const MOUSE_MOVE_THROTTLE = 1000;

export const useMouseActivityHook = (): UseMouseActivityHook => {
	const [lastMouseMove, setLastMouseMove] = useState<number>(0);
	const [isContainerHovered, setIsContainerHovered] = useState(false);

	const [
		isFullscreen,
		setShowControls,
		isPlaying,
		isPip,
		showControls,
		mediaContainerRef,
		lastActivityRef,
		markActivity,
	] = useMediaStore(
		state => [
			state.isFullscreen,
			state.setShowControls,
			state.isPlaying,
			state.isPip,
			state.showControls,
			state.mediaContainerRef,
			state.lastActivityRef,
			state.markActivity,
		],
		shallow,
	);

	const updateShowControls = useCallback(() => {
		if (isFullscreen) {
			return setShowControls(true);
		}
		const lastActivity = lastActivityRef?.current || 0;
		if (!isPlaying) {
			return setShowControls(true);
		}
		if (isPip) {
			return setShowControls(true);
		}
		if (!isContainerHovered) {
			return setShowControls(false);
		}
		return setShowControls(Date.now() - lastActivity < OVERLAY_HIDE_DELAY);
	}, [
		isFullscreen,
		lastActivityRef,
		isPlaying,
		isPip,
		isContainerHovered,
		setShowControls,
	]);

	useEffect(updateShowControls, [
		updateShowControls,
		showControls,
		isPlaying,
		lastMouseMove,
	]);

	const onMouseEnter = useCallback(() => {
		setIsContainerHovered(true);
	}, []);

	const onMouseLeave = useCallback(() => {
		setIsContainerHovered(false);
	}, []);

	const onMouseMove = useMemo(() => {
		const throttled = throttle(() => {
			markActivity();
			setLastMouseMove(Date.now());
		}, MOUSE_MOVE_THROTTLE);
		return () => {
			return throttled();
		};
	}, [markActivity]);

	// Updating media players bottom control's panel after OVERLAY_HIDE_DELAY time period
	useEffect(() => {
		if (!isPlaying || !isContainerHovered) {
			return;
		}
		const timeoutId = setTimeout(updateShowControls, OVERLAY_HIDE_DELAY + 100);
		return () => clearTimeout(timeoutId);
	}, [updateShowControls, lastMouseMove, isPlaying, isContainerHovered]);

	// Show media controls when MediaContainer is focused
	useEvent(
		'focus',
		() => {
			markActivity();
			updateShowControls();
		},
		mediaContainerRef?.current,
		{ capture: true },
	);

	return {
		onMouseEnter,
		onMouseLeave,
		onMouseMove,
	};
};
