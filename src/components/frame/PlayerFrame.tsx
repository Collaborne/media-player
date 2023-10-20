import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
	playerFrame: {
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.palette.divider,
		// Ensures border width is included in the element's total width and height
		boxSizing: 'border-box',
		// Ensures any interactions like clicks go through this overlay to the underlying elements
		pointerEvents: 'none',
		// Overlay player
		zIndex: 2,
	},
}));

export interface PlayerFrameProps {
	className?: string;
}
/**
 * The frame is overlaying the media. This allows for translucent frames.
 */
export function PlayerFrame({ className }: PlayerFrameProps) {
	const { classes, cx } = useStyles();
	return <div className={cx(className, classes.playerFrame)} />;
}
