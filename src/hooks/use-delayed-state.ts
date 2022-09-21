import { useEffect, useState, useRef } from 'react';

/** Set a state with delay */
export const useDelayedState = <T>(
	initialState: T,
): [T, (newSTate: T, delay?: number) => void, VoidFunction] => {
	const [state, setState] = useState<T>(initialState);
	const timeoutRef = useRef<NodeJS.Timeout | null>();

	const setStateAfter = (newState: T, delay = 0) => {
		if (delay === 0 || delay === undefined) {
			setState(newState);
		} else {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			timeoutRef.current = setTimeout(() => {
				setState(newState);
				timeoutRef.current = null;
			}, delay);
		}
	};

	const cancelSetState = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	};

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);
	return [state, setStateAfter, cancelSetState];
};
