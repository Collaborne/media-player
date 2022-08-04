import { styled } from '@mui/material';

interface RailStyledProps {
	startPoint?: number;
	width?: number;
	color?: string;
	startColorSegment?: string;
	endColorSegment?: string;
}

export const RailStyled = styled('span', {
	shouldForwardProp: props =>
		props !== 'startPoint' &&
		props !== 'width' &&
		props !== 'color' &&
		props !== 'startColorSegment' &&
		props !== 'endColorSegment',
})<RailStyledProps>(
	({
		theme,
		width = '100',
		startPoint = 0,
		color,
		startColorSegment,
		endColorSegment,
	}) => ({
		display: 'block',
		position: 'absolute',
		backgroundColor: 'currentColor',
		width: `${width}%`,
		bottom: 0,
		height: theme.spacing(0.75),
		background: color ?? theme.palette.common.black,
		left: `${startPoint}%`,
		borderRadius: 0,
		opacity: 1,
		...(startColorSegment && {
			'&:before': {
				position: 'absolute',
				left: 0,
				top: 0,
				display: 'block',
				content: '""',
				height: '100%',
				width: theme.spacing(0.25),
				borderRadius: theme.spacing(0.125),
				background: startColorSegment,
				zIndex: 1,
			},
		}),
		...(endColorSegment && {
			'&:after': {
				position: 'absolute',
				right: 0,
				top: 0,
				display: 'block',
				content: '""',
				height: '100%',
				width: theme.spacing(0.25),
				borderRadius: theme.spacing(0.125),
				background: endColorSegment,
				zIndex: 1,
			},
		}),
	}),
);
