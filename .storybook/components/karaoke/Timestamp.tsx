import { ButtonProps } from '@mui/material/Button';
import React from 'react';

import { TimestampStyled, TimestampStyledProps } from './TimestampStyled';

interface TimestampProps extends ButtonProps, TimestampStyledProps {}

export const Timestamp: React.FC<TimestampProps> = React.forwardRef<
	HTMLButtonElement,
	TimestampProps
>((props, ref) => {
	return <TimestampStyled ref={ref} {...props} />;
});
