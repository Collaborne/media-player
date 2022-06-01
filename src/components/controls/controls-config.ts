import { ControlsConfig } from '../../types';
import { DEFAULT_EVENT_ANIMATION_DURATION } from '../../utils/constants';

/**
 * Default configuration for controls
 */

export const DEFAULT_CONTROLS_CONFIG: ControlsConfig = {
	bottomControls: true,
	pip: true,
	fullscreen: true,
	volume: true,
	speed: true,
	showVolumeSlider: true,
	alwaysShowConfig: false,
	eventAnimationDurationMs: DEFAULT_EVENT_ANIMATION_DURATION,
};
