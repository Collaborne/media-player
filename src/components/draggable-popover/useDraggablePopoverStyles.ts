import { makeStyles } from '@mui/styles';

export const useDraggablePopoverStyles = makeStyles(theme => ({
	paper: {
		height: 'fit-content',
		width: 'fit-content',
	},
	progressBar: {
		position: 'absolute',
		bottom: 0,
		borderRadius: 'unset',

		'& .MuiSlider-thumb': {
			width: theme.spacing(0.75),
			height: theme.spacing(0.75),
		},
	},
}));
