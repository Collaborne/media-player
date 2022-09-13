import { FC } from 'react';

import { useVideo } from '../../hooks';
import { BottomControlPanel } from '../bottom-control-panel/BottomControlPanel';
import { CenteredBottomPlayback } from '../centered-bottom-playback/CenteredBottomPlayback';
import { CenteredPlayButton } from '../centered-play-button/CenteredPlayButton';
import { CenteredReplayButton } from '../centered-replay-button/CenteredReplayButton';
import { PauseAnimation } from '../play-pause-animation/PauseAnimation';
import { PlayAnimation } from '../play-pause-animation/PlayAnimation';
import { ProgressBar } from '../progress-bar/ProgressBar';

import { useControlsStyles } from './useControlsStyles';

export interface ControlProps {
	isVisible?: boolean;
	actionPanelClassName?: string;
}

export const Controls: FC<ControlProps> = ({ isVisible }) => {
	const { api, controlsConfig } = useVideo();

	// Show first controls screen
	const hasStarted = api?.getHasPlayedOrSeeked?.();

	const isFinished = (() => {
		const duration = Number(api?.getDuration?.());
		const isPlaying = Boolean(api?.getPlaying?.());
		const relativeTime = Number(api?.getCurrentRelativeTime?.());
		return duration > 0 && !isPlaying && relativeTime >= duration;
	})();

	// Controls styles
	const { wrapper, wrapperBottomPanel } = useControlsStyles().classes;

	return (
		<div className={wrapper}>
			<PlayAnimation />
			<PauseAnimation />

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
