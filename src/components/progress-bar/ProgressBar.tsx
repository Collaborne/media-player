import { SliderProps } from '@mui/material/Slider/Slider';
import { FC } from 'react';

import { useVideoStore } from '../../context';
import { PROGRESS_BAR_DIVIDER } from '../../utils/constants';

import { ProgressBarStyled } from './components/ProgressBarStyled';
import { Rail } from './components/Rail';

interface ProgressBarProps extends SliderProps {}

export const ProgressBar: FC<ProgressBarProps> = props => {
	const hasStarted = useVideoStore(state => state.hasPlayedOrSeeked);
	const currentTime = useVideoStore(state => state.currentTime);
	const duration = useVideoStore(state => state.duration);
	const setCurrentTime = useVideoStore(state => state.setCurrentTime);

	const onCurrentTimeUpdate = (
		e: Event,
		newValue: number | number[],
		_activeThumb: number,
	) => {
		e.preventDefault();
		if (Array.isArray(newValue)) {
			return;
		}
		// Get new time according to played time from the total video duration
		const seekTime = (newValue / PROGRESS_BAR_DIVIDER) * duration;
		setCurrentTime?.(seekTime);
	};

	const value = (() => {
		// Calculate current slider's "rail" value according to total duration
		// and current played time
		if (duration && currentTime) {
			return (currentTime / duration) * PROGRESS_BAR_DIVIDER;
		}
		return 0;
	})();
	console.log('ProgressBar rerender');
	if (!hasStarted) {
		return null;
	}
	return (
		<ProgressBarStyled
			min={0}
			max={PROGRESS_BAR_DIVIDER}
			onChange={onCurrentTimeUpdate}
			value={value}
			components={{ Rail }}
			{...props}
		/>
	);
};
