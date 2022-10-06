import { FC, useEffect } from 'react';

import { useVideoStore } from '../../context';
import { useVideoListener } from '../../hooks';
import { DEFAULT_EVENT_ANIMATION_DURATION } from '../../utils/constants';
import { AnimatedIconWrapper } from '../animated-icon-wrapper/AnimatedIconWrapper';
import { BigPauseIcon } from '../icons';

import { usePlayPauseHook } from './usePlayPauseHook';

interface PauseAnimationProps {
	animationDuration?: number;
}

/** Display animation when player emitted "play" event */
export const PauseAnimation: FC<PauseAnimationProps> = ({
	animationDuration = DEFAULT_EVENT_ANIMATION_DURATION,
}) => {
	const { centeredIcon, isPlaying, hasStarted } = usePlayPauseHook();
	const listener = useVideoStore(state => state.getListener)();
	const showPauseAnimation = useVideoStore(
		state => state.didPauseAnimationStart,
	);
	const pauseAnimationStart = useVideoStore(state => state.pauseAnimationStart);

	// Play animation on `pause` event
	useVideoListener(
		'pause',
		() => {
			if (!hasStarted) {
				return;
			}
			if (isPlaying) {
				pauseAnimationStart(true);
			}
		},
		listener,
	);

	// Rerender when animation has been triggered, and close it
	useEffect(() => {
		if (showPauseAnimation) {
			pauseAnimationStart(false);
		}
	}, [pauseAnimationStart, showPauseAnimation]);

	console.log(
		'PauseAnimation Rerender, showPauseAnimation',
		showPauseAnimation,
	);

	return (
		<AnimatedIconWrapper
			durationMs={animationDuration}
			startAnimation={showPauseAnimation}
		>
			<BigPauseIcon className={centeredIcon} />
		</AnimatedIconWrapper>
	);
};
