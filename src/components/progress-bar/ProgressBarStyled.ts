import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

export const ProgressBarStyled = styled(Slider)(({ theme }) => ({
	'&.MuiSlider-root': {
		padding: `${theme.spacing(1.5)} 0 0 0`,
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

	'& .MuiSlider-track': {
		height: theme.spacing(0.75),
		border: 0,
		color: theme.palette.primary.main,
		borderRadius: 0,
		transform: 'unset',
		top: 'unset',
		bottom: 0,
	},
	'& .MuiSlider-rail': {
		bottom: 0,
		height: theme.spacing(0.75),
		color: theme.palette.grey[300],
		transform: 'unset',
		borderRadius: 0,
		top: 'unset',
	},
}));
