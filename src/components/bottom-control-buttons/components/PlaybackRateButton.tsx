import Button, { ButtonProps } from '@mui/material/Button';
import clsx from 'clsx';
import { FC } from 'react';

import { useVideo } from '../../../hooks';
import { PLAYBACK_RATES } from '../../../utils/constants';
import { MultiplySymbol } from '../../../utils/MultiplySymbol';
import { usePlaybackRateStyles } from '../hooks/usePlaybackRateStyles';

interface PlaybackRateButtonProps extends ButtonProps {}

export const PlaybackRateButton: FC<PlaybackRateButtonProps> = ({
	className,
	color = 'primary',
	variant = 'text',
	...props
}) => {
	const { api } = useVideo();
	const playbackRate = api?.getPlaybackRate?.() || 1;
	const handleClick = () => {
		// Gets the next value of playback rate, otherwise get first one
		const playbackLength = PLAYBACK_RATES.length;
		const currentIndex = PLAYBACK_RATES.findIndex(el => el === playbackRate);
		if (playbackLength === currentIndex) {
			return api?.setPlaybackRate?.(PLAYBACK_RATES[0]);
		}
		return api?.setPlaybackRate?.(PLAYBACK_RATES[currentIndex + 1]);
	};

	const { playBackRateBtn } = usePlaybackRateStyles().classes;
	const classNames = clsx(playBackRateBtn, className);

	return (
		<Button
			variant={variant}
			color={color}
			onClick={handleClick}
			className={classNames}
			data-testid="icon-playback-rate"
			{...props}
		>
			{playbackRate}
			<span>
				<MultiplySymbol />
			</span>
		</Button>
	);
};
