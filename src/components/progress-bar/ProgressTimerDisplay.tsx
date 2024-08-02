import { Grid, Typography } from '@mui/material';
import { SliderProps } from '@mui/material/Slider/Slider';
import { FC } from 'react';
import { shallow } from 'zustand/shallow';

import { useMediaStore } from '../../context';
import { useIsAudio } from '../../hooks/use-is-audio';
import { toTimestamp } from '../../utils';
import { PROGRESS_BAR, PROGRESS_BAR_DIVIDER } from '../../utils/constants';
import { toTwoDigits } from '../../utils/number';
import { useTimeDisplayStyles } from '../bottom-control-buttons/hooks/useTimeDisplayStyles';

import { ProgressBarStyled } from './components/ProgressBarStyled';
import { Rail } from './components/Rail';
import { useProgressBarStyles } from './useProgressBarStyles';

interface ProgressTimerDisplayProps extends SliderProps {
	className?: string;
	'data-testid'?: string;
}

const SECONDS_MULTIPLIER = 1000;

/** A MUI Slider configured for displaying currentTime/duration values from `MediaStore`
 * @category React Component
 * @category UI Controls
 */
export const ProgressTimerDisplay: FC<ProgressTimerDisplayProps> = ({
	className,
	'data-testid': dataTestId = PROGRESS_BAR,
	...props
}) => {
	const isAudio = useIsAudio();
	const {
		classes: { timeStampText },
	} = useTimeDisplayStyles();

	const [hasStarted, duration, setCurrentTime, isPip, currentTime] =
		useMediaStore(
			state => [
				state.hasPlayedOrSeeked,
				state.duration,
				state.setCurrentTime,
				state.isPip,
				state.currentTime,
			],
			shallow,
		);

	const onCurrentTimeUpdate = (e: Event, newValue: number | number[]) => {
		e.preventDefault();
		if (Array.isArray(newValue)) {
			return;
		}
		// Get new time according to played time from the total media duration
		const seekTime = (newValue / PROGRESS_BAR_DIVIDER) * duration;
		setCurrentTime(seekTime);
	};

	const {
		classes: { progressBar },
		cx,
	} = useProgressBarStyles({ isAudio, isPip });

	if (!hasStarted && !isAudio) {
		return null;
	}

	return (
		<Grid
			container
			direction="row"
			flexWrap="nowrap"
			alignItems="center"
			gap={1}
			sx={{ marginBottom: 0.5 }}
		>
			<Typography className={timeStampText} variant="body2" color="inherit">
				{toTimestamp(currentTime * SECONDS_MULTIPLIER)}
			</Typography>
			<ProgressBarStyled
				className={cx(progressBar, className)}
				min={0}
				max={PROGRESS_BAR_DIVIDER}
				onChange={onCurrentTimeUpdate}
				value={toTwoDigits((currentTime / duration) * PROGRESS_BAR_DIVIDER)}
				components={{ Rail }}
				data-testid={dataTestId}
				{...props}
			/>

			<Typography className={timeStampText} variant="body2" color="inherit">
				{toTimestamp(duration * SECONDS_MULTIPLIER)}
			</Typography>
		</Grid>
	);
};
