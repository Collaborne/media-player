import { EmitterListeners } from './emitters';

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
	requestFullscreen: () => void;
	exitFullscreen: () => void;
	setShowControls: (isUpdated: boolean) => void;
	setShowPipControls: (isUpdated: boolean) => void;
	// Private Methods
	_setReady: () => void;
	_handleProgress: (currentTime: number) => void;
	getListener: () => EmitterListeners;
}
