import { PauseOutlined, PlayArrow, ReplayOutlined } from '@mui/icons-material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { ComponentType, FC } from 'react';

import { useOnHoveredControlElement } from '../../../hooks/use-on-hovered-element';
import { usePlayPauseReplayHook } from '../../../hooks/use-play-pause-replay';
import {
	PAUSE_ICON,
	PLAY_ICON,
	PLAY_PAUSE_REPLAY,
	REPLAY_ICON,
} from '../../../utils';

interface PlayPauseReplayProps extends IconButtonProps {
	svgClassName?: string;
	Icons?: Record<'Play' | 'Replay' | 'Pause', ComponentType<SvgIconProps>>;
	svgIconSize?: SvgIconProps['fontSize'];
	skipSeconds?: number;
	'data-testid'?: string;
}

/**
 * @category React Component
 * @category UI Controls
 */
export const PlayPauseReplay: FC<PlayPauseReplayProps> = ({
	className,
	svgClassName,
	Icons = { Pause: PauseOutlined, Play: PlayArrow, Replay: ReplayOutlined },
	svgIconSize = 'inherit',
	skipSeconds,
	'data-testid': dataTestId = PLAY_PAUSE_REPLAY,
	...props
}) => {
	const { isFinished, isPlaying, onPlay, onStop } = usePlayPauseReplayHook();
	const { onMouseEnter, onMouseLeave } = useOnHoveredControlElement();

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

	return (
		<IconButton
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			size="medium"
			className={className}
			onClick={handleClick}
			data-testid={dataTestId}
			{...props}
		>
			{isFinished && (
				<Replay
					className={svgClassName}
					fontSize={svgIconSize}
					data-testid={REPLAY_ICON}
				/>
			)}
			{isPlaying && (
				<Pause
					className={svgClassName}
					fontSize={svgIconSize}
					data-testid={PAUSE_ICON}
				/>
			)}
			{!isFinished && !isPlaying && (
				<Play
					className={svgClassName}
					fontSize={svgIconSize}
					data-testid={PLAY_ICON}
				/>
			)}
		</IconButton>
	);
};
