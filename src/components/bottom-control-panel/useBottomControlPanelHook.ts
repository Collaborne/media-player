import { useCallback, useMemo } from 'react';
import { useVideo } from '../../hooks/use-video';

interface UseBottomControlPanelHook {
	volume: number;
	playbackRate: number;
	duration: number;
	currentTime: number;
	isPlaying: boolean;
	isFinished: boolean;
	isMuted: boolean;
	onPlay: VoidFunction;
	onStop: VoidFunction;
	onFwd: VoidFunction;
	onRwd: VoidFunction;
	onVolumeChange: (
		event: Event,
		value: number | number[],
		_activeThumb: number,
	) => void;
	onSetPlaybackRate: (playbackRate: number) => void;
	onPip: VoidFunction;
	onFullscreen: VoidFunction;
	onVolumeClick: VoidFunction;
}
export const useBottomControlPanelHook = (): UseBottomControlPanelHook => {
	const { api } = useVideo();

	const isPlaying = useMemo(
		() => Boolean(api?.getPlaying?.()),
		[api?.getPlaying],
	);
	const duration = useMemo(
		() => Number(api?.getDuration?.()),
		[api?.getDuration],
	);

	const relativeTime = useMemo(
		() => Number(api?.getCurrentRelativeTime?.()),
		[api?.getCurrentRelativeTime],
	);
	const currentTime = useMemo(
		() => Number(api?.getCurrentTime?.()),
		[api?.getCurrentTime],
	);
	const isFinished = useMemo(
		() => duration > 0 && !isPlaying && relativeTime >= duration,
		[duration, isPlaying, relativeTime],
	);

	const onPlay = useCallback(() => api?.play?.(), [api?.play]);
	const onStop = useCallback(() => api?.pause?.(), [api?.pause]);
	const onRwd = useCallback(
		() => api?.setCurrentTime?.(currentTime - 10),
		[api?.setCurrentTime, currentTime],
	);
	const onFwd = useCallback(
		() => api?.setCurrentTime?.(currentTime + 10),
		[api?.setCurrentTime, currentTime],
	);

	const volume = useMemo(
		() => (api?.getVolume?.() || 0) * 100,
		[api?.getVolume],
	);
	const isMuted = useMemo(() => Boolean(api?.getMuted?.()), [api?.getMuted]);
	const playbackRate = useMemo(
		() => api?.getPlaybackRate?.() || 1,
		[api?.getPlaybackRate],
	);

	const onVolumeClick = useCallback(() => {
		if (isMuted) {
			return api?.unmute?.();
		}
		return api?.mute?.();
	}, [api?.mute, api?.unmute, isMuted]);

	const onVolumeChange = useCallback(
		(event: Event, value: number | number[], _activeThumb: number) => {
			event.preventDefault();
			if (Array.isArray(value)) {
				return;
			}
			api?.setVolume?.(value / 100);
		},
		[api?.setVolume, volume],
	);

	const onSetPlaybackRate = useCallback(
		(playbackRate: number) => {
			api?.setPlaybackRate?.(playbackRate);
		},
		[api?.setPlaybackRate],
	);

	const onPip = useCallback(
		() =>
			api?.getPictureInPicture?.() ? api?.exitPip?.() : api?.requestPip?.(),
		[api?.exitPip, api?.requestPip, api?.getPictureInPicture],
	);

	const onFullscreen = useCallback(
		() =>
			api?.getFullscreen?.()
				? api?.exitFullscreen?.()
				: api?.requestFullscreen?.(),
		[api?.getFullscreen, api?.exitFullscreen, api?.requestFullscreen],
	);
	return {
		duration,
		currentTime,
		isFinished,
		volume,
		playbackRate,
		isPlaying,
		isMuted,
		onFullscreen,
		onPip,
		onPlay,
		onStop,
		onRwd,
		onFwd,
		onSetPlaybackRate,
		onVolumeChange,
		onVolumeClick,
	};
};
