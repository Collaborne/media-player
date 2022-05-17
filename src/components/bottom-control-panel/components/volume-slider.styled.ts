import { Slider } from '@mui/material';
import { styled } from '@mui/material/styles';

export const VolumeBarStyled = styled(Slider)(({ theme }) => ({
	'&.MuiSlider-root': {
		padding: '0',
		width: '64px',
	},
	mark: {
		height: '100%',
		background: 'transparent',
		width: '2px',
	},
	'& .MuiSlider-thumb': {
		height: 6,
		width: 6,
		backgroundColor: '#fff',
		'&:focus, &:hover, &$active': {
			boxShadow: 'inherit',
		},
	},

	active: {},
	valueLabel: {
		left: 'calc(-50% + 4px)',
	},
	'& .MuiSlider-track': {
		height: 4,
		border: 0,
		color: theme.palette.primary.contrastText,
	},
	'& .MuiSlider-rail': {
		height: 4,
		color: theme.palette.grey[300],
	},
}));
