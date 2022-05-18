import { Button, ButtonProps, styled } from '@mui/material';

interface PlaybackRateButtonStyled extends ButtonProps {
	isActive?: boolean;
}

export const PlaybackRateButtonStyled = styled(Button, {
	shouldForwardProp: prop => prop !== 'isActive',
})<PlaybackRateButtonStyled>(({ theme, isActive }) => ({
	minWidth: 'unset',
	'&.MuiButton-root:not(:first-of-type)': {
		marginLeft: theme.spacing(1.5),
	},

	...(isActive && {
		'&.MuiButton-root': {
			background: theme.palette.action.selected,
		},
	}),
}));
