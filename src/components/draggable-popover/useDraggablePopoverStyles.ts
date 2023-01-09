import { makeStyles } from 'tss-react/mui';

interface UseDraggablePopoverStylesProps {
	isAudio: boolean;
	isPip: boolean;
}

export const useDraggablePopoverStyles =
	makeStyles<UseDraggablePopoverStylesProps>()((theme, { isAudio, isPip }) => ({
		paper: {
			height: '100%',
			width: '100%',
			display: 'inline-flex',
			position: isPip ? 'sticky' : 'initial',
			zIndex: 9999,
			pointerEvents: 'auto',
			overflow: 'inherit',
			margin: 0,
			background: 'unset',

			// Styles for audio files
			...(isAudio && {
				background: 'transparent',
				borderRadius: theme.spacing(0.5, 0.5, 0, 0),
			}),
			...(isAudio &&
				isPip && {
					borderRadius: theme.spacing(0.5),
				}),
		},

		portalWrapper: {
			height: '100%',
			width: '100%',
			zIndex: !isPip ? 0 : 9999,
			background: 'transparent',
			position: 'relative',
			top: 0,
			left: 0,
			pointerEvents: 'none',
			padding: 0,
			margin: 0,
		},
		resizeSquares: {
			pointerEvents: 'auto',
		},
	}));
