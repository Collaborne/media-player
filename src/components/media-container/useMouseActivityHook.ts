import { throttle } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useEvent from 'react-use/lib/useEvent';

import { useMediaStore } from '../../context';
import { OVERLAY_HIDE_DELAY } from '../../utils/constants';

interface UseMouseActivityHook {
	onMouseMove: VoidFunction;
	onMouseEnter: VoidFunction;
	onMouseLeave: VoidFunction;
}

const MOUSE_MOVE_THROTTLE = 1000;

export const useMouseActivityHook = (): UseMouseActivityHook => {
	const [lastMouseLeave, setLastMouseLeave] = useState<number>(0);
	const [lastMouseMove, setLastMouseMove] = useState<number>(0);

	const lastActivityRef = useRef<number>();
	const markActivity = useCallback(() => {
		if (lastActivityRef) {
			lastActivityRef.current = Date.now();
		}
	}, []);
	const [
		isFullscreen,
		setShowControls,
		isPlaying,
		isPip,
		showControls,
		mediaContainerRef,
	] = useMediaStore(state => [
		state.isFullscreen,
		state.setShowControls,
		state.isPlaying,
		state.isPip,
		state.showControls,
		state.mediaContainerRef,
	]);

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
		return setShowControls(Date.now() - lastActivity < OVERLAY_HIDE_DELAY);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isFullscreen, lastActivityRef, lastMouseLeave, isPip]);

	useEffect(updateShowControls, [
		updateShowControls,
		showControls,
		isPlaying,
		lastMouseMove,
	]);

	const onMouseEnter = useCallback(() => {
		markActivity();
		setLastMouseMove(Date.now());
	}, [markActivity]);

	const onMouseLeave = useCallback(() => {
		setShowControls(false);
	}, [setShowControls]);

	const onMouseMove = useMemo(() => {
		const throttled = throttle(() => {
			markActivity();
			setLastMouseLeave(Date.now());
		}, MOUSE_MOVE_THROTTLE);
		return () => {
			return throttled();
		};
	}, [markActivity]);

	// Updating media players bottom control's panel after OVERLAY_HIDE_DELAY time period
	useEffect(() => {
		if (!isPlaying) {
			return;
		}
		const timeoutId = setTimeout(updateShowControls, OVERLAY_HIDE_DELAY + 100);
		return () => clearTimeout(timeoutId);
	}, [updateShowControls, lastMouseMove, isPlaying]);

	// Show media controls when controls are focused
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
