import Button, { ButtonProps } from '@mui/material/Button';
import clsx from 'clsx';
import { FC } from 'react';

import { useMediaStore } from '../../../context';
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
	const playbackRate = useMediaStore(state => state.playbackRate);
	const setPlaybackRate = useMediaStore(state => state.setPlaybackRate);
	const handleClick = () => {
		// Gets the next value of playback rate, otherwise get first one
		const playbackLength = PLAYBACK_RATES.length;
		const currentIndex = PLAYBACK_RATES.findIndex(el => el === playbackRate);
		if (playbackLength === currentIndex) {
			return setPlaybackRate(PLAYBACK_RATES[0]);
		}
		return setPlaybackRate(PLAYBACK_RATES[currentIndex + 1]);
	};

	const { playBackRateBtn } = usePlaybackRateStyles().classes;
	const classNames = clsx(playBackRateBtn, className);
	console.log('PlaybackRate Btn rerender');
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
