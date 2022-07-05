import { useEffect } from 'react';

import { useLatest } from '.';

/**
 * Hook that executes a function before unmounting a react component
 * @param {function}  fn to be executed
 * @returns {void}
 */

export const useOnUnmount = (fn: () => void): void => {
	if (process.env.NODE_ENV === 'development') {
		if (typeof fn !== 'function') {
			console.error(
				`useUnmount expected parameter is a function, got ${typeof fn}`,
			);
		}
	}

	const fnRef = useLatest(fn);

	useEffect(
		() => () => {
			fnRef.current();
		},
		[fnRef],
	);
};
