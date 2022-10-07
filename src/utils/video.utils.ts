import { MediaStore } from '../store/video-store';

/**
 * HTMLMediaElement typeguard
 */
export const isHTMLMediaElement = (e: unknown): e is HTMLMediaElement =>
	e instanceof HTMLMediaElement;

/**
 * Gets the HTMLMediaElement from a MediaState
 */
export const getVideoEl = (state: MediaStore): HTMLMediaElement | undefined => {
	const internalPlayer = state?.reactPlayerRef?.current?.getInternalPlayer();

	if (isHTMLMediaElement(internalPlayer)) {
		return internalPlayer;
	}
	return undefined;
};
