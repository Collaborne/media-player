/** Presence of the controls on video player.
 */

export interface ControlsConfig {
	/** Shows action panel on top right side */
	fileActionsPanel?: boolean;
	/** Show bottom control panel */
	bottomControls?: boolean;
	/** Shows pip button in the bottom control panel */
	pip?: boolean;
	/** Shows fullscreen button in the bottom control panel */
	fullscreen?: boolean;
	/** Shows volume controls in the bottom control panel */
	volume?: boolean;
	/** Shows playback rate in the bottom control panel */
	speed?: boolean;
	/** Shows video's progress bar */
	progressBar?: boolean;
	/** Always show action panel on top right side(without hiding) */
	alwaysShowConfig?: boolean;
	/** The duration of play/pause animation events  */
	eventAnimationDurationMs?: number;
}
