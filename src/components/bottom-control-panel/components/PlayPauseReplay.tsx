import { PauseOutlined, PlayArrow, ReplayOutlined } from '@mui/icons-material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { SvgIconProps } from '@mui/material/SvgIcon';
import clsx from 'clsx';
import { ComponentType, FC, useCallback } from 'react';

import { useBottomControlPanelStyles } from '../useBottomControlPanelStyles';

interface PlayPauseReplayProps extends IconButtonProps {
	isFinished: boolean;
	isPlaying: boolean;
	onStop: VoidFunction;
	onPlay: VoidFunction;
	onReplay: VoidFunction;
	svgClassName?: string;
	Icons?: Record<'Play' | 'Replay' | 'Pause', ComponentType<SvgIconProps>>;
}

export const PlayPauseReplay: FC<PlayPauseReplayProps> = ({
	isFinished,
	isPlaying,
	onPlay,
	onReplay,
	onStop,
	className,
	svgClassName,
	Icons = { Pause: PauseOutlined, Play: PlayArrow, Replay: ReplayOutlined },
	...props
}) => {
	const { mediumIconButtons, mediumIcons } =
		useBottomControlPanelStyles().classes;
	const { Pause, Play, Replay } = Icons;
	const svgClasses = clsx(mediumIcons, svgClassName);

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
			className={clsx(mediumIconButtons, className)}
			onClick={handleClick}
			{...props}
		>
			{isFinished && <Replay className={svgClasses} />}
			{isPlaying && <Pause className={svgClasses} />}
			{!isFinished && !isPlaying && <Play className={svgClasses} />}
		</IconButton>
	);
};
