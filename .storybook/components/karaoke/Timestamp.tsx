import { ButtonProps } from '@mui/material/Button';
import React from 'react';
import { useIntersection } from 'react-use';

import { TimestampStyled, TimestampStyledProps } from './TimestampStyled';

interface TimestampProps extends ButtonProps, TimestampStyledProps {
	onNotInViewport?: VoidFunction;
}

export const Timestamp: React.FC<TimestampProps> = ({
	onNotInViewport,
	...props
}) => {
	const ref = React.useRef<HTMLButtonElement>(null);

	const entry = useIntersection(ref, { root: null, threshold: 0.6 });
	const isVisible = entry?.isIntersecting;
	// isVisible can be undefined, that's why we need check only on falsy value
	if (isVisible === false && props.isActive) {
		ref.current?.scrollIntoView({ behavior: 'smooth' });
		onNotInViewport?.();
	}

	return <TimestampStyled {...props} ref={ref} />;
};
