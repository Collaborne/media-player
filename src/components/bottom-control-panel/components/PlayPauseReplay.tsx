import { PauseOutlined, PlayArrow, ReplayOutlined } from '@mui/icons-material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { ComponentType, FC, useCallback } from 'react';

interface PlayPauseReplayProps extends IconButtonProps {
	isFinished: boolean;
	isPlaying: boolean;
	onStop: VoidFunction;
	onPlay: VoidFunction;
	onReplay: VoidFunction;
	svgClassName?: string;
	Icons?: Record<'Play' | 'Replay' | 'Pause', ComponentType<SvgIconProps>>;
	svgIconSize?: SvgIconProps['fontSize'];
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
	svgIconSize = 'inherit',
	...props
}) => {
	const { Pause, Play, Replay } = Icons;

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
			className={className}
			onClick={handleClick}
			{...props}
		>
			{isFinished && <Replay className={svgClassName} fontSize={svgIconSize} />}
			{isPlaying && <Pause className={svgClassName} fontSize={svgIconSize} />}
			{!isFinished && !isPlaying && (
				<Play className={svgClassName} fontSize={svgIconSize} />
			)}
		</IconButton>
	);
};
