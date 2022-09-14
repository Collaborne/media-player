import useEventListener from '@use-it/event-listener';
import { FC, useEffect, useState } from 'react';

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
	const { centeredIcon, isPlaying, hasStarted, api } = usePlayPauseHook();
	const [showPlayAnimation, setShowPlayAnimation] = useState(false);
	const playAnimation = () => setShowPlayAnimation(true);

	// Play animation on `play` event
	// and filtering out the first "play"
	useEventListener(
		'play',
		() => {
			if (!hasStarted) {
				return;
			}
			if (!isPlaying) {
				console.log('called');
				playAnimation();
			}
		},
		api as unknown as HTMLElement,
	);

	// Rerender when animation has been triggered
	useEffect(() => {
		if (showPlayAnimation) {
			setShowPlayAnimation(false);
		}
	}, [showPlayAnimation]);

	return (
		<AnimatedIconWrapper
			durationMs={animationDuration}
			startAnimation={showPlayAnimation}
		>
			<BigPlayIcon className={centeredIcon} />
		</AnimatedIconWrapper>
	);
};
