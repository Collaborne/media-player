import { useRef, useEffect, DependencyList } from 'react';

import { EmitterListeners, MediaEvents } from '../types';

export type EventEmittersName = keyof MediaEvents;
export type Handler<T extends EventEmittersName> = (
	eventArgs: MediaEvents[T],
) => void;

/** Video Listener hook that subscribes and unsubscribes from `VideoApi`'s `EventEmitters` */
export const useVideoListener = <T extends EventEmittersName>(
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
		const hasVideoApi = target && target.addEventListener;
		if (!hasVideoApi) {
			return;
		}
		console.log(target);
		console.log('eventNAme:', eventName);
		const eventListener = (event: MediaEvents[T]) =>
			savedHandler.current?.(event);
		target.addEventListener?.(eventName, eventListener);
		return () => {
			target.removeEventListener?.(eventName, eventListener);
		};
	}, [eventName, target, deps]);
};
