import { VideoState } from '../types';

/**
 * Gets the HTMLVideoElement from a VideoState
 */

export const getVideoEl = (state: VideoState): HTMLVideoElement =>
	state?.videoRef?.current?.getInternalPlayer();
