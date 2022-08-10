import debug from 'debug';
import { RefObject, useLayoutEffect } from 'react';
import ReactPlayer from 'react-player';

import { VideoNativeEvent } from '../types/emitters';

const DEBUG_PREFIX = 'video-context';
const log = debug(DEBUG_PREFIX);

interface UseVideoDebugProps {
	reactPlayerRef: RefObject<ReactPlayer>;
}
const LISTEN_TO_NATIVE_ELEMENT = ['play', 'pause'];
const listenToEvents: VideoNativeEvent[] = [
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

const useVideoDebug = ({ reactPlayerRef }: UseVideoDebugProps) => {
	useLayoutEffect(() => {
		if (!debug.enabled(DEBUG_PREFIX)) {
			return;
		}
		const unlisteners: VoidFunction[] = [];

		const initLogging = () => {
			const videoEl = reactPlayerRef.current?.getInternalPlayer();
			if (!videoEl) {
				return;
			}

			// Add logs messages when native `<video>` element events are triggered
			LISTEN_TO_NATIVE_ELEMENT.forEach(key => {
				const nativeMethod = videoEl[key].bind(videoEl);
				videoEl[key] = (...args: unknown[]) => {
					log(`nativeElement.${key}()`, ...args);
					return nativeMethod(...args);
				};
			});

			listenToEvents.forEach(eventName => {
				const onEvent = (event: Event) => {
					log(`nativeElement.on('${eventName}')`, event);
				};
				videoEl.addEventListener(eventName, onEvent);
				unlisteners.push(() => videoEl.removeEventListener(eventName, onEvent));
			});
		};

		// Give 100ms for video element to initialize...
		const timeoutId = setTimeout(initLogging, 100);

		return () => {
			clearTimeout(timeoutId);
			unlisteners.forEach(fn => fn());
		};
	}, [reactPlayerRef]);
};

export default useVideoDebug;
