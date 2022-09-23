import { useRef, useEffect } from 'react';

import { VideoApi, VideoEvents } from '../types';

export type EventEmittersName = keyof VideoEvents;
export type Handler<T extends EventEmittersName> = (
	eventArgs: VideoEvents[T],
) => void;

/** Video Listener hook that subscribes and unsubscribes from `VideoApi`'s `EventEmitters` */
export const useVideoListener = <T extends EventEmittersName>(
	eventName: T,
	handler: Handler<T>,
	target?: VideoApi,
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
	}, [eventName, target]);
};
