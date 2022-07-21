import Button, { ButtonProps } from '@mui/material/Button';
import { FC } from 'react';

import { PLAYBACK_RATES } from '../../../utils/constants';
import { MultiplySymbol } from '../../../utils/MultiplySymbol';

interface PlaybackRateButtonProps extends ButtonProps {
	playbackRate: number;
	onChangeRate: (newRate: number) => void;
}

export const PlaybackRateButton: FC<PlaybackRateButtonProps> = ({
	playbackRate,
	onChangeRate,
	className,
	color = 'primary',
	variant = 'text',
	...props
}) => {
	const handleClick = () => {
		// Gets the next value of playback rate, otherwise get first one
		const playbackLength = PLAYBACK_RATES.length;
		const currentIndex = PLAYBACK_RATES.findIndex(el => el === playbackRate);
		if (playbackLength === currentIndex) {
			return onChangeRate(PLAYBACK_RATES[0]);
		}
		return onChangeRate(PLAYBACK_RATES[currentIndex + 1]);
	};

	return (
		<Button
			variant={variant}
			color={color}
			onClick={handleClick}
			className={className}
			{...props}
		>
			{playbackRate}
			<span>
				<MultiplySymbol />
			</span>
		</Button>
	);
};
