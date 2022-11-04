import { FC, useEffect, useState } from 'react';

import { useMediaStore } from '../../context';
import { useIsAudio, useMediaListener } from '../../hooks';
import { DEFAULT_EVENT_ANIMATION_DURATION } from '../../utils/constants';
import { AnimatedIconWrapper } from '../animated-icon-wrapper/AnimatedIconWrapper';
import { BigPauseIcon } from '../icons';

import { usePlayPauseHook } from './usePlayPauseHook';

interface PauseAnimationProps {
	animationDuration?: number;
	className?: string;
}

/** Display animation a "pause" event was emitted
 * @category React Component
 * @category UI Controls
 */

export const PauseAnimation: FC<PauseAnimationProps> = ({
	animationDuration = DEFAULT_EVENT_ANIMATION_DURATION,
	className,
}) => {
	const isAudio = useIsAudio();
	const { centeredIcon, isPlaying, hasStarted } = usePlayPauseHook();
	const [showPauseAnimation, pauseAnimationStart] = useState(false);
	const listener = useMediaStore(state => state.getListener)();

	// Play animation on `pause` event
	useMediaListener(
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

	if (isAudio) {
		return null;
	}
	return (
		<AnimatedIconWrapper
			durationMs={animationDuration}
			startAnimation={showPauseAnimation}
			className={className}
		>
			<BigPauseIcon className={centeredIcon} />
		</AnimatedIconWrapper>
	);
};
