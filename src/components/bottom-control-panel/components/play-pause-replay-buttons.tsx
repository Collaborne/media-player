import { FC, useCallback } from 'react';

import { PauseOutlined, PlayArrow, ReplayOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { useBottomControlPanel } from '../bottom-control-panel.styles';

interface PlayPauseReplayProps {
	isFinished: boolean;
	isPlaying: boolean;
	onStop: VoidFunction;
	onPlay: VoidFunction;
	onReplay: VoidFunction;
}

export const PlayPauseReplay: FC<PlayPauseReplayProps> = ({
	isFinished,
	isPlaying,
	onPlay,
	onReplay,
	onStop,
}) => {
	const { mediumIconButtons, mediumIcons } = useBottomControlPanel();

	const handleClick = useCallback(() => {
		if (isFinished) {
			return onReplay();
		}

		if (isPlaying) {
			return onStop();
		}
		return onPlay();
	}, [isFinished, isPlaying, onPlay, onReplay, onStop]);

	return (
		<IconButton
			size="medium"
			className={mediumIconButtons}
			onClick={handleClick}
		>
			{isFinished ? (
				<ReplayOutlined className={mediumIcons} />
			) : isPlaying ? (
				<PauseOutlined className={mediumIcons} />
			) : (
				<PlayArrow className={mediumIcons} />
			)}
		</IconButton>
	);
};
