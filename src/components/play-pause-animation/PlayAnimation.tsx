import { FC, useEffect, useState } from 'react';

import { useVideoStore } from '../../context';
import { useVideoListener } from '../../hooks';
import { DEFAULT_EVENT_ANIMATION_DURATION } from '../../utils/constants';
import { AnimatedIconWrapper } from '../animated-icon-wrapper/AnimatedIconWrapper';
import { BigPlayIcon } from '../icons';

import { usePlayPauseHook } from './usePlayPauseHook';

interface PlayAnimationProps {
	animationDuration?: number;
}

/** Display animation when player emitted "play" event */
export const PlayAnimation: FC<PlayAnimationProps> = ({
	animationDuration = DEFAULT_EVENT_ANIMATION_DURATION,
}) => {
	const { centeredIcon, isPlaying, hasStarted } = usePlayPauseHook();
	const [showPlayAnimation, playAnimationStart] = useState(false);
	const listener = useVideoStore(state => state.getListener)();

	// Play animation on `play` event
	// and filtering out the first "play"
	useVideoListener(
		'play',
		() => {
			if (!hasStarted) {
				return;
			}
			if (!isPlaying) {
				playAnimationStart?.(true);
			}
		},
		listener,
	);

	// Rerender when animation has been triggered and close it
	useEffect(() => {
		if (showPlayAnimation) {
			playAnimationStart?.(false);
		}
	}, [playAnimationStart, showPlayAnimation]);

	return (
		<AnimatedIconWrapper
			durationMs={animationDuration}
			startAnimation={showPlayAnimation}
		>
			<BigPlayIcon className={centeredIcon} />
		</AnimatedIconWrapper>
	);
};
