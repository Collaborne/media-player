// Helper function to create an Image object from a blob
export async function createImageFromBlob(
	blob: Blob,
): Promise<HTMLImageElement> {
	return new Promise<HTMLImageElement>((resolve, reject) => {
		const image = new Image();
		image.onload = () => resolve(image);
		image.onerror = reject;
		image.src = URL.createObjectURL(blob);
	});
}
