import { PropsToState, VideoSettersSlice } from '../store/video-store';
import { VideoState } from '../types';

/**
 * HTMLMediaElement typeguard
 */
export const isHTMLMediaElement = (e: unknown): e is HTMLMediaElement =>
	e instanceof HTMLMediaElement;

/**
 * Gets the HTMLMediaElement from a VideoState
 */
export const getVideoEl = (
	state: VideoState & VideoSettersSlice & PropsToState,
): HTMLMediaElement | undefined => {
	const internalPlayer = state?.reactPlayerRef?.current?.getInternalPlayer();

	if (isHTMLMediaElement(internalPlayer)) {
		return internalPlayer;
	}
	return undefined;
};
