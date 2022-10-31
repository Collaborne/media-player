import { Typography, TypographyProps } from '@mui/material';
import { FC } from 'react';

import { useMediaStore } from '../../../context';
import { toTimestamp } from '../../../utils/time';
import { useTimeDisplayStyles } from '../hooks/useTimeDisplayStyles';

interface TimeDisplayProps extends TypographyProps {
	secondsMultiplier?: number;
}
const SECONDS_MULTIPLIER = 1000;

/**
 * @category React Component
 * @category UI Controls
 */
export const TimeDisplay: FC<TimeDisplayProps> = ({
	secondsMultiplier = SECONDS_MULTIPLIER,
	...props
}) => {
	const duration = useMediaStore(state => state.duration);
	const currentTime = useMediaStore(state => state.currentTime);

	const { timeStampText } = useTimeDisplayStyles().classes;

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
