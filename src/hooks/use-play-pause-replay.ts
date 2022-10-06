import { useVideoStore } from '../context';

import { useOneMSDelayedState, useVideoListener } from '.';

interface UsePlayPauseReplayHook {
	isPlaying: boolean;
	isFinished: boolean;
	onPlay: VoidFunction;
	onStop: VoidFunction;
}

export const usePlayPauseReplayHook = (): UsePlayPauseReplayHook => {
	const [isFinished, setIsFinished] = useOneMSDelayedState(false);
	const listener = useVideoStore(state => state.getListener());
	const isPlaying = useVideoStore(state => state.playing);
	const hasStarted = useVideoStore(state => state.hasPlayedOrSeeked);
	const onPlay = useVideoStore(state => state.play);
	const onStop = useVideoStore(state => state.pause);

	// `end` event is emitted when media playing reached the end of the duration
	useVideoListener(
		'end',
		() => {
			if (!hasStarted) {
				return;
			}
			setIsFinished(true);
		},
		listener,
	);

	useVideoListener(
		'play',
		() => {
			setIsFinished(false);
		},
		listener,
	);

	return {
		onPlay,
		onStop,
		isFinished,
		isPlaying,
	};
};
