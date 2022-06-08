export {};
/**
 * Default CSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */
declare module '*.css' {
	const content: { [className: string]: string };
	export default content;
}
declare global {
	interface PictureInPictureResizeEvent extends Event {
		readonly target: PictureInPictureWindow;
	}

	interface PictureInPictureWindow {
		readonly width: number;
		readonly height: number;
		onresize(
			this: PictureInPictureWindow,
			ev: PictureInPictureResizeEvent,
		): void;
		addEventListener(
			type: 'resize',
			listener: EventListenerOrEventListenerObject,
			options?: boolean | AddEventListenerOptions,
		): void;
		removeEventListener(
			type: 'resize',
			listener: EventListenerOrEventListenerObject,
			options?: boolean | EventListenerOptions,
		): void;
	}

	interface PictureInPictureEvent extends Event {
		readonly pictureInPictureWindow: PictureInPictureWindow;
	}

	type PictureInPictureEventListener =
		| ((this: HTMLVideoElement, ev: PictureInPictureEvent) => any)
		| null;

	interface HTMLVideoElement {
		autoPictureInPicture: boolean;
		disablePictureInPicture: boolean;
		requestPictureInPicture(): Promise<PictureInPictureWindow>;
		onenterpictureinpicture: PictureInPictureEventListener;
		onleavepictureinpicture: PictureInPictureEventListener;
		webkitPresentationMode: WebkitSetPresentationMode;
		webkitSetPresentationMode: (state: WebkitSetPresentationMode) => void;
		webkitSupportsPresentationMode: boolean;
	}

	interface Document {
		readonly pictureInPictureEnabled: boolean;
		exitPictureInPicture(): Promise<void>;
	}

	interface DocumentOrShadowRoot {
		readonly pictureInPictureElement: HTMLVideoElement | null;
	}
	type WebkitSetPresentationMode = 'picture-in-picture' | 'inline';
}

// TODO: Fix when deciding to use youtube links
// TS for only video player that plays video files
declare module 'react-player' {
	export default interface ReactPlayer extends ReactPlayer {
		getInternalPlayer(): HTMLVideoElement | null;
	}
}
