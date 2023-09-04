import { SliderProps } from '@mui/material/Slider/Slider';
import { FC } from 'react';
import { shallow } from 'zustand/shallow';

import { useMediaStore } from '../../context';
import { useIsAudio } from '../../hooks/use-is-audio';
import { PROGRESS_BAR, PROGRESS_BAR_DIVIDER } from '../../utils/constants';
import { toTwoDigits } from '../../utils/number';

import { ProgressBarStyled } from './components/ProgressBarStyled';
import { Rail } from './components/Rail';
import { useProgressBarStyles } from './useProgressBarStyles';

interface ProgressBarProps extends SliderProps {
	className?: string;
	'data-testid'?: string;
}

/** A MUI Slider configured for displaying currentTime/duration values from `MediaStore`
 * @category React Component
 * @category UI Controls
 */
export const ProgressBar: FC<ProgressBarProps> = ({
	className,
	'data-testid': dataTestId = PROGRESS_BAR,
	...props
}) => {
	const isAudio = useIsAudio();
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

	const onCurrentTimeUpdate = (
		e: Event,
		newValue: number | number[],
		_activeThumb: number,
	) => {
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
	);
};
