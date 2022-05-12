import { useRef } from 'react';
import { useFirstMountState } from './use-first-mount-state';
import { strictEquals } from '../utils';

export type Predicate<T> = (prev: T | undefined, next: T) => boolean;
/**
 * Hook, that will update a value, only if the actual value has been changed. Useful when you have a lot of hooks,
 * and you aren't just interested in the previous props version, but want to know the previous distinct value.
 * @param value a value to be checked
 * @param compare optional compare function. by default - strict compare
 * @returns previous distinct value
 */
export default function usePreviousDistinct<T>(
	value: T,
	compare: Predicate<T> = strictEquals,
): T | undefined {
	const prevRef = useRef<T>();
	const curRef = useRef<T>(value);
	const isFirstMount = useFirstMountState();

	if (!isFirstMount && !compare(curRef.current, value)) {
		prevRef.current = curRef.current;
		curRef.current = value;
	}

	return prevRef.current;
}
