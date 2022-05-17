import { createStyles, makeStyles } from '@mui/styles';

interface ButtonStyles {
	isActive?: boolean;
}

export const useCenteredBottomPlaybackStyles = makeStyles(theme =>
	createStyles({
		wrapper: {
			alignSelf: 'flex-end',
			width: '100%',
			display: 'flex',
			justifyContent: 'center',
		},
		playbackWrapper: {
			padding: ' 0 4px',
			background: 'rgba(0,0,0,0.72)',

			height: '40px',
			borderRadius: '8px 8px 0 0',
			display: 'flex',
			alignItems: 'center',
		},
		timeStampText: {
			fontWeight: 500,
			color: (props: ButtonStyles) =>
				props.isActive ? 'rgba(242,242,242,1)' : theme.palette.grey[300],
		},
	}),
);
