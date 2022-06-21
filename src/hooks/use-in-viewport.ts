import { RefObject, useEffect, useState } from 'react';

interface ExtendedIntersectionObserverInit extends IntersectionObserverInit {
	freezeOnceVisible?: boolean;
}

/**
 * Observe whether the element is in the visible area, and the visible area ratio of the element.
 * @param elementRef - ref element that needs to be observed
 * @param param1 - a object of Native IntersectionObserverInit record and with a freezeOnceVisible key
 * @returns boolean or undefined
 */

export const useInViewport = (
	elementRef: RefObject<Element> | undefined,
	{
		threshold = 0,
		root = null,
		rootMargin = '0%',
		freezeOnceVisible = false,
	}: ExtendedIntersectionObserverInit,
): IntersectionObserverEntry | undefined => {
	const [entry, setEntry] = useState<IntersectionObserverEntry>();

	const frozen = entry?.isIntersecting && freezeOnceVisible;

	const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
		setEntry(entry);
	};

	useEffect(() => {
		if (!elementRef) {
			return;
		}
		const node = elementRef?.current;
		const hasIOSupport = Boolean(window.IntersectionObserver);

		if (!hasIOSupport || frozen || !node) return;

		const observerParams = { threshold, root, rootMargin };
		const observer = new IntersectionObserver(updateEntry, observerParams);

		observer.observe(node);

		return () => observer.disconnect();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [elementRef, JSON.stringify(threshold), root, rootMargin, frozen]);

	return entry;
};
