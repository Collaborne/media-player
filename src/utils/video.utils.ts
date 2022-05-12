import { VideoState } from '../types/video-state';
import { WebKitHTMLVideoElement } from './pip';

export const getVideoEl = (
	state: VideoState,
): HTMLVideoElement | WebKitHTMLVideoElement =>
	state?.videoRef?.current?.getInternalPlayer();
