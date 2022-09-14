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
	showPipIcon?: boolean;
	showFullscreenIcon?: boolean;
	showVolume?: boolean;
	showPlaybackRate?: boolean;
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
	const { api, fullScreenApi, controlsConfig } = useVideo();
	const isPip = Boolean(api?.getPictureInPicture?.());
	const isFullscreen = Boolean(fullScreenApi?.isFullscreen);
	const isPlaying = Boolean(api?.getPlaying?.());

	const duration = Number(api?.getDuration?.());
	const relativeTime = Number(api?.getCurrentRelativeTime?.());
	const currentTime = Number(api?.getCurrentTime?.());
	const isFinished = duration > 0 && !isPlaying && relativeTime >= duration;

	const onPlay = () => api?.play?.();
	const onStop = () => api?.pause?.();
	const onRwd = () => api?.setCurrentTime?.(currentTime - SECONDS_TO_SKIP);
	const onFwd = () => api?.setCurrentTime?.(currentTime + SECONDS_TO_SKIP);

	const volume = (Number(api?.getVolume?.()) || 0) * 100;
	const isMuted = Boolean(api?.getMuted?.());
	const playbackRate = api?.getPlaybackRate?.() || 1;

	const onToggleClick = () => {
		if (isMuted) {
			return api?.unmute?.();
		}
		return api?.mute?.();
	};

	const onVolumeChange = (
		event: Event,
		value: number | number[],
		_activeThumb: number,
	) => {
		event.preventDefault();
		if (Array.isArray(value)) {
			return;
		}
		api?.setVolume?.(value / VOLUME_DIVIDER);
	};

	const onSetPlaybackRate = (playbackRate: number) => {
		api?.setPlaybackRate?.(playbackRate);
	};

	const onPip = () => {
		if (isFullscreen) {
			fullScreenApi?.exitFullscreen();
		}
		api?.setHasPipTriggeredByClick?.(true);
		if (isPip) {
			return api?.exitPip?.();
		}
		// Calling with a delay pip => otherwise styles and position for pip are inconsistent
		return setTimeout(() => api?.requestPip?.(), 10);
	};

	const onFullscreen = () => {
		if (isPip) {
			api?.exitPip?.();
		}
		fullScreenApi?.toggleFullscreen();
	};

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
		showFullscreenIcon: controlsConfig?.fullscreen,
		showPipIcon: controlsConfig?.pip,
		showPlaybackRate: controlsConfig?.speed,
		showVolume: controlsConfig?.volume,
	};
};
