/** Indicator that split volumes into a high or down meaning */
export const MIN_VOLUME = 50;
export const PLAYBACK_RATES = [1, 1.2, 1.5, 1.7, 2];
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
