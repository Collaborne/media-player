import useEventListener from '@use-it/event-listener';
import { FC, useEffect, useState } from 'react';

import { useVideo } from '../../hooks';
import { DEFAULT_EVENT_ANIMATION_DURATION } from '../../utils/constants';
import { AnimatedIconWrapper } from '../animated-icon-wrapper/AnimatedIconWrapper';
import { BottomControlPanel } from '../bottom-control-panel/BottomControlPanel';
import { CenteredBottomPlayback } from '../centered-bottom-playback/CenteredBottomPlayback';
import { CenteredPlayButton } from '../centered-play-button/CenteredPlayButton';
import { CenteredReplayButton } from '../centered-replay-button/CenteredReplayButton';
import {
	FileActionPanel,
	FileActionPanelProps,
} from '../file-action-panel/FileActionPanel';
import { BigPauseIcon } from '../icons/BigPauseIcon';
import { BigPlayIcon } from '../icons/BigPlayIcon';
import { ProgressBar } from '../progress-bar/ProgressBar';

import { useControlsStyles } from './useControlsStyles';

export interface ControlProps extends Omit<FileActionPanelProps, 'className'> {
	isVisible?: boolean;
	actionPanelClassName?: string;
}

export const Controls: FC<ControlProps> = ({
	isVisible,
	onDelete,
	onDownload,
	removeAsCover,
	setAsCover,
	actionPanelClassName,
	hasImageCover,
	isCover,
}) => {
	const { api, controlsConfig } = useVideo();
	const isPlaying = Boolean(api?.getPlaying?.());

	const animationDuration =
		controlsConfig?.eventAnimationDurationMs ||
		DEFAULT_EVENT_ANIMATION_DURATION;

	// Show first controls screen
	const hasStarted = api?.getHasPlayedOrSeeked?.();
	const [showPlayAnimation, setShowPlayAnimation] = useState(false);
	const [showPauseAnimation, setShowPauseAnimation] = useState(false);

	const isFinished = (() => {
		const duration = Number(api?.getDuration?.());
		const isPlaying = Boolean(api?.getPlaying?.());
		const relativeTime = Number(api?.getCurrentRelativeTime?.());
		return duration > 0 && !isPlaying && relativeTime >= duration;
	})();

	// useEventListener uses under the hood event listeners, that are also present in api, but do not correspond typings from the package
	// Play animation on `play` event
	useEventListener(
		'play',
		() => {
			if (!hasStarted) {
				return;
			}
			if (!isPlaying) {
				setShowPlayAnimation(true);
			}
		},
		api as unknown as HTMLElement,
	);

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
		if (showPlayAnimation) {
			setShowPlayAnimation(false);
		}
		if (showPauseAnimation) {
			setShowPauseAnimation(false);
		}
	}, [showPauseAnimation, showPlayAnimation]);

	// Controls styles
	const { bigCenteredIcon, wrapper, wrapperBottomPanel } =
		useControlsStyles().classes;

	return (
		<div className={wrapper}>
			<AnimatedIconWrapper
				durationMs={animationDuration}
				startAnimation={showPauseAnimation}
			>
				<BigPauseIcon className={bigCenteredIcon} />
			</AnimatedIconWrapper>
			<AnimatedIconWrapper
				durationMs={animationDuration}
				startAnimation={showPlayAnimation}
			>
				<BigPlayIcon className={bigCenteredIcon} />
			</AnimatedIconWrapper>
			{isVisible && controlsConfig?.fileActionsPanel && (
				<FileActionPanel
					onDelete={onDelete}
					onDownload={onDownload}
					removeAsCover={removeAsCover}
					setAsCover={setAsCover}
					className={actionPanelClassName}
					hasImageCover={hasImageCover}
					isCover={isCover}
				/>
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
						{controlsConfig?.progressBar && <ProgressBar />}
						{isVisible && controlsConfig?.bottomControls && (
							<BottomControlPanel />
						)}
					</div>
				</>
			)}
		</div>
	);
};
