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
		height: 12,
		width: 12,
		backgroundColor: '#fff',
		border: '2px solid currentColor',
		marginTop: 5,
		marginLeft: -3,
		'&:focus, &:hover, &$active': {
			boxShadow: 'inherit',
		},

		opacity: 0,
		transition: '.3s opacity ease-out',
	},
	'&:hover .MuiSlider-thumb': {
		opacity: 1,
	},
	active: {},
	valueLabel: {
		left: 'calc(-50% + 4px)',
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
		bottom: 0,
	},
}));
