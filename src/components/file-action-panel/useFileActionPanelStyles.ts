import { makeStyles } from 'tss-react/mui';

interface UseFileActionPanelStylesProps {
	isOpened: boolean;
}

export const useFileActionPanelStyles =
	makeStyles<UseFileActionPanelStylesProps>()((theme, { isOpened }) => ({
		wrapper: {
			pointerEvents: 'unset',
			position: 'relative',
		},
		gridWrapper: {
			pointerEvents: 'auto',
			background: theme.palette.background.default,
			position: 'absolute',
			top: theme.spacing(2),

			left: `calc(100% - ${theme.spacing(4.5)})`,
			width: 'fit-content',
			padding: theme.spacing(0.5, 0),
			borderRadius: theme.spacing(0.5, 0, 0, 0.5),
			transform: 'all 0.5s ease-out',
			...(isOpened && {
				transform: `translateX(calc(${theme.spacing(4.5)} - 100%))`,
			}),
			transition: 'transform 0.3s ease-out',
		},
		buttonWrapper: {
			justifyContent: 'flex-start',
			padding: theme.spacing(0.5, 1, 0.5, 0.5),
		},
	}));
