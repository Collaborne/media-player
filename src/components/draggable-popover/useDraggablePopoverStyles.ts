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
		zIndex: 9999,
		pointerEvents: 'auto',
		overflow: 'hidden',
		margin: isExpanded ? 0 : theme.spacing(2),
	}),
	portalWrapper: ({ isExpanded }: UseDraggablePopoverStylesProps) => ({
		height: isExpanded ? 'inherit' : '100vh',
		width: isExpanded ? '100%' : '100vw',
		zIndex: isExpanded ? 0 : 9999,
		background: 'transparent',
		position: isExpanded ? 'relative' : 'fixed',
		top: 0,
		left: 0,
		pointerEvents: 'none',
		padding: isExpanded ? 0 : theme.spacing(2),
		margin: 0,
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
