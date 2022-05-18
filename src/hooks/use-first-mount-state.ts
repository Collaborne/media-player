import { useRef } from 'react';

/**
 * Hook that returns the mounting state of a component (first render = true)
 */

export const useFirstMountState = (): boolean => {
	const isFirst = useRef(true);

	if (isFirst.current) {
		isFirst.current = false;
		return true;
	}

	return isFirst.current;
};
