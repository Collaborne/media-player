import Typography from '@mui/material/Typography';
import { FC, useCallback, useMemo, useState } from 'react';

import { useVideo } from '../../hooks/use-video';
import { PLAYBACK_RATES } from '../../utils/constants';
import { MultiplySymbol } from '../../utils/MultiplySymbol';

import { PlaybackRateButtonStyled } from './components/PlaybackRateButtonStyled';
import { useCenteredBottomPlaybackStyles } from './useCenteredBottomPlaybackStyles';

interface PlayBackButtonProps {
	onChangeRate: (playbackRate: number) => void;
	playbackRate: number;
	active: number;
}

const PlayBackButton: FC<PlayBackButtonProps> = ({
	playbackRate,
	onChangeRate,
	active,
}) => {
	const onClick = useCallback(() => {
		onChangeRate(playbackRate);
	}, [onChangeRate, playbackRate]);

	const isActive = useMemo(
		() => active === playbackRate,
		[active, playbackRate],
	);

	const { playbackRateInner } = useCenteredBottomPlaybackStyles().classes;

	return (
		<PlaybackRateButtonStyled
			isActive={isActive}
			onClick={onClick}
			variant="text"
			color="inherit"
		>
			{/* <Typography variant="body2" className={playbackRateInner}> */}
			{playbackRate}
			<MultiplySymbol />
			{/* </Typography> */}
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
		<div className={wrapper}>
			<div className={playbackWrapper}>
				{PLAYBACK_RATES.map(playbackRate => (
					<PlayBackButton
						key={playbackRate}
						active={activePlaybackRate}
						onChangeRate={onChangePlaybackRate}
						playbackRate={playbackRate}
					/>
				))}
			</div>
		</div>
	);
};
