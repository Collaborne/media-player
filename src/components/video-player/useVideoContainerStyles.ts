import { makeStyles } from 'tss-react/mui';

export const useVideoContainerStyles = makeStyles()(theme => ({
	wrapper: {
		position: 'relative',
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'center',
		backgroundSize: 'cover',
	},
	pipText: {
		// color: theme.palette.contrasts[4],
		margin: theme.spacing(1, 0, 0, 2),
	},
	reactPlayer: {
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
	},
}));

/**
 * A style that simulate video's FileCard sizes used in stories
 * https://github.com/Collaborne/carrot-app-ui/blob/66f02a36cb9182b139a5f701867e8bd8b6ddb9ca/src/components/cards/FileCard.tsx#L148
 * */
export const useFilePlayerStyles = makeStyles()(theme => ({
	wrapper: {
		height: theme.spacing(37.5),
		width: theme.spacing(67.5),
	},
}));
