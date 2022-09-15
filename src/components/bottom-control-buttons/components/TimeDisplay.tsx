import { Typography, TypographyProps } from '@mui/material';
import { FC } from 'react';

import { useVideo } from '../../../hooks';
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
	const { api } = useVideo();

	const duration = Number(api?.getDuration?.());
	const currentTime = Number(api?.getCurrentTime?.());

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
