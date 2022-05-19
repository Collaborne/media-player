import { DependencyList } from 'react';

export const strictEquals = <T>(prev: T | undefined, next: T) => prev === next;
export const hasSameReactDeps = (
	oldDeps: DependencyList,
	deps: DependencyList,
): boolean => {
	if (oldDeps === deps) return true;
	for (let i = 0; i < oldDeps.length; i++) {
		if (!Object.is(oldDeps[i], deps[i])) {
			return false;
		}
	}
	return true;
};
