/** Checks if a `*.mp4` file is audio only */
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
