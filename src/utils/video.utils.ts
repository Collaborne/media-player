import { VideoState } from '../types/video-state';

export const getVideoEl = (state: VideoState): HTMLVideoElement =>
	state?.videoRef?.current?.getInternalPlayer();
