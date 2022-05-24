import { FC, useState } from 'react';
import useEventListener from '@use-it/event-listener';

import { useVideo } from '../../hooks';
import { CenteredBottomPlayback } from '../centered-bottom-playback/CenteredBottomPlayback';
import { CenteredPlayButton } from '../centered-play-button/CenteredPlayButton';
import { useControlsStyles } from './useControlsStyles';

type ControlProps = {
	isVisible?: boolean;
};

export const Controls: FC<ControlProps> = () => {
	const { api } = useVideo();

	// Show first controls screen
	const [hasStarted, setStarted] = useState<boolean>(
		Boolean(api?.getPlaying?.()),
	);
	// Added TS for api as any, because it is also a event listener,
	// that this hook looks for
	useEventListener('play', () => setStarted(true), api as any);

	// Controls styles
	const { wrapper } = useControlsStyles();

	return (
		<div className={wrapper}>
			{!hasStarted && (
				<>
					<CenteredPlayButton />
					<CenteredBottomPlayback />
				</>
			)}
		</div>
	);
};
