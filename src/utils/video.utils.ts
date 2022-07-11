import { VideoState } from '../types';

/**
 * HTMLVideoElement typeguard
 */
export const isHTMLVideoElement = (e: unknown): e is HTMLVideoElement =>
	e instanceof HTMLVideoElement;

/**
 * Gets the HTMLVideoElement from a VideoState
 */
export const getVideoEl = (state: VideoState): HTMLVideoElement | undefined => {
	const internalPlayer = state?.reactPlayerRef?.current?.getInternalPlayer();

	if (isHTMLVideoElement(internalPlayer)) {
		return internalPlayer;
	}
	return undefined;
};
