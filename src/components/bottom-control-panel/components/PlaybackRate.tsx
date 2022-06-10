import { FC, useCallback } from 'react';

import Button from '@mui/material/Button';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { PLAYBACK_RATES } from '../../../utils/constants';
import { MultiplySymbol } from '../../../utils/MultiplySymbol';

interface PlaybackRateButtonProps {
	playbackRate: number;
	onChangeRate: (newRate: number) => void;
	className?: string;
	typographyProps?: TypographyProps;
}

export const PlaybackRateButton: FC<PlaybackRateButtonProps> = ({
	playbackRate,
	onChangeRate,
	className,
	typographyProps,
}) => {
	const handleClick = useCallback(() => {
		// Gets the next value of playback rate, otherwise get first one
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
			<Typography variant="body2" fontWeight={600} {...typographyProps}>
				{playbackRate}
				<span>
					<MultiplySymbol />
				</span>
			</Typography>
		</Button>
	);
};
