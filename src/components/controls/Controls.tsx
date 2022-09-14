import { FC } from 'react';

import { BottomControls } from '../bottom-controls/BottomControls';
import { CenteredBottomPlayback } from '../centered-bottom-playback/CenteredBottomPlayback';
import { CenteredPlayButton } from '../centered-play-button/CenteredPlayButton';
import { CenteredReplayButton } from '../centered-replay-button/CenteredReplayButton';
import { PauseAnimation } from '../play-pause-animation/PauseAnimation';
import { PlayAnimation } from '../play-pause-animation/PlayAnimation';

import { useControlsStyles } from './useControlsStyles';

export interface ControlProps {}

export const Controls: FC<ControlProps> = () => {
	// Controls styles
	const { wrapper } = useControlsStyles().classes;

	return (
		<div className={wrapper}>
			<PlayAnimation />
			<PauseAnimation />
			<CenteredPlayButton />
			<CenteredBottomPlayback />
			<CenteredReplayButton />
			<BottomControls />
		</div>
	);
};
