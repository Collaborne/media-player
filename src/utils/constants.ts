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
