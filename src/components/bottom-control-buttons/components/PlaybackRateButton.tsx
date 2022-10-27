import Button, { ButtonProps } from '@mui/material/Button';
import clsx from 'clsx';
import { FC } from 'react';

import { useMediaStore } from '../../../context';
import { useOnHoveredControlElement } from '../../../hooks/use-on-hovered-element';
import { PLAYBACK_RATES } from '../../../utils/constants';
import { MultiplySymbol } from '../../../utils/MultiplySymbol';
import { usePlaybackRateButtonHook } from '../hooks/usePlaybackRateButtonHook';
import { usePlaybackRateStyles } from '../hooks/usePlaybackRateStyles';

interface PlaybackRateButtonProps extends ButtonProps {}

export const PlaybackRateButton: FC<PlaybackRateButtonProps> = ({
	className,
	color = 'primary',
	variant = 'text',
	...props
}) => {
	const [playbackRate, setPlaybackRate] = useMediaStore(state => [
		state.playbackRate,
		state.setPlaybackRate,
	]);
	const { onMouseEnter, onMouseLeave } = useOnHoveredControlElement();
	const { handleClick } = usePlaybackRateButtonHook({
		currentRate: playbackRate,
		setPlaybackRate,
		playbackRates: PLAYBACK_RATES,
	});

	const { playBackRateBtn } = usePlaybackRateStyles().classes;
	const classNames = clsx(playBackRateBtn, className);

	return (
		<Button
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
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
