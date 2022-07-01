import { DependencyList, EffectCallback, useLayoutEffect, useRef } from 'react';
import {
	BasicTarget,
	getTargetElement,
	TargetType,
	TargetValue,
} from '../utils';
import { useOnUnmount } from '.';
import { hasSameReactDeps } from '../utils/strict-equals';

/**
 * @param effect Callbacks need to be ran in useLayoutEffect
 * @param deps dependencies when to run useEffectLayout hook
 * @param target elements to be "targeted" in useEffectLayout hook
 */
export const useLayoutEffectWithTarget = (
	effect: EffectCallback,
	deps: DependencyList,
	target: BasicTarget<TargetType> | BasicTarget<TargetType>[],
): void => {
	const hasInitRef = useRef(false);

	const lastElementRef = useRef<TargetValue<TargetType>[]>([]);
	const lastDepsRef = useRef<DependencyList>([]);
	const unLoadRef = useRef<ReturnType<EffectCallback>>();

	useLayoutEffect(() => {
		const targets = Array.isArray(target) ? target : [target];
		const els = targets.map(item => getTargetElement(item));

		//  Initializing first run
		if (!hasInitRef.current) {
			hasInitRef.current = true;
			lastElementRef.current = els;
			lastDepsRef.current = deps;

			unLoadRef.current = effect();
			return;
		}

		if (
			els.length !== lastElementRef?.current?.length ||
			!hasSameReactDeps(els, lastElementRef.current) ||
			!hasSameReactDeps(deps, lastDepsRef.current)
		) {
			unLoadRef.current?.();

			lastElementRef.current = els;
			lastDepsRef.current = deps;
			unLoadRef.current = effect();
		}
	});

	useOnUnmount(() => {
		unLoadRef?.current?.();
		hasInitRef.current = false;
	});
};
