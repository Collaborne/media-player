import { Slider, SliderProps, styled } from '@mui/material';
import { StyledComponent } from '@mui/styled-engine';

export const ProgressBarStyled: StyledComponent<SliderProps> = styled(Slider)(
	({ theme }) => ({
		'&.MuiSlider-root': {
			padding: `${theme.spacing(1.5)} 0 0 0`,
			pointerEvents: 'auto',
		},

		'& .MuiSlider-thumb': {
			height: theme.spacing(1.25),
			width: theme.spacing(1.25),
			backgroundColor: theme.palette.primary.main,
			marginTop: theme.spacing(0.625),
			marginLeft: 0,
			'&:focus, &:hover, &$active': {
				boxShadow: 'inherit',
			},

			opacity: 0,
			transition: '.3s opacity ease-out',
		},

		'&:hover .MuiSlider-thumb': {
			opacity: 1,
			'&:hover': {
				boxShadow: `0px 0px 0px ${theme.spacing(0.375)} rgb(203 1 255 / 16%)`,
			},
		},
	}),
);
