import { useCallback, useMemo } from 'react';

import { useVideo } from '../../hooks/use-video';

const SECONDS_TO_SKIP = 10;
const VOLUME_DIVIDER = 100;
interface UseBottomControlPanelHook {
	volume: number;
	playbackRate: number;
	duration: number;
	currentTime: number;
	isPlaying: boolean;
	isFinished: boolean;
	isMuted: boolean;
	isFullscreen: boolean;
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
	onToggleClick: VoidFunction;
}
export const useBottomControlPanelHook = (): UseBottomControlPanelHook => {
	const { api, fullScreenApi } = useVideo();
	const isPip = Boolean(api?.getPictureInPicture?.());
	const isFullscreen = Boolean(fullScreenApi?.isFullscreen);

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
		() => api?.setCurrentTime?.(currentTime - SECONDS_TO_SKIP),
		[api?.setCurrentTime, currentTime],
	);
	const onFwd = useCallback(
		() => api?.setCurrentTime?.(currentTime + SECONDS_TO_SKIP),
		[api?.setCurrentTime, currentTime],
	);

	const volume = useMemo(
		() => (Number(api?.getVolume?.()) || 0) * 100,
		[api?.getVolume],
	);
	const isMuted = useMemo(() => Boolean(api?.getMuted?.()), [api?.getMuted]);
	const playbackRate = useMemo(
		() => api?.getPlaybackRate?.() || 1,
		[api?.getPlaybackRate],
	);

	const onToggleClick = useCallback(() => {
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
			api?.setVolume?.(value / VOLUME_DIVIDER);
		},
		[api?.setVolume, volume],
	);

	const onSetPlaybackRate = useCallback(
		(playbackRate: number) => {
			api?.setPlaybackRate?.(playbackRate);
		},
		[api?.setPlaybackRate],
	);

	const onPip = useCallback(async () => {
		if (isFullscreen) {
			await fullScreenApi?.exitFullscreen();
		}
		api?.setHasPipTriggeredByClick?.(true);
		if (isPip) {
			return api?.exitPip?.();
		}
		return api?.requestPip?.();
	}, [isFullscreen, api, isPip, fullScreenApi]);

	const onFullscreen = useCallback(async () => {
		if (isPip) {
			api?.exitPip?.();
		}
		return await fullScreenApi?.toggleFullscreen();
	}, [api, fullScreenApi, isPip]);

	return {
		duration,
		currentTime: relativeTime,
		isFinished,
		volume,
		playbackRate,
		isPlaying,
		isMuted,
		isFullscreen,
		onFullscreen,
		onPip,
		onPlay,
		onStop,
		onRwd,
		onFwd,
		onSetPlaybackRate,
		onVolumeChange,
		onToggleClick,
	};
};
