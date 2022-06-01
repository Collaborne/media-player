import { FC, useMemo, useState } from 'react';
import useEventListener from '@use-it/event-listener';

import { useVideo } from '../../hooks';
import { CenteredBottomPlayback } from '../centered-bottom-playback/CenteredBottomPlayback';
import { CenteredPlayButton } from '../centered-play-button/CenteredPlayButton';
import { useControlsStyles } from './useControlsStyles';
import { ProgressBar } from '../progress-bar/ProgressBar';
import { BottomControlPanel } from '../bottom-control-panel/BottomControlPanel';
import { BigPauseIcon } from '../icons/BigPauseIcon';
import { BigPlayIcon } from '../icons/BigPlayIcon';
import { CenteredReplayButton } from '../centered-replay-button/CenteredReplayButton';
import { AnimatedIconWrapper } from '../animated-icon-wrapper/AnimatedIconWrapper';
import { DEFAULT_EVENT_ANIMATION_DURATION } from '../../utils/constants';

type ControlProps = {
	isVisible?: boolean;
};

export const Controls: FC<ControlProps> = ({ isVisible }) => {
	const { api, controlsConfig } = useVideo();

	const animationDuration = useMemo(
		() =>
			controlsConfig?.eventAnimationDurationMs ||
			DEFAULT_EVENT_ANIMATION_DURATION,
		[controlsConfig?.eventAnimationDurationMs],
	);

	// Show first controls screen
	const [hasStarted, setHasStarted] = useState<boolean>(
		Boolean(api?.getPlaying?.()),
	);
	const [showPlayAnimation, setShowPlayAnimation] = useState(false);
	const [showPauseAnimation, setShowPauseAnimation] = useState(false);

	const isFinished = useMemo(() => {
		const duration = Number(api?.getDuration?.());
		const isPlaying = Boolean(api?.getPlaying?.());
		const relativeTime = Number(api?.getCurrentRelativeTime?.());
		return duration > 0 && !isPlaying && relativeTime >= duration;
	}, [api?.getDuration, api?.getPlaying, api?.getCurrentRelativeTime]);

	// Added TS for api as any, because it is also a event listener,
	// that this hook looks for
	useEventListener('play', () => setHasStarted(true), api as any);

	// Play animation when video is paused
	useEventListener(
		'pause',
		() => {
			if (!hasStarted) {
				return;
			}
			setShowPauseAnimation(true);
			setTimeout(() => setShowPauseAnimation(false), animationDuration);
		},
		api as any,
	);

	// Play animation when video is played(exception: prePlay state)
	useEventListener(
		'play',
		() => {
			if (!hasStarted) {
				return;
			}
			setShowPlayAnimation(true);
			setTimeout(() => setShowPlayAnimation(false), animationDuration);
		},
		api as any,
	);

	// Controls styles
	const { bigCenteredIcon, wrapper, wrapperBottomPanel } = useControlsStyles();

	return (
		<div className={wrapper}>
			{showPauseAnimation && (
				<AnimatedIconWrapper durationMs={animationDuration}>
					<BigPauseIcon className={bigCenteredIcon} />
				</AnimatedIconWrapper>
			)}
			{showPlayAnimation && (
				<AnimatedIconWrapper durationMs={animationDuration}>
					<BigPlayIcon className={bigCenteredIcon} />
				</AnimatedIconWrapper>
			)}

			{!hasStarted ? (
				<>
					<CenteredPlayButton />
					<CenteredBottomPlayback />
				</>
			) : (
				<>
					{isFinished && <CenteredReplayButton />}
					<div className={wrapperBottomPanel}>
						<ProgressBar />
						{isVisible && <BottomControlPanel />}
					</div>
				</>
			)}
		</div>
	);
};
