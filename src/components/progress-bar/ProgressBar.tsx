import { SliderProps } from '@mui/material/Slider/Slider';
import { FC, useState } from 'react';

import { useMediaStore } from '../../context';
import { useMediaListener } from '../../hooks';
import { useIsAudio } from '../../hooks/use-is-audio';
import { PROGRESS_BAR_DIVIDER } from '../../utils/constants';
import { toTwoDigits } from '../../utils/number';

import { ProgressBarStyled } from './components/ProgressBarStyled';
import { Rail } from './components/Rail';
import { useProgressBarStyles } from './useProgressBarStyles';

interface ProgressBarProps extends SliderProps {
	className?: string;
}

/** A MUI Slider configured for displaying currentTime/duration values from `MediaStore`
 * @category React Component
 * @category UI Controls
 */
export const ProgressBar: FC<ProgressBarProps> = ({ className, ...props }) => {
	const isAudio = useIsAudio();
	const [value, setValue] = useState(0);
	const hasStarted = useMediaStore(state => state.hasPlayedOrSeeked);
	const duration = useMediaStore(state => state.duration);
	const setCurrentTime = useMediaStore(state => state.setCurrentTime);
	const isPip = useMediaStore(state => state.isPip);
	const listener = useMediaStore(state => state.getListener)();

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

	useMediaListener(
		'timeupdate',
		({ duration, seconds }) => {
			if (duration && seconds) {
				// Keep progress value as 0.01, 0.02, 0.03,
				// doing them as 0.0000001, 0.00121121 - you wont feel difference
				return setValue(
					toTwoDigits((seconds / duration) * PROGRESS_BAR_DIVIDER),
				);
			}
			return setValue(0);
		},
		listener,
	);

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
			value={value}
			components={{ Rail }}
			{...props}
		/>
	);
};
