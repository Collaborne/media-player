import { createImageFromBlob } from './create-image-from-blob';

interface CreateVideoBlobFromImagesArgs {
	imageBlobs: Blob[];
	durationInSeconds: number;
	frameRate?: number;
}

// Wrap the creation of the canvas element in a promise
const createCanvasPromise = (imageBlobs: Blob[]) =>
	new Promise<HTMLCanvasElement>(resolve => {
		const canvas = document.createElement('canvas');

		// Set canvas dimensions to match the first image dimensions
		const firstImageBlob = imageBlobs[0];

		createImageFromBlob(firstImageBlob)
			.then(firstImage => {
				firstImage.onload = () => {
					canvas.width = firstImage.width;
					canvas.height = firstImage.height;
				};
				return resolve(canvas);
			})
			.catch(console.error);
	});

export async function createVideoBlobFromImages({
	durationInSeconds,
	imageBlobs,
	// 1 frame per 200 seconds
	frameRate = 1 / 200,
}: CreateVideoBlobFromImagesArgs): Promise<Blob> {
	// Create a MediaStream using the canvas
	const canvas = await createCanvasPromise(imageBlobs);
	const stream = canvas.captureStream();
	const ctx = canvas.getContext('2d');
	console.log(ctx);
	// Create a MediaRecorder instance
	const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

	// Array to store video blobs
	const videoBlobs: Blob[] = [];

	// Event handler for each video blob
	mediaRecorder.ondataavailable = event => {
		if (event.data && event.data.size > 0) {
			videoBlobs.push(event.data);
		}
	};

	// Start recording
	mediaRecorder.start();

	// Generator function to control the frame rate
	async function frameGenerator(): Promise<void> {
		const frameDuration = 1 / frameRate;
		const numFrames = Math.ceil(durationInSeconds * frameRate);
		let frame = 0;

		while (frame < numFrames) {
			const imageBlob = imageBlobs[frame % imageBlobs.length];
			const image = await createImageFromBlob(imageBlob);

			// Draw the image onto the canvas
			if (ctx) {
				ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
			}

			// Call requestAnimationFrame to ensure smooth rendering
			await new Promise(resolve => requestAnimationFrame(resolve));

			mediaRecorder.requestData();

			// Wait for the frame duration
			await new Promise(resolve => setTimeout(resolve, frameDuration * 1000));

			frame++;
		}

		// Stop recording after all frames have been processed
		mediaRecorder.stop();
	}

	// Execute the frame generator
	await frameGenerator();

	// Wait for the recording to stop and return the video blob
	return new Promise(resolve => {
		mediaRecorder.onstop = () => {
			console.log(videoBlobs);
			const videoBlob = new Blob(videoBlobs, { type: 'video/mp4' });
			resolve(videoBlob);
		};
	});
}
