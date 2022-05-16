import { FC, useCallback } from 'react';
import { Button, Typography } from '@mui/material';
import { PLAYBACK_RATES } from '../centered-bottom-playback/centered-bottom-playback';

interface PlaybackRateButtonProps {
	playbackRate: number;
	onChangeRate: (newRate: number) => void;
	className?: string;
}

export const PlaybackRateButton: FC<PlaybackRateButtonProps> = ({
	playbackRate,
	onChangeRate,
	className,
}) => {
	const handleClick = useCallback(() => {
		const playbackLength = PLAYBACK_RATES.length;
		const currentIndex = PLAYBACK_RATES.findIndex(el => el === playbackRate);
		if (playbackLength === currentIndex) {
			return onChangeRate(PLAYBACK_RATES[0]);
		}
		return onChangeRate(PLAYBACK_RATES[currentIndex + 1]);
	}, [onChangeRate, playbackRate]);

	return (
		<Button
			variant="text"
			color="inherit"
			onClick={handleClick}
			className={className}
		>
			<Typography variant="subtitle2" color={'white'}>
				{playbackRate}&#10005;
			</Typography>
		</Button>
	);
};
