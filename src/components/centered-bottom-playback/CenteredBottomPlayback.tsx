import { ButtonProps } from '@mui/material';
import { FC, useState } from 'react';

import { useVideo } from '../../hooks/use-video';
import { PLAYBACK_RATES } from '../../utils/constants';
import { MultiplySymbol } from '../../utils/MultiplySymbol';

import { PlaybackRateButtonStyled } from './components/PlaybackRateButtonStyled';
import { useCenteredBottomPlaybackStyles } from './useCenteredBottomPlaybackStyles';

interface PlayBackButtonProps extends ButtonProps {
	onChangeRate: (playbackRate: number) => void;
	playbackRate: number;
	active: number;
}

const PlayBackButton: FC<PlayBackButtonProps> = ({
	playbackRate,
	onChangeRate,
	active,
	...props
}) => {
	const onClick = () => {
		onChangeRate(playbackRate);
	};

	const isActive = active === playbackRate;

	return (
		<PlaybackRateButtonStyled
			isActive={isActive}
			onClick={onClick}
			variant="text"
			color="primary"
			size="medium"
			data-is-active={isActive}
			{...props}
		>
			{playbackRate}
			<MultiplySymbol />
		</PlaybackRateButtonStyled>
	);
};

export interface CenteredBottomPlaybackProps {}

export const CenteredBottomPlayback: FC<CenteredBottomPlaybackProps> = () => {
	const { api } = useVideo();
	const hasStarted = api?.getHasPlayedOrSeeked?.();
	const [activePlaybackRate, setActivePlaybackRate] = useState(
		api?.getPlaybackRate?.() || 1,
	);

	const onChangePlaybackRate = (rate: number) => {
		setActivePlaybackRate(rate);
		api?.setPlaybackRate?.(rate);
	};

	const { wrapper, playbackWrapper } =
		useCenteredBottomPlaybackStyles().classes;

	if (hasStarted) {
		return null;
	}

	return (
		<div className={wrapper} data-testid="c-playbackRate">
			<div className={playbackWrapper}>
				{PLAYBACK_RATES.map(playbackRate => (
					<PlayBackButton
						key={playbackRate}
						active={activePlaybackRate}
						onChangeRate={onChangePlaybackRate}
						playbackRate={playbackRate}
						data-testid={`c-playbackRate-${playbackRate}`}
					/>
				))}
			</div>
		</div>
	);
};
