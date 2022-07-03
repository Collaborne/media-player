import { Slider, SliderProps, styled } from '@mui/material';
import { StyledComponent } from '@mui/styled-engine';

export const VolumeBarStyled: StyledComponent<SliderProps> = styled(Slider)(
	({ theme }) => ({
		'&.MuiSlider-root': {
			padding: 0,
			width: theme.spacing(8),
		},

		'& .MuiSlider-thumb': {
			height: theme.spacing(0.75),
			width: theme.spacing(0.75),
			background: theme.palette.text.secondary,

			'&:focus, &:hover, &$active': {
				boxShadow: 'inherit',
			},
		},

		'& .MuiSlider-track': {
			height: theme.spacing(0.5),
			border: 0,
			background: theme.palette.text.secondary,
		},
		'& .MuiSlider-rail': {
			height: theme.spacing(0.5),
			background: theme.palette.text.disabled,
		},
	}),
);
