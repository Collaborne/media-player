import { makeStyles } from 'tss-react/mui';

interface UseDraggablePopoverStylesProps {
	isExpanded: boolean;
	isAudio: boolean;
	isPip: boolean;
}

export const useDraggablePopoverStyles =
	makeStyles<UseDraggablePopoverStylesProps>()(
		(theme, { isExpanded, isAudio, isPip }) => ({
			paper: {
				height: '100%',
				width: '100%',
				display: 'inline-flex',
				position: !isExpanded ? 'sticky' : 'initial',
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
				height: isExpanded ? '100%' : `calc(100% - ${theme.spacing(4)})`,
				width: isExpanded ? '100%' : `calc(100% - ${theme.spacing(4)})`,
				zIndex: isExpanded ? 0 : 9999,
				background: 'transparent',
				position: isExpanded ? 'relative' : 'fixed',
				top: isExpanded ? 0 : theme.spacing(2),
				left: isExpanded ? 0 : theme.spacing(2),
				pointerEvents: 'none',
				padding: 0,
				margin: 0,
			},
			resizeSquares: {
				pointerEvents: 'auto',
			},
		}),
	);
