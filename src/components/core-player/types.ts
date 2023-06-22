/**
 * MediaStore initialization state.
 * These values are added only on `MediaStore` was initialized, further updates wont be triggered.
 * */
export interface CorePlayerInitialState {
	/** Autoplay state. Forwarded to ReactPlayer */
	autoPlay: boolean;
}

export const CORE_PLAYER_INITIAL_STATE: CorePlayerInitialState = {
	autoPlay: false,
};
