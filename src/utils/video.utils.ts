import { VideoState } from '../types';

/**
 * HTMLVideoElement typeguard
 */
export const isHTMLVideoElement = (e: unknown): e is HTMLVideoElement =>
	e instanceof HTMLVideoElement;

/**
 * Gets the HTMLVideoElement from a VideoState
 */
export const getVideoEl = (state: VideoState): HTMLVideoElement => {
	const internalPlayer = state?.videoRef?.current?.getInternalPlayer();

	if (isHTMLVideoElement(internalPlayer)) {
		return internalPlayer;
	}
	throw new Error("Couldn't get the <video> element from ReactPlayer's ref  ");
};
