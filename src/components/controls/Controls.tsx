import useEventListener from '@use-it/event-listener';
import { FC, useState } from 'react';

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

	const animationDuration =
		controlsConfig?.eventAnimationDurationMs ||
		DEFAULT_EVENT_ANIMATION_DURATION;

	// Show first controls screen
	const [hasStarted, setHasStarted] = useState<boolean>(
		Boolean(api?.getPlaying?.()),
	);
	const [showPlayAnimation, setShowPlayAnimation] = useState(false);
	const [showPauseAnimation, setShowPauseAnimation] = useState(false);

	const isFinished = (() => {
		const duration = Number(api?.getDuration?.());
		const isPlaying = Boolean(api?.getPlaying?.());
		const relativeTime = Number(api?.getCurrentRelativeTime?.());
		return duration > 0 && !isPlaying && relativeTime >= duration;
	})();

	// useEventListener uses under the hood event listeners, that are also present in api, but do not correspond typings from the package
	useEventListener(
		'play',
		() => setHasStarted(true),
		api as unknown as HTMLElement,
	);

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
		api as unknown as HTMLElement,
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
		api as unknown as HTMLElement,
	);

	// Controls styles
	const { bigCenteredIcon, wrapper, wrapperBottomPanel } =
		useControlsStyles().classes;

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
