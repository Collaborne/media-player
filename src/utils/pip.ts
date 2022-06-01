export const canPIP = (): boolean =>
	'pictureInPictureEnabled' in document && document.pictureInPictureEnabled;

export const isInPIP = (): boolean => Boolean(document.pictureInPictureElement);

const supportsOldSafariPIP = () => {
	const video = document.createElement('video');

	return (
		canPIP() &&
		video.webkitSupportsPresentationMode &&
		typeof video.webkitSetPresentationMode === 'function'
	);
};

const supportsModernPIP = () => {
	const video = document.createElement('video');

	return (
		canPIP() &&
		video.requestPictureInPicture &&
		typeof video.requestPictureInPicture === 'function'
	);
};
export const supportsPIP = (): boolean =>
	supportsOldSafariPIP() || supportsModernPIP();

export const openPIP = async (video?: HTMLVideoElement | null) => {
	if (isInPIP()) return;

	if (supportsOldSafariPIP()) {
		// eslint-disable-next-line @typescript-eslint/await-thenable
		await video?.webkitSetPresentationMode('picture-in-picture');
	}
	if (supportsModernPIP()) {
		await video?.requestPictureInPicture();
	}
};

export const closePIP = async (video?: HTMLVideoElement | null) => {
	if (!isInPIP()) {
		return;
	}
	if (supportsOldSafariPIP()) {
		// eslint-disable-next-line @typescript-eslint/await-thenable
		await video?.webkitSetPresentationMode('inline');
	}
	if (supportsModernPIP()) {
		await document?.exitPictureInPicture();
	}
};
