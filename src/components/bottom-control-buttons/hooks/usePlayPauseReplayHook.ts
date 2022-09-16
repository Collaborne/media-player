import useEventListener from '@use-it/event-listener';
import { useState } from 'react';

import { useVideo } from '../../../hooks';

interface UsePlayPauseReplayHook {
	isPlaying: boolean;
	isFinished: boolean;
	onPlay: VoidFunction;
	onStop: VoidFunction;
}

export const usePlayPauseReplayHook = (): UsePlayPauseReplayHook => {
	const [isFinished, setIsFinished] = useState(false);
	const { api } = useVideo();
	const isPlaying = Boolean(api?.getPlaying?.());
	const hasStarted = api?.getHasPlayedOrSeeked?.();
	const onPlay = () => api?.play?.();
	const onStop = () => api?.pause?.();

	// `end` event is emitted when media playing reached the end of the duration
	useEventListener(
		'end',
		() => {
			if (!hasStarted) {
				return;
			}
			setIsFinished(true);
		},
		api as unknown as HTMLElement,
	);

	return {
		onPlay,
		onStop,
		isFinished,
		isPlaying,
	};
};
