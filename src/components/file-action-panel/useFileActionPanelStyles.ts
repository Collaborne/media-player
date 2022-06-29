import { makeStyles } from 'tss-react/mui';

interface UseFileActionPanelStylesProps {
	isOpened: boolean;
}

export const useFileActionPanelStyles =
	makeStyles<UseFileActionPanelStylesProps>()((theme, { isOpened }) => ({
		wrapper: {
			background: theme.palette.background.paper,
			pointerEvents: 'auto',
			position: 'absolute',
			top: theme.spacing(2),
			right: 0,
			width: 'fit-content',
			padding: theme.spacing(0.5, 0),
			borderRadius: theme.spacing(0.5, 0, 0, 0.5),
		},
		iconWrapper: {
			justifyContent: 'flex-start',
			width: 'auto',
			overflow: 'hidden',
		},
		textWrapper: {
			overflow: 'hidden',
			padding: isOpened
				? theme.spacing(0.5, 1, 0.5, 0.5)
				: theme.spacing(0, 0, 0, 0.5),
			width: isOpened ? 'auto' : 0,
			transition: 'all 0.5s ease-out',
		},
	}));
