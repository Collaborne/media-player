import { SliderProps } from '@mui/material/Slider/Slider';
import { FC } from 'react';

import { useVideo } from '../../hooks';
import { PROGRESS_BAR_DIVIDER } from '../../utils/constants';

import { ProgressBarStyled } from './components/ProgressBarStyled';
import { Rail } from './components/Rail';
import { Track } from './components/Track';

interface ProgressBarProps extends SliderProps {}

export const ProgressBar: FC<ProgressBarProps> = props => {
	const { api } = useVideo();

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
		const seekTime =
			(newValue / PROGRESS_BAR_DIVIDER) * (api?.getDuration?.() || 0);
		api?.setCurrentTime?.(seekTime);
	};

	const value = (() => {
		const videoDuration = api?.getDuration?.();
		const currentTime = api?.getCurrentTime?.();

		// Calculate current slider's "rail" value according to total duration
		// and current played time
		if (videoDuration && currentTime) {
			return (currentTime / videoDuration) * PROGRESS_BAR_DIVIDER;
		}
		return 0;
	})();

	return (
		<ProgressBarStyled
			min={0}
			max={PROGRESS_BAR_DIVIDER}
			onChange={onCurrentTimeUpdate}
			value={value}
			components={{ Rail, Track }}
			{...props}
		/>
	);
};
