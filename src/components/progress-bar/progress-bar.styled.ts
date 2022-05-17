import { Slider } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ProgressBarSlider = styled(Slider)(({ theme }) => ({
	'&.MuiSlider-root': {
		padding: '12px 0 0 0',
	},
	mark: {
		height: '100%',
		background: 'transparent',
		width: '2px',
	},
	'& .MuiSlider-thumb': {
		height: 10,
		width: 10,
		backgroundColor: theme.palette.primary.main,
		marginTop: 5,
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
			boxShadow: '0px 0px 0px 3px rgb(203 1 255 / 16%)',
		},
	},

	'& .MuiSlider-track': {
		height: 6,
		border: 0,
		color: theme.palette.primary.main,
		borderRadius: 0,
		transform: 'unset',
		top: 'unset',
		bottom: 0,
	},
	'& .MuiSlider-rail': {
		bottom: 0,
		height: 6,
		color: theme.palette.grey[300],
		transform: 'unset',
		borderRadius: 0,
		top: 'unset',
	},
}));
