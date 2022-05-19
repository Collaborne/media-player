import { MutableRefObject, useRef } from 'react';

/**
 * Hook that returns the latest value avoiding stale/closure problems with async updates
 * https://dmitripavlutin.com/react-hooks-stale-closures/
 * @param {T} value to be "referenced"
 * @returns latest value
 */

export const useLatest = <T>(value: T): MutableRefObject<T> => {
	const ref = useRef<T>(value);
	ref.current = value;
	return ref;
};
