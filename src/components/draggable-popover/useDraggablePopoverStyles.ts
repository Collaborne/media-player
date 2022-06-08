import { makeStyles } from '@mui/styles';

interface UseDraggablePopoverStylesProps {
	isExpanded: boolean;
}

export const useDraggablePopoverStyles = makeStyles(theme => ({
	paper: ({ isExpanded }: UseDraggablePopoverStylesProps) => ({
		height: 'fit-content',
		width: isExpanded ? '100%' : 'fit-content',
		display: 'inline-block',
	}),
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
