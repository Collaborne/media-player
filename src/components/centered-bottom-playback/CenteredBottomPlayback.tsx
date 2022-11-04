import { ButtonProps } from '@mui/material';
import { FC } from 'react';

import { useMediaStore } from '../../context';
import { useIsAudio } from '../../hooks';
import { PLAYBACK_RATES } from '../../utils/constants';
import { MultiplySymbol } from '../../utils/MultiplySymbol';

import { PlaybackRateButtonStyled } from './components/PlaybackRateButtonStyled';
import { useCenteredBottomPlaybackStyles } from './useCenteredBottomPlaybackStyles';

interface PlayBackButtonProps extends ButtonProps {
	onChangeRate: (playbackRate: number) => void;
	playbackRate: number;
	active: number;
}

/**
 * Component shown before a media has started
 * @category React Component
 * @category UI Controls
 */
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

export interface CenteredBottomPlaybackProps {
	className?: string;
}

export const CenteredBottomPlayback: FC<CenteredBottomPlaybackProps> = ({
	className,
}) => {
	const isAudio = useIsAudio();
	const hasStarted = useMediaStore(state => state.hasPlayedOrSeeked);
	const playbackRate = useMediaStore(state => state.playbackRate);
	const setPlaybackRate = useMediaStore(state => state.setPlaybackRate);

	const onChangePlaybackRate = (rate: number) => {
		setPlaybackRate(rate);
	};

	const {
		classes: { wrapper, playbackWrapper },
		cx,
	} = useCenteredBottomPlaybackStyles();

	if (hasStarted || isAudio) {
		return null;
	}

	return (
		<div className={cx(wrapper, className)} data-testid="c-playbackRate">
			<div className={playbackWrapper}>
				{PLAYBACK_RATES.map(item => (
					<PlayBackButton
						key={item}
						active={playbackRate}
						onChangeRate={onChangePlaybackRate}
						playbackRate={item}
						data-testid={`c-playbackRate-${item}`}
					/>
				))}
			</div>
		</div>
	);
};
