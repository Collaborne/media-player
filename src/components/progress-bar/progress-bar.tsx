import { FC } from 'react';

import { SliderProps } from '@mui/material/Slider/Slider';
import { ProgressBarSlider } from './progress-bar.styled';

// TODO: Extend for highlights/tracks
interface ProgressBarProps extends SliderProps {}

export const ProgressBar: FC<ProgressBarProps> = props => {
	return <ProgressBarSlider {...props} />;
};
