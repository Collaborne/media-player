/**
 * Presence of the controls on video player.
 */

export interface ControlsConfig {
	bottomControls?: boolean;
	pip?: boolean;
	fullscreen?: boolean;
	volume?: boolean;
	speed?: boolean;
	showVolumeSlider?: boolean;
	alwaysShowConfig?: boolean;
	/**
	 * Duration of the animation when triggered an event (Play/Pause or others)
	 */
	eventAnimationDurationMs?: number;
}
