import { useMediaStore } from '../context';

import { useOneMSDelayedState, useMediaListener } from '.';

interface UsePlayPauseReplayHook {
	isPlaying: boolean;
	isFinished: boolean;
	onPlay: VoidFunction;
	onStop: VoidFunction;
}

export const usePlayPauseReplayHook = (): UsePlayPauseReplayHook => {
	const [isFinished, setIsFinished] = useOneMSDelayedState(false);
	const listener = useMediaStore(state => state.getListener());
	const isPlaying = useMediaStore(state => state.playing);
	const hasStarted = useMediaStore(state => state.hasPlayedOrSeeked);
	const onPlay = useMediaStore(state => state.play);
	const onStop = useMediaStore(state => state.pause);

	// `end` event is emitted when media playing reached the end of the duration
	useMediaListener(
		'end',
		() => {
			if (!hasStarted) {
				return;
			}
			setIsFinished(true);
		},
		listener,
	);

	useMediaListener(
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
