import { FC } from 'react';

import { SliderProps } from '@mui/material/Slider/Slider';
import { ProgressBarStyled } from './ProgressBarStyled';

// TODO: Extend for highlights/tracks
interface ProgressBarProps extends SliderProps {}

export const ProgressBar: FC<ProgressBarProps> = props => {
	return <ProgressBarStyled {...props} />;
};
