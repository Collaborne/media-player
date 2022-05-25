import { FC, useCallback, useMemo } from 'react';

import { SliderProps } from '@mui/material/Slider/Slider';
import { ProgressBarStyled } from './ProgressBarStyled';
import { useVideo } from '../../hooks';

// TODO: Extend for highlights/tracks
interface ProgressBarProps extends SliderProps {}

export const ProgressBar: FC<ProgressBarProps> = props => {
	const { api } = useVideo();

	const onVolumeChangeHandler = useCallback(
		(e: Event, newValue: number | number[], _activeThumb: number) => {
			e.preventDefault();
			if (Array.isArray(newValue)) {
				return;
			}
			const timeForJump = (newValue / 100) * (api?.getDuration?.() || 0);
			api?.setCurrentTime?.(timeForJump);
		},
		[api?.setCurrentTime, api?.getDuration],
	);

	const value = useMemo(() => {
		const videoDuration = api?.getDuration?.();
		const currentTime = api?.getCurrentTime?.();
		if (videoDuration && currentTime) {
			return (currentTime / videoDuration) * 100;
		}
		return 0;
	}, [api?.getDuration, api?.getCurrentTime]);

	return (
		<ProgressBarStyled
			onChange={onVolumeChangeHandler}
			value={value}
			{...props}
		/>
	);
};
