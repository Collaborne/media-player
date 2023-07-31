import mitt from 'mitt';

import { CORE_PLAYER_INITIAL_STATE } from '../components/core-player/types';
import { MediaStore } from '../store/media-store';
import { MediaStateExternalInitializers, MediaStateSetters } from '../types';
import { MediaEvents } from '../types/emitters';
import { MediaState } from '../types/media-state';

export const NO_OP = () => [];

/** Indicator that split volumes into a high or down meaning */
export const MIN_VOLUME = 50;
/** Playback Rates for media */
export const PLAYBACK_RATES = [1, 1.2, 1.5, 1.7, 2];
/** Period of time(in ms), after which controls are hidden */
export const OVERLAY_HIDE_DELAY = 3000;
export const PROGRESS_BAR_DIVIDER = 100;
export const DEFAULT_EVENT_ANIMATION_DURATION = 300;
export const DEFAULT_PIP_SIZE: Record<'width' | 'height', number> = {
	width: 320,
	height: 180,
};

/** By default volume is a number from [0,1] interval. Multiplier is used to get more simple values  */
export const VOLUME_MULTIPLIER = 100;

/** The time between onProgress callbacks, in milliseconds */
export const PROGRESS_INTERVAL = 50;

/** Seconds that should be skipped when using Forward/Rewind  buttons */
export const SECONDS_TO_SKIP = 10;

// Constants for testing
/** Constant data-testid for `<CenteredPlayButton />` */
export const CENTERED_PLAY_BUTTON = 'CENTERED_PLAY_BUTTON';
/** Constant data-testid for `<CenteredBottomPlayback />` */
export const CENTERED_BOTTOM_PLAYBACK = 'CENTERED_BOTTOM_PLAYBACK';
/** Constant data-testid for `ReactPlayer` */
export const REACT_PLAYER = 'REACT_PLAYER';
/** Constant data-testid for <PlayAnimation/> */
export const PLAY_ANIMATION = 'PLAY_ANIMATION';
/** Constant data-testid for <PauseAnimation/> */
export const PAUSE_ANIMATION = 'PAUSE_ANIMATION';
/** Constant data-testid for <PlayPauseReplay/> */
export const PLAY_PAUSE_REPLAY = 'PLAY_PAUSE_REPLAY';
/** Constant data-testid for <Replay/> Icon */
export const REPLAY_ICON = 'REPLAY_ICON';
/** Constant data-testid for <Pause/> Icon */
export const PAUSE_ICON = 'PAUSE_ICON';
/** Constant data-testid for <Play/> Icon */
export const PLAY_ICON = 'PLAY_ICON';
/** Constant data-testid for <Controls/> */
export const CONTROLS = 'CONTROLS';
/** Constant data-testid for <BottomControlButtons/> */
export const BOTTOM_CONTROL_BUTTONS = 'BOTTOM_CONTROL_BUTTONS';
/** Constant data-testid for <MediaContainer/> */
export const MEDIA_CONTAINER = 'MEDIA_CONTAINER';
/** Constant data-testid for <PictureInPictureButton/> */
export const PIP_BUTTON = 'PIP_BUTTON';
/** Constant data-testid for <ProgressBar/> */
export const PROGRESS_BAR = 'PROGRESS_BAR';
/** Constant data-testid for <DraggablePopover/> */
export const DRAGGABLE_POPOVER = 'DRAGGABLE_POPOVER';
/** Constant data-testid for <FullscreenButton/> */
export const FULLSCREEN_BUTTON = 'FULLSCREEN_BUTTON';

export const DEFAULT_MEDIA_STATE: MediaState = {
	currentTime: 0,
	playbackRate: 1,
	startTime: 0,
	endTime: 0,
	duration: 0,
	volume: 1,
	emitter: mitt<MediaEvents>(),
	ready: false,
	isPlaying: false,
	isMuted: false,
	hasPlayedOrSeeked: false,
	isPip: false,
	hasPipTriggeredByClick: true,
	showControls: true,
	showPipControls: false,
	isFullscreen: false,
	currentTimeAlarm: 0,
	nextTimeAlarm: 0,
};

export const DEFAULT_MEDIA_STATE_SETTERS: MediaStateSetters = {
	play: NO_OP,
	pause: NO_OP,
	mute: NO_OP,
	unmute: NO_OP,
	setPlaybackRate: NO_OP,
	setVolume: NO_OP,
	setCurrentTime: NO_OP,
	setHasPipTriggeredByClick: NO_OP,
	setStartTime: NO_OP,
	setEndTime: NO_OP,
	setDuration: NO_OP,
	requestPip: NO_OP,
	exitPip: NO_OP,
	requestFullscreen: NO_OP,
	exitFullscreen: NO_OP,
	setShowControls: NO_OP,
	setShowPipControls: NO_OP,
	_setReady: NO_OP,
	_handleProgress: NO_OP,
	getListener: () => ({ addEventListener: NO_OP, removeEventListener: NO_OP }),
	setMediaType: NO_OP,
	setIsAudio: NO_OP,
	replaceAlarms: NO_OP,
	setIsPipEnabled: NO_OP,
	setIsFullscreen: NO_OP,
};

export const DEFAULT_EXTERNAL_STATE_SETTERS: MediaStateExternalInitializers = {
	reactPlayerRef: { current: null },
	playPromiseRef: { current: undefined },
	mediaContainerRef: { current: null },
	getHighlightColorBlended: undefined,
	onStoreUpdate: NO_OP,
	alarms: [],
	markActivity: NO_OP,
	/** Store last mouse activity */
	lastActivityRef: { current: 0 },
	/** Marks mouse activity for the PIP player */
	markPipActivity: NO_OP,
	/** Store last mouse activity of the PIP player */
	lastPipActivityRef: { current: 0 },
	mediaType: 'video',
	isAudio: false,
	isPipEnabled: true,
};

export const DEFAULT_MEDIA_STORE_CONTEXT: MediaStore = {
	...DEFAULT_MEDIA_STATE,
	...DEFAULT_MEDIA_STATE_SETTERS,
	...DEFAULT_EXTERNAL_STATE_SETTERS,
	initialState: CORE_PLAYER_INITIAL_STATE,
};
