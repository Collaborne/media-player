import Bowser from 'bowser';

import type { MutableRefObject } from 'react';
type TargetValue<T> = T | undefined | null;

type TargetType = HTMLElement | Element | Window | Document;

export type BasicTarget<T extends TargetType = Element> =
	| (() => TargetValue<T>)
	| TargetValue<T>
	| MutableRefObject<TargetValue<T>>;

// TODO: Check bowser lib for getting any type of browser

export const browser = Bowser.getParser(window.navigator.userAgent);
export const isBrowser = Boolean(browser.getBrowser());

export const getTargetElement = <T extends TargetType>(
	target: BasicTarget<T>,
	defaultElement?: T,
): TargetValue<T> => {
	if (!isBrowser) {
		return undefined;
	}

	if (!target) {
		return defaultElement;
	}

	let targetElement: TargetValue<T>;

	if (typeof target === 'function') {
		targetElement = target();
	} else if ('current' in target) {
		targetElement = target.current;
	} else {
		targetElement = target;
	}

	return targetElement;
};
