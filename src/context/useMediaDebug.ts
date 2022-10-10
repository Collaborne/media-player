import debug from 'debug';
import { RefObject, useLayoutEffect } from 'react';
import ReactPlayer from 'react-player';

import { MediaNativeEvent } from '../types/emitters';

const DEBUG_PREFIX = 'media-context';
const log = debug(DEBUG_PREFIX);

interface UseMediaDebugProps {
	reactPlayerRef: RefObject<ReactPlayer>;
}
const LISTEN_TO_NATIVE_ELEMENT = ['play', 'pause'];
const LISTEN_TO_EVENTS: MediaNativeEvent[] = [
	'abort',
	'canplay',
	'canplaythrough',
	'durationchange',
	'ended',
	'error',
	'loadstart',
	'pause',
	'play',
	'playing',
	'seeked',
	'seeking',
	'stalled',
	'suspend',
	'volumechange',
	'waiting',
];

export const useMediaDebug = ({ reactPlayerRef }: UseMediaDebugProps) => {
	useLayoutEffect(() => {
		if (!debug.enabled(DEBUG_PREFIX)) {
			return;
		}
		const unlisteners: VoidFunction[] = [];

		const initLogging = () => {
			const mediaEl = reactPlayerRef.current?.getInternalPlayer();
			if (!mediaEl) {
				return;
			}

			// Add logs messages when native `<media>` element events are triggered
			LISTEN_TO_NATIVE_ELEMENT.forEach(key => {
				const nativeMethod = mediaEl[key].bind(mediaEl);
				mediaEl[key] = (...args: unknown[]) => {
					log(`nativeElement.${key}()`, ...args);
					return nativeMethod(...args);
				};
			});

			LISTEN_TO_EVENTS.forEach(eventName => {
				const onEvent = (event: Event) => {
					log(`nativeElement.on('${eventName}')`, event);
				};
				mediaEl.addEventListener(eventName, onEvent);
				unlisteners.push(() => mediaEl.removeEventListener(eventName, onEvent));
			});
		};

		// Give 100ms for media element to initialize...
		const timeoutId = setTimeout(initLogging, 100);

		return () => {
			clearTimeout(timeoutId);
			unlisteners.forEach(fn => fn());
		};
	}, [reactPlayerRef]);
};
