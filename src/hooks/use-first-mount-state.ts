import { useRef } from 'react';

/**
 * Hook that returns the mounting state of a component (first render = true)
 */

export const useFirstMountState = (): boolean => {
	const isFirst = useRef(true);
	// When we first time mount a component(isFirstRef is true) - we set isFirst ref to false, and return true
	if (isFirst.current) {
		isFirst.current = false;
		return true;
	}
	// Otherwise we return false(the value of our ref)
	return isFirst.current;
};
