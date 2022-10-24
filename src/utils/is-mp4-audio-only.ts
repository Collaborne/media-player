/**
 * Checks if a media file is an audio(mostly `mp4` files needs it).
 * If a file hast *.mp4 extension, that do not means that it's a video, can be an audio only.
 * */
export function isMP4AudioOnly(url: string) {
	return new Promise(function (resolve) {
		const video = document.createElement('video');
		video.preload = 'metadata';
		video.onloadedmetadata = function () {
			resolve(!(video.videoHeight && video.videoWidth));
			video.src = '';
		};
		video.src = url;
	});
}
