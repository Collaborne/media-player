import { FC, useCallback, useMemo } from 'react';

import { Typography } from '@mui/material';

import { useCenteredBottomPlaybackStyles } from './useCenteredBottomPlaybackStyles';
import { PlaybackRateButtonStyled } from './components/PlaybackRateButtonStyled';
import { PLAYBACK_RATES } from '../../utils/constants';
import { MultiplySymbol } from '../../utils/MultiplySymbol';

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

	const { playbackRateInner } = useCenteredBottomPlaybackStyles();

	return (
		<PlaybackRateButtonStyled
			isActive={isActive}
			onClick={onClick}
			variant="text"
			color="inherit"
		>
			<Typography variant="body2" className={playbackRateInner}>
				{playbackRate}
				<MultiplySymbol />
			</Typography>
		</PlaybackRateButtonStyled>
	);
};

export interface CenteredBottomPlaybackProps {
	onChangePlaybackRate: (playbackRate: number) => void;
	activePlaybackRate: number;
}

export const CenteredBottomPlayback: FC<CenteredBottomPlaybackProps> = ({
	onChangePlaybackRate,
	activePlaybackRate,
}) => {
	const { wrapper, playbackWrapper } = useCenteredBottomPlaybackStyles({});
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
