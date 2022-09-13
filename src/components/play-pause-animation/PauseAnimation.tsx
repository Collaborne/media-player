import useEventListener from '@use-it/event-listener';
import { FC, useEffect, useState } from 'react';

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
	const [showPauseAnimation, setShowPauseAnimation] = useState(false);

	// Play animation on `pause` event
	useEventListener(
		'pause',
		() => {
			if (!hasStarted) {
				return;
			}
			if (isPlaying) {
				setShowPauseAnimation(true);
			}
		},
		api as unknown as HTMLElement,
	);

	// Rerender when animation has been triggered
	useEffect(() => {
		if (showPauseAnimation) {
			setShowPauseAnimation(false);
		}
	}, [showPauseAnimation]);

	return (
		<AnimatedIconWrapper
			durationMs={animationDuration}
			startAnimation={showPauseAnimation}
		>
			<BigPauseIcon className={centeredIcon} />
		</AnimatedIconWrapper>
	);
};
