import { useRef, useEffect, DependencyList } from 'react';

import { EmitterListeners, MediaEvents } from '../types';

export type EventEmittersName = keyof MediaEvents;
export type Handler<T extends EventEmittersName> = (
	eventArgs: MediaEvents[T],
) => void;

/** Media Listener hook that subscribes and unsubscribes from `MediaApi`'s `EventEmitters` */
export const useMediaListener = <T extends EventEmittersName>(
	eventName: T,
	handler: Handler<T>,
	target?: EmitterListeners,
	deps?: DependencyList,
) => {
	const savedHandler = useRef<Handler<T>>();
	useEffect(() => {
		savedHandler.current = handler;
	}, [handler]);
	useEffect(() => {
		const hasMediaApi = target && target.addEventListener;
		if (!hasMediaApi) {
			return;
		}

		const eventListener = (event: MediaEvents[T]) =>
			savedHandler.current?.(event);
		target.addEventListener?.(eventName, eventListener);
		return () => {
			target.removeEventListener?.(eventName, eventListener);
		};
	}, [eventName, target, deps]);
};
