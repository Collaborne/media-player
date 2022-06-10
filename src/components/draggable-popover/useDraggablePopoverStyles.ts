import { makeStyles } from '@mui/styles';

interface UseDraggablePopoverStylesProps {
	isExpanded: boolean;
}

export const useDraggablePopoverStyles = makeStyles(theme => ({
	paper: ({ isExpanded }: UseDraggablePopoverStylesProps) => ({
		height: 'fit-content',
		width: isExpanded ? '100%' : 'fit-content',
		display: 'inline-block',
		position: !isExpanded ? 'sticky' : 'initial',
		bottom: theme.spacing(2),
		zIndex: 9999,
	}),
	portalWrapper: ({ isExpanded }: UseDraggablePopoverStylesProps) => ({
		height: isExpanded ? '100%' : '100vh',
		width: isExpanded ? '100%' : '100vw',
		zIndex: isExpanded ? 0 : 9999,
		background: 'transparent',
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
