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
		paperPositioning: {
			display: 'none',
		},
		portalWrapper: {
			height: !isPip ? '100%' : `calc(100% - ${theme.spacing(4)})`,
			width: !isPip ? '100%' : `calc(100% - ${theme.spacing(4)})`,
			zIndex: !isPip ? 0 : 9999,
			background: 'transparent',
			position: !isPip ? 'relative' : 'fixed',
			top: !isPip ? 0 : theme.spacing(2),
			left: !isPip ? 0 : theme.spacing(2),
			pointerEvents: 'none',
			padding: 0,
			margin: 0,
		},
		resizeSquares: {
			pointerEvents: 'auto',
		},
	}));
