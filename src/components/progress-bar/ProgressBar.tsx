import { FC, useCallback, useMemo } from 'react';

import { SliderProps } from '@mui/material/Slider/Slider';
import { ProgressBarStyled } from './ProgressBarStyled';
import { useVideo } from '../../hooks';
import { PROGRESS_BAR_DIVIDER } from '../../utils/constants';

// TODO: Extend for highlights/tracks
interface ProgressBarProps extends SliderProps {}

export const ProgressBar: FC<ProgressBarProps> = props => {
	const { api } = useVideo();

	const onCurrentTimeUpdate = useCallback(
		(e: Event, newValue: number | number[], _activeThumb: number) => {
			e.preventDefault();
			if (Array.isArray(newValue)) {
				return;
			}
			// Get new time according to played time from the total video duration
			const seekTime =
				(newValue / PROGRESS_BAR_DIVIDER) * (api?.getDuration?.() || 0);
			api?.setCurrentTime?.(seekTime);
		},
		[api?.setCurrentTime, api?.getDuration],
	);

	const value = useMemo(() => {
		const videoDuration = api?.getDuration?.();
		const currentTime = api?.getCurrentTime?.();

		// Calculate current slider's "rail" value according to total duration
		// and current played time
		if (videoDuration && currentTime) {
			return (currentTime / videoDuration) * PROGRESS_BAR_DIVIDER;
		}
		return 0;
	}, [api?.getDuration, api?.getCurrentTime]);

	return (
		<ProgressBarStyled
			min={0}
			max={PROGRESS_BAR_DIVIDER}
			onChange={onCurrentTimeUpdate}
			value={value}
			{...props}
		/>
	);
};
