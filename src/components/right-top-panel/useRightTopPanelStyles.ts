import { makeStyles } from '@mui/styles';

interface UseRightTopPanelStylesProps {
	isOpened: boolean;
}

export const useRightTopPanelStyles = makeStyles(theme => ({
	wrapper: {
		background: theme.palette.background.paper,
		pointerEvents: 'auto',
		position: 'absolute',
		top: theme.spacing(2),
		right: 0,
		width: 'fit-content',
		padding: `${theme.spacing(0.5)} 0`,
		borderRadius: `${theme.spacing(0.5)} 0 0 ${theme.spacing(0.5)}`,
	},
	iconWrapper: {
		justifyContent: 'flex-start',
		width: 'auto',
		overflow: 'hidden',
	},
	textWrapper: ({ isOpened }: UseRightTopPanelStylesProps) => ({
		overflow: 'hidden',
		padding: isOpened
			? `${theme.spacing(0.5)} ${theme.spacing(1)} ${theme.spacing(
					0.5,
			  )} ${theme.spacing(0.5)}`
			: `0 0 0 ${theme.spacing(0.5)}`,
		width: isOpened ? 'auto' : 0,
		transition: 'all 0.5s ease-out',
	}),
}));
