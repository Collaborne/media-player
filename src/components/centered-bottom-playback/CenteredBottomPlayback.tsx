import { ButtonProps } from '@mui/material';
import { FC, useCallback, useMemo, useState } from 'react';

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
	const onClick = useCallback(() => {
		onChangeRate(playbackRate);
	}, [onChangeRate, playbackRate]);

	const isActive = useMemo(
		() => active === playbackRate,
		[active, playbackRate],
	);

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
	const [activePlaybackRate, setActivePlaybackRate] = useState(
		api?.getPlaybackRate?.() || 1,
	);

	const onChangePlaybackRate = useCallback(
		(rate: number) => {
			setActivePlaybackRate(rate);
			api?.setPlaybackRate?.(rate);
		},
		[api],
	);
	const { wrapper, playbackWrapper } =
		useCenteredBottomPlaybackStyles().classes;

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
