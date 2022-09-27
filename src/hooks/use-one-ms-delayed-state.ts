import { useCallback } from 'react';

import { useDelayedState } from './use-delayed-state';

/** Set a state with 1 ms delay */
const DELAY_DURATION = 1;

export const useOneMSDelayedState = <T>(
	initialState: T,
): [T, (newSTate: T) => void, VoidFunction] => {
	const [state, setState, cancelSetState] = useDelayedState<T>(initialState);

	const setStateAfterDelay = useCallback(
		(value: T) => setState(value, DELAY_DURATION),
		[setState],
	);

	return [state, setStateAfterDelay, cancelSetState];
};
