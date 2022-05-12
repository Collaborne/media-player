import ResizeObserver from 'resize-observer-polyfill';
import { useRafState } from '.';
import { useLayoutEffectWithTarget } from './use-layout-effect-with-target';
import { BasicTarget, getTargetElement } from '../utils';

/**
 * Size of a Element.
 */
export type Size = { width: number; height: number };

/**
 * Hook that observes/tracks/updates size change of an element.
 * @param {BasicTarget} target - DOM element or ref object
 * @returns {Size} Size of the element or undefined
 */

export function useSize(target: BasicTarget): Size | undefined {
	const [state, setState] = useRafState<Size>();

	useLayoutEffectWithTarget(
		() => {
			const el = getTargetElement(target);

			if (!el) {
				return;
			}

			const resizeObserver = new ResizeObserver(entries => {
				entries.forEach(entry => {
					const { clientWidth, clientHeight } = entry.target;
					setState({
						width: clientWidth,
						height: clientHeight,
					});
				});
			});

			resizeObserver.observe(el);
			return () => {
				resizeObserver.disconnect();
			};
		},
		[],
		target,
	);

	return state;
}
