import { Typography, TypographyProps } from '@mui/material';
import { FC } from 'react';

import { useVideoStore } from '../../../context';
import { toTimestamp } from '../../../utils/time';
import { useTimeDisplayStyles } from '../hooks/useTimeDisplayStyles';

interface TimeDisplayProps extends TypographyProps {
	secondsMultiplier?: number;
}
const SECONDS_MULTIPLIER = 1000;

export const TimeDisplay: FC<TimeDisplayProps> = ({
	secondsMultiplier = SECONDS_MULTIPLIER,
	...props
}) => {
	const duration = useVideoStore(state => state.duration);
	const currentTime = useVideoStore(state => state.currentTime);

	const { timeStampText } = useTimeDisplayStyles().classes;
	console.log('TimeDisplay rerender');
	return (
		<Typography
			variant="body2"
			className={timeStampText}
			color="inherit"
			{...props}
		>
			{toTimestamp(currentTime * secondsMultiplier)} /{' '}
			{toTimestamp(duration * secondsMultiplier)}
		</Typography>
	);
};
