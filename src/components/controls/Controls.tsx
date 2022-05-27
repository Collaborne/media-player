import { FC, useState } from 'react';
import useEventListener from '@use-it/event-listener';

import { useVideo } from '../../hooks';
import { CenteredBottomPlayback } from '../centered-bottom-playback/CenteredBottomPlayback';
import { CenteredPlayButton } from '../centered-play-button/CenteredPlayButton';
import { useControlsStyles } from './useControlsStyles';
import { ProgressBar } from '../progress-bar/ProgressBar';
import { BottomControlPanel } from '../bottom-control-panel/BottomControlPanel';

type ControlProps = {
	isVisible?: boolean;
};

export const Controls: FC<ControlProps> = ({ isVisible }) => {
	const { api } = useVideo();

	// Show first controls screen
	const [hasStarted, setHasStarted] = useState<boolean>(
		Boolean(api?.getPlaying?.()),
	);
	// Added TS for api as any, because it is also a event listener,
	// that this hook looks for
	useEventListener('play', () => setHasStarted(true), api as any);

	// Controls styles
	const { wrapper, wrapperBottomPanel } = useControlsStyles();

	return (
		<div className={wrapper}>
			{!hasStarted ? (
				<>
					<CenteredPlayButton />
					<CenteredBottomPlayback />
				</>
			) : (
				<div className={wrapperBottomPanel}>
					<ProgressBar />
					{isVisible && <BottomControlPanel />}
				</div>
			)}
		</div>
	);
};
