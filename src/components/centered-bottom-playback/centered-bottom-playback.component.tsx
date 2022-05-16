import { FC, useCallback, useMemo } from 'react';

import { useCenteredBottomPlaybackStyles } from './centered-bottom-playback.styles';
import { StyledPlaybackRateButton } from './playback-rate.button.styled';

interface PlayBackButtonProps {
	onChangeRate: (playbackRate: number) => void;
	playbackRate: number;
	active: number;
}

const PLAYBACK_RATES = [1, 1.2, 1.5, 1.7, 2];

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
	return (
		<StyledPlaybackRateButton
			isActive={isActive}
			onClick={onClick}
			variant="text"
			color="inherit"
		>
			{playbackRate}x
		</StyledPlaybackRateButton>
	);
};

interface CenteredBottomPlaybackProps {
	onChangePlaybackRate: (playbackRate: number) => void;
	activePlaybackRate: number;
}

export const CenteredBottomPlayback: FC<CenteredBottomPlaybackProps> = ({
	onChangePlaybackRate,
	activePlaybackRate,
}) => {
	const { wrapper, playbackWrapper } = useCenteredBottomPlaybackStyles();
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
