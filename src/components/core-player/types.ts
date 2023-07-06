/**
 * MediaStore initialization state.
 * These values are added only when `MediaStore` was initialized, further updates wont be triggered.
 * */
export interface CorePlayerInitialState {
	/** Autoplay state. Forwarded to ReactPlayer */
	autoPlay: boolean;
	/** Media duration that will replace "real" media's duration. */
	durationSeconds?: number;
}

export const CORE_PLAYER_INITIAL_STATE: CorePlayerInitialState = {
	autoPlay: false,
	durationSeconds: undefined,
};
