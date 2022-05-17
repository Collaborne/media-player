import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface PlaybackRateButtonStyled extends ButtonProps {
	isActive?: boolean;
}

export const PlaybackRateButtonStyled = styled(Button, {
	shouldForwardProp: prop => prop !== 'isActive',
})<PlaybackRateButtonStyled>(({ theme, isActive }) => ({
	minWidth: 'unset',
	'&.MuiButton-root:not(:first-of-type)': {
		marginLeft: '12px',
	},
	'&:hover': {
		background: theme.palette.grey[500],
	},
	...(isActive && {
		'&.MuiButton-root': {
			background: theme.palette.grey[400],
		},
	}),
}));
