import { PauseOutlined, PlayArrow, ReplayOutlined } from '@mui/icons-material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { ComponentType, FC } from 'react';

import { usePlayPauseReplayHook } from '../../../hooks/use-play-pause-replay';

interface PlayPauseReplayProps extends IconButtonProps {
	svgClassName?: string;
	Icons?: Record<'Play' | 'Replay' | 'Pause', ComponentType<SvgIconProps>>;
	svgIconSize?: SvgIconProps['fontSize'];
	skipSeconds?: number;
}

export const PlayPauseReplay: FC<PlayPauseReplayProps> = ({
	className,
	svgClassName,
	Icons = { Pause: PauseOutlined, Play: PlayArrow, Replay: ReplayOutlined },
	svgIconSize = 'inherit',
	skipSeconds,
	...props
}) => {
	const { isFinished, isPlaying, onPlay, onStop } = usePlayPauseReplayHook();
	const { Pause, Play, Replay } = Icons;

	const handleClick = () => {
		if (isFinished) {
			return onPlay();
		}

		if (isPlaying) {
			return onStop();
		}
		return onPlay();
	};
	console.log('PlayPauseReplay RERENDER');
	return (
		<IconButton
			size="medium"
			className={className}
			onClick={handleClick}
			{...props}
		>
			{isFinished && (
				<Replay
					className={svgClassName}
					fontSize={svgIconSize}
					data-testid="icon-replay"
				/>
			)}
			{isPlaying && (
				<Pause
					className={svgClassName}
					fontSize={svgIconSize}
					data-testid="icon-pause"
				/>
			)}
			{!isFinished && !isPlaying && (
				<Play
					className={svgClassName}
					fontSize={svgIconSize}
					data-testid="icon-play"
				/>
			)}
		</IconButton>
	);
};
