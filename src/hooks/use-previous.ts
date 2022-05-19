import { useEffect, useRef } from 'react';

/**
 * A hook that returns previous value of a props/state.
 * https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
 * @param value to be referred
 * @returns previous value
 */
function usePrevious<T>(value: T): T | undefined {
	const ref = useRef<T>();
	useEffect(() => {
		ref.current = value;
	}, [value]);
	return ref.current;
}

export default usePrevious;
