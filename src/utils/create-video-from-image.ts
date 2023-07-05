export function createVideoFromImageURL(imageURL: string) {
	return new Promise((resolve, reject) => {
		const videoDuration = 5; // Duration of the resulting video in seconds
		const frameRate = 30; // Number of frames per second

		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		const videoWidth = 640; // Set the desired width of the resulting video
		const videoHeight = 480; // Set the desired height of the resulting video

		const video = document.createElement('video');
		video.width = videoWidth;
		video.height = videoHeight;

		const image = new Image();
		image.crossOrigin = 'anonymous';
		image.onload = function () {
			canvas.width = videoWidth;
			canvas.height = videoHeight;

			const numFrames = videoDuration * frameRate;
			const frameDuration = 1000 / frameRate;

			const stream = canvas.captureStream(frameRate);
			const chunks: BlobPart[] | undefined = [];

			const mediaRecorder = new MediaRecorder(stream, {
				mimeType: 'video/webm',
			});

			mediaRecorder.ondataavailable = event => {
				if (event.data.size > 0) {
					chunks.push(event.data);
				}
			};

			mediaRecorder.onstop = () => {
				const videoBlob = new Blob(chunks, { type: 'video/webm' });
				const videoURL = URL.createObjectURL(videoBlob);
				resolve(videoURL);
			};

			mediaRecorder.start();

			for (let frame = 0; frame < numFrames; frame++) {
				ctx?.drawImage(
					image,
					0,
					0,
					image.width,
					image.height,
					0,
					0,
					videoWidth,
					videoHeight,
				);

				mediaRecorder.requestData();

				await new Promise(resolve => setTimeout(resolve, frameDuration));
			}

			mediaRecorder.stop();
		};

		image.onerror = reject;
		image.src = imageURL;
	});
}
