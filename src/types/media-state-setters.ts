import { EmitterListeners } from './emitters';
import { MediaType } from './media-type';

/**
 * Setters or "actions" in flux architecture
 * @category MediaStore
 */
export interface MediaStateSetters {
	play: () => void;
	pause: () => void;
	mute: () => void;
	unmute: () => void;
	setPlaybackRate: (playbackRate: number) => void;
	setVolume: (volume: number) => void;
	setCurrentTime: (relativeSeconds: number) => void;
	setHasPipTriggeredByClick: (hasPipTriggeredByClick: boolean) => void;
	setStartTime: (startTime: number) => void;
	setEndTime: (endTime: number) => void;
	setDuration: (duration: number) => void;
	requestPip: () => void;
	exitPip: () => void;
	/** On the hood it uses Fullscreen api: https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API */
	requestFullscreen: () => void;
	/** On the hood it uses Fullscreen api: https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API */
	exitFullscreen: () => void;
	/** Setter for tracking fullscreen state. Do not calls `screenfull` methods */
	setIsFullscreen: (isFullscreen: boolean) => void;
	setShowControls: (isUpdated: boolean) => void;
	setShowPipControls: (isUpdated: boolean) => void;
	// Private Methods
	_setReady: () => void;
	_handleProgress: (currentTime: number) => void;
	/** Store media listeners in a getter won't cause subscribing to a changing value of the store */
	getListener: () => EmitterListeners;
	setMediaType: (type: MediaType) => void;
	setIsAudio: (isAudio: boolean) => void;
	replaceAlarms: (alarms: number[]) => void;
	setIsPipEnabled: (isPipEnabled: boolean) => void;
}
