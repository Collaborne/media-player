import { SliderProps } from '@mui/material';
import React, { FC } from 'react';
import { ProgressBarSlider } from './progress-bar.styled';
import { useProgressBarStyles } from './progress-bar.styles';

// TODO: Extend for highlights/tracks
interface ProgressBarProps extends SliderProps {}

export const ProgressBar: FC<ProgressBarProps> = props => {
	const { wrapper, progressBarWrapper } = useProgressBarStyles();
	return (
		<div className={wrapper}>
			<div className={progressBarWrapper}>
				<ProgressBarSlider {...props} />
			</div>
		</div>
	);
};
