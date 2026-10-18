import { Button, ButtonProps } from '@mui/material';
import { FC } from 'react';
import { shallow } from 'zustand/shallow';

import { useMediaStore } from '../../../context/index.js';
import { useOnHoveredControlElement } from '../../../hooks/use-on-hovered-element.js';
import { PLAYBACK_RATES } from '../../../utils/constants.js';
import { MultiplySymbol } from '../../../utils/MultiplySymbol.js';
import { usePlaybackRateButtonHook } from '../hooks/usePlaybackRateButtonHook.js';
import { usePlaybackRateStyles } from '../hooks/usePlaybackRateStyles.js';

type PlaybackRateButtonProps = ButtonProps;

/**
 * @category React Component
 * @category UI Controls
 */
export const PlaybackRateButton: FC<PlaybackRateButtonProps> = ({
	className,
	color = 'primary',
	variant = 'text',
	...props
}) => {
	const [playbackRate, setPlaybackRate] = useMediaStore(
		state => [state.playbackRate, state.setPlaybackRate],
		shallow,
	);
	const { onMouseEnter, onMouseLeave } = useOnHoveredControlElement();
	const { handleClick } = usePlaybackRateButtonHook({
		currentRate: playbackRate,
		setPlaybackRate,
		playbackRates: PLAYBACK_RATES,
	});

	const { classes, cx } = usePlaybackRateStyles();
	const classNames = cx(classes.playBackRateBtn, className);

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
