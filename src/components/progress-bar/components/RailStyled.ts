import { alpha, styled, Theme } from '@mui/material';
import { CSSProperties } from '@mui/styled-engine';

export interface RailStyledProps {
	startPoint?: number;
	width?: number;
	color?: string;
	startColorSegment?: string;
	endColorSegment?: string;
}

// Array of props that should not be forwarded to the root node(`span`). https://stackoverflow.com/a/69341672
const IGNORE_PROPS: PropertyKey[] = [
	'startPoint',
	'width',
	'color',
	'startColorSegment',
	'endColorSegment',
];

const segmentBorderStyles = (
	theme: Theme,
	backgroundColor: string,
): CSSProperties => ({
	position: 'absolute',
	top: 0,
	display: 'block',
	content: '""',
	height: '100%',
	width: theme.spacing(0.25),
	borderRadius: theme.spacing(0.125),
	background: backgroundColor,
	zIndex: 1,
});

export const RailStyled = styled('span', {
	shouldForwardProp: props => !IGNORE_PROPS.includes(props),
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
		width: `${width}%`,
		bottom: 0,
		height: theme.spacing(0.5),
		backgroundColor: color ?? alpha(theme.palette.common.white, 0.2),
		left: `${startPoint}%`,
		zIndex: 1,
		borderLeft: `${theme.spacing(0.125)} solid transparent`,
		borderRight: `${theme.spacing(0.125)} solid transparent`,
		...(startColorSegment && {
			'&:before': {
				left: 0,
				transform: 'translateX(-50%)',
				...segmentBorderStyles(theme, startColorSegment),
			},
		}),
		...(endColorSegment && {
			'&:after': {
				right: 0,
				transform: 'translateX(50%)',
				...segmentBorderStyles(theme, endColorSegment),
			},
		}),
	}),
);
