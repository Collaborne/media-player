import { styled } from '@mui/material';

export interface TimestampStyledProps {
	isActive: boolean;
}
// Array of props that should not be forwarded to the root node(`span`). https://stackoverflow.com/a/69341672
const IGNORE_PROPS: PropertyKey[] = ['isActive'];

export const TimestampStyled = styled('button', {
	shouldForwardProp: props => !IGNORE_PROPS.includes(props),
})<TimestampStyledProps>(({ theme, isActive = false }) => ({
	background: !isActive ? 'transparent' : theme.palette.primary.main,
	outline: 0,
	border: 0,
	marginRight: theme.spacing(0.25),
	padding: theme.spacing(0.5),
	cursor: 'pointer',
}));
