export function dataURLToBlob(dataURL: string) {
	const base64Data = dataURL.split(',')[1];
	const byteString = atob(base64Data);
	const arrayBuffer = new ArrayBuffer(byteString.length);
	const uint8Array = new Uint8Array(arrayBuffer);
	for (let i = 0; i < byteString.length; i++) {
		uint8Array[i] = byteString.charCodeAt(i);
	}
	const blob = new Blob([uint8Array], { type: 'image/png' });
	return blob;
}
