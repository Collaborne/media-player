import React, { ComponentPropsWithoutRef } from 'react';

import { TimestampStyled, TimestampStyledProps } from './TimestampStyled';

interface TimestampProps
	extends ComponentPropsWithoutRef<'button'>, TimestampStyledProps {}

export const Timestamp = React.forwardRef<HTMLButtonElement, TimestampProps>(
	(props, ref) => {
		return <TimestampStyled ref={ref} {...props} />;
	},
);
