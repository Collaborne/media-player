import { useRef, useEffect, DependencyList } from 'react';

import { EmitterListeners, VideoEvents } from '../types';

export type EventEmittersName = keyof VideoEvents;
export type Handler<T extends EventEmittersName> = (
	eventArgs: VideoEvents[T],
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
		const eventListener = (event: VideoEvents[T]) =>
			savedHandler.current?.(event);
		target.addEventListener?.(eventName, eventListener);
		return () => {
			target.removeEventListener?.(eventName, eventListener);
		};
	}, [eventName, target, deps]);
};
