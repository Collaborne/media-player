import { throttle } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useMediaStore } from '../../context';
import { OVERLAY_HIDE_DELAY } from '../../utils/constants';

interface UsePipMouseActivityHook {
	onMouseMove: VoidFunction;
	onMouseEnter: VoidFunction;
	onMouseLeave: VoidFunction;
}

const MOUSE_MOVE_THROTTLE = 1000;

export const usePipMouseActivityHook = (): UsePipMouseActivityHook => {
	const [lastMouseMove, setLastMouseMove] = useState<number>(0);
	const [isContainerHovered, setIsContainerHovered] = useState(false);

	const [
		setShowPipControls,
		isPlaying,
		showPipControls,
		lastPipActivityRef,
		markPipActivity,
		isPip,
	] = useMediaStore(state => [
		state.setShowPipControls,
		state.isPlaying,
		state.showPipControls,
		state.lastPipActivityRef,
		state.markPipActivity,
		state.isPip,
	]);

	const updateShowControls = useCallback(() => {
		if (!isPip) {
			return;
		}
		if (!isPlaying) {
			return setShowPipControls(true);
		}

		if (!isContainerHovered) {
			return setShowPipControls(false);
		}
		const lastActivity = lastPipActivityRef?.current || 0;
		return setShowPipControls(Date.now() - lastActivity < OVERLAY_HIDE_DELAY);
	}, [
		isPip,
		lastPipActivityRef,
		isPlaying,
		isContainerHovered,
		setShowPipControls,
	]);

	useEffect(updateShowControls, [
		updateShowControls,
		showPipControls,
		isPlaying,
		lastMouseMove,
	]);

	const onMouseEnter = useCallback(() => {
		if (!isPip) {
			return;
		}
		setIsContainerHovered(true);
	}, [isPip]);

	const onMouseLeave = useCallback(() => {
		if (!isPip) {
			return;
		}
		setIsContainerHovered(false);
	}, [isPip]);

	const onMouseMove = useMemo(() => {
		if (!isPip) {
			return () => {
				return undefined;
			};
		}
		const throttled = throttle(() => {
			markPipActivity();
			setLastMouseMove(Date.now());
		}, MOUSE_MOVE_THROTTLE);
		return () => {
			return throttled();
		};
	}, [isPip, markPipActivity]);

	// Updating media players bottom control's panel after OVERLAY_HIDE_DELAY time period
	useEffect(() => {
		if (!isPlaying || !isContainerHovered || !isPip) {
			return;
		}
		const timeoutId = setTimeout(updateShowControls, OVERLAY_HIDE_DELAY + 100);
		return () => clearTimeout(timeoutId);
	}, [updateShowControls, lastMouseMove, isPlaying, isContainerHovered, isPip]);

	return {
		onMouseEnter,
		onMouseLeave,
		onMouseMove,
	};
};
