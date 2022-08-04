import { styled } from '@mui/material';

interface TrackStyledProps {
	startPoint?: number;
	width?: number;
	color?: string;
}

export const TrackStyled = styled('span', {
	shouldForwardProp: props =>
		props !== 'startPoint' && props !== 'width' && props !== 'color',
})<TrackStyledProps>(({ theme, width = '100', color, startPoint = '0' }) => ({
	display: 'block',
	position: 'absolute',
	backgroundColor: 'currentColor',
	height: theme.spacing(0.75),
	border: 0,
	background: color || theme.palette.primary.main,
	borderRadius: 0,
	transform: 'unset',
	top: 'unset',
	width: `${width}%`,
	left: `${startPoint}%`,

	bottom: 0,
	transition: theme.transitions.create(['left', 'width', 'bottom', 'height'], {
		duration: theme.transitions.duration.shortest,
	}),
}));
