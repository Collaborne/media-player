import useEventListener from '@use-it/event-listener';
import { FC, useEffect } from 'react';

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
	const { centeredIcon, isPlaying, hasStarted, api } = usePlayPauseHook();
	const showPauseAnimation = api?.getDidPauseAnimationStart?.();
	const pauseAnimationStart = api?.pauseAnimationStart;
	// Play animation on `pause` event
	useEventListener(
		'pause',
		() => {
			if (!hasStarted) {
				return;
			}
			if (isPlaying) {
				pauseAnimationStart?.(true);
			}
		},
		api as unknown as HTMLElement,
	);
	// Rerender when animation has been triggered, and close it
	useEffect(() => {
		if (showPauseAnimation) {
			pauseAnimationStart?.(false);
		}
	}, [pauseAnimationStart, showPauseAnimation]);

	return (
		<AnimatedIconWrapper
			durationMs={animationDuration}
			startAnimation={showPauseAnimation}
		>
			<BigPauseIcon className={centeredIcon} />
		</AnimatedIconWrapper>
	);
};
