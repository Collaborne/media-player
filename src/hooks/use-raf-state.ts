import { useCallback, useRef, useState } from 'react';
import { useOnUnmount } from '.';

/**
 * Update the state only in requestAnimationFrame callback.
 * Generally used for performance optimization.
 * https://layonez.medium.com/performant-animations-with-requestanimationframe-and-react-hooks-99a32c5c9fbf
 * https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 * @param {S} initialState value to initialize state hook
 * @returns {[S, Dispatch<S>]} state and the Dispatch function
 */

export const useRafState = <S>(
	initialState?: S | ((prevState?: S) => S),
): readonly [
	S | undefined,
	(value: S | ((prevState?: S | undefined) => S)) => void,
] => {
	const ref = useRef(0);
	const [state, setState] = useState(initialState);

	const setRafState = useCallback((value: S | ((prevState?: S) => S)) => {
		window.cancelAnimationFrame(ref.current);

		ref.current = window.requestAnimationFrame(() => {
			setState(value);
		});
	}, []);

	useOnUnmount(() => {
		window.cancelAnimationFrame(ref.current);
	});

	return [state, setRafState];
};
