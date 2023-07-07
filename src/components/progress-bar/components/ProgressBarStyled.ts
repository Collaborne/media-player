import { Slider, SliderProps, styled } from '@mui/material';
import { StyledComponent } from '@mui/styled-engine';

export const ProgressBarStyled: StyledComponent<SliderProps> = styled(Slider)(
	({ theme }) => ({
		'&.MuiSlider-root': {
			padding: `${theme.spacing(1.5)} 0 0 0`,
			pointerEvents: 'auto',
		},

		'& .MuiSlider-rail': {
			display: 'none',
		},

		'& .MuiSlider-track': {
			backgroundColor: theme.palette.primary,
			position: 'absolute',
			borderRadius: 0,
			border: 0,
			top: 10,
			height: theme.spacing(0.75),
			transform: 'translate(0)',
		},

		'& .MuiSlider-thumb': {
			height: theme.spacing(1.25),
			width: theme.spacing(1.25),
			backgroundColor: theme.palette.primary,
			marginTop: theme.spacing(0.5),
			marginLeft: 0,
			'&:focus, &:hover, &$active': {
				boxShadow: 'inherit',
			},

			opacity: 0,
			zIndex: 1,
		},

		'&:hover .MuiSlider-thumb': {
			opacity: 1,
			'&:hover': {
				boxShadow: `0px 0px 0px ${theme.spacing(0.375)} rgb(203 1 255 / 16%)`,
			},
		},
	}),
);
