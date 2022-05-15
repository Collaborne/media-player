import Button, { ButtonProps } from '@mui/material/Button/Button';
import { styled } from '@mui/material/styles';

interface StyledPlaybackRateButton extends ButtonProps {
	isActive?: boolean;
}

export const StyledPlaybackRateButton = styled(Button, {
	shouldForwardProp: prop => prop !== 'isActive',
})<StyledPlaybackRateButton>(({ theme, isActive }) => ({
	width: 20,
	'&.MuiButton-root:not(:first-of-type)': {
		marginLeft: '12px',
	},
	...(isActive && {
		'&.MuiButton-root': {
			background: theme.palette.action.selected,
		},
	}),
}));
