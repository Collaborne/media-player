type WebkitSetPresentationMode = 'picture-in-picture' | 'inline';
export interface WebKitHTMLVideoElement extends HTMLVideoElement {
	webkitPresentationMode: WebkitSetPresentationMode;
	webkitSetPresentationMode: (state: WebkitSetPresentationMode) => void;
	webkitSupportsPresentationMode: boolean;
}
interface PictureInPictureResponse {
	supported: boolean;
	request?: (
		video: WebKitHTMLVideoElement,
	) => Promise<PictureInPictureWindow> | void;
	exit?: (video?: WebKitHTMLVideoElement) => Promise<void> | void;
	isActive?: (video?: WebKitHTMLVideoElement) => boolean;
}

const hasPipWebKit = (
	video: HTMLVideoElement,
): video is WebKitHTMLVideoElement => {
	return (
		typeof (video as WebKitHTMLVideoElement).webkitSetPresentationMode ===
			'function' &&
		(video as WebKitHTMLVideoElement).webkitSupportsPresentationMode
	);
};

const getPip = (): PictureInPictureResponse => {
	if (typeof document === 'undefined') return { supported: false };

	const video = document.createElement('video');

	// Chrome
	// https://developers.google.com/web/updates/2018/10/watch-video-using-picture-in-picture
	if (document.pictureInPictureEnabled && !video.disablePictureInPicture) {
		return {
			supported: true,
			request: video => video.requestPictureInPicture(),

			exit: () => document.exitPictureInPicture(),

			isActive: video => video === document.pictureInPictureElement,
		};
	}
	// Safari
	// https://developer.apple.com/documentation/webkitjs/adding_picture_in_picture_to_your_safari_media_controls
	if (hasPipWebKit(video)) {
		// Mobile safari says it supports webkitPresentationMode, but you can't pip there.
		if (/ipad|iphone/i.test(window.navigator.userAgent)) {
			return { supported: false };
		}
		return {
			supported: true,
			request: video => video.webkitSetPresentationMode('picture-in-picture'),

			exit: video => video?.webkitSetPresentationMode('inline'),

			isActive: video => video?.webkitPresentationMode === 'picture-in-picture',
		};
	}

	// No firefox JS API https://github.com/mozilla/standards-positions/issues/72
	return {
		supported: false,
	};
};

/**
 * A function that returns Picture in Picture current state and methods to call
 * Cross-platform support for Chrome, Mozilla, Safari browsers
 */
const pip = getPip();

export { pip };
