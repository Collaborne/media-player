import { useOneMSDelayedState, useVideo, useVideoListener } from '.';

interface UsePlayPauseReplayHook {
	isPlaying: boolean;
	isFinished: boolean;
	onPlay: VoidFunction;
	onStop: VoidFunction;
}

export const usePlayPauseReplayHook = (): UsePlayPauseReplayHook => {
	const [isFinished, setIsFinished] = useOneMSDelayedState(false);
	const { api } = useVideo();
	const isPlaying = Boolean(api?.getPlaying?.());
	const hasStarted = api?.getHasPlayedOrSeeked?.();
	const onPlay = () => api?.play?.();
	const onStop = () => api?.pause?.();

	// `end` event is emitted when media playing reached the end of the duration
	useVideoListener(
		'end',
		() => {
			if (!hasStarted) {
				return;
			}
			setIsFinished(true);
		},
		api,
	);

	useVideoListener(
		'play',
		() => {
			setIsFinished(false);
		},
		api,
	);

	return {
		onPlay,
		onStop,
		isFinished,
		isPlaying,
	};
};
