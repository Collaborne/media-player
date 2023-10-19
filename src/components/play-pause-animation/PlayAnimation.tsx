import { FC, useEffect, useState } from 'react';
import { PiPlayCircleFill } from 'react-icons/pi';

import { useMediaStore } from '../../context';
import { useMediaListener, useIsAudio } from '../../hooks';
import {
	DEFAULT_EVENT_ANIMATION_DURATION,
	PLAY_ANIMATION,
} from '../../utils/constants';
import { AnimatedIconWrapper } from '../animated-icon-wrapper/AnimatedIconWrapper';

import { usePlayPauseHook } from './usePlayPauseHook';

interface PlayAnimationProps {
	animationDuration?: number;
	className?: string;
}

/** Display animation a "play" event was emitted
 * @category React Component
 * @category UI Controls
 */
export const PlayAnimation: FC<PlayAnimationProps> = ({
	animationDuration = DEFAULT_EVENT_ANIMATION_DURATION,
	className,
}) => {
	const isAudio = useIsAudio();
	const { centeredIcon, isPlaying, hasStarted } = usePlayPauseHook();
	const [showPlayAnimation, playAnimationStart] = useState(false);
	const listener = useMediaStore(state => state.getListener)();

	// Play animation on `play` event
	// and filtering out the first "play"
	useMediaListener(
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

	if (isAudio) {
		return null;
	}

	return (
		<AnimatedIconWrapper
			durationMs={animationDuration}
			startAnimation={showPlayAnimation}
			className={className}
			data-testid={PLAY_ANIMATION}
		>
			<PiPlayCircleFill className={centeredIcon} />
		</AnimatedIconWrapper>
	);
};
