import useEventListener from '@use-it/event-listener';
import { FC, useCallback, useMemo, useState } from 'react';
import { useVideo } from '../../hooks';
// import { BottomControlPanel } from '../bottom-control-panel/BottomControlPanel';
import { CenteredBottomPlayback } from '../centered-bottom-playback/CenteredBottomPlayback';
import { CenteredPlayButton } from '../centered-play-button/CenteredPlayButton';
import { useControlsStyles } from './useControlsStyles';

type ControlProps = {
	isVisible?: boolean;
};

export const Controls: FC<ControlProps> = () => {
	const { wrapper } = useControlsStyles();
	const { api } = useVideo();

	// Show first controls screen
	const [hasStarted, setStarted] = useState(Boolean(api?.getPlaying?.()));
	useEventListener('play', () => setStarted(true), api as any);
	const playbackRate = useMemo(() => Number(api?.getPlaybackRate?.()), [api]);

	// First pre-playback handlers
	const onPlayHandler = useCallback(() => api?.play?.(), [api]);

	return (
		<div className={wrapper}>
			{!hasStarted && (
				<>
					<CenteredPlayButton onClick={onPlayHandler} />
					<CenteredBottomPlayback
						activePlaybackRate={playbackRate}
						onChangePlaybackRate={api?.setPlaybackRate as any}
					/>
				</>
			)}
			{/* {controlsConfig?.bottomControls && <BottomControlPanel />} */}
		</div>
	);
};
