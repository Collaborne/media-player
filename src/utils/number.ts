/** Rounds a number into a 2 digits number */
export const toTwoDigits = (num: number) => Math.round(num * 100) / 100;

export function findIndexArrayOfConsecutiveNumbers(
	arr: number[],
	num: number,
	delta: number,
) {
	const totalLength = arr.length;
	const CHUNK_VALUE = 2;
	const relativeNum = num - delta;
	if (totalLength <= CHUNK_VALUE) {
		return arr.findIndex(el => el >= relativeNum);
	}
	// get the number of interval by CHUNK_VALUE
	const intervalNr = Math.ceil(totalLength / CHUNK_VALUE);
	// arrChunks = [0,99],[CHUNK_VALUE,99]...
	const arrChunks: [number, number][] = [];
	for (let i = 0; i < intervalNr; i++) {
		arrChunks.push([i * CHUNK_VALUE, (i + 1) * CHUNK_VALUE - 1]);
	}
	// add last chunk of length
	arrChunks.push([intervalNr * CHUNK_VALUE, totalLength]);
	// find the chunk where value belongs
	const arrToSearch = arrChunks.find(
		item => arr[item[0]] <= num && arr[item[1]] >= num,
	);
	if (!arrToSearch) {
		return -1;
	}
	let startIndex = arrToSearch[0];
	const endIndex = arrToSearch[1];

	// Iterate while startIndex does not meets endIndex
	while (startIndex <= endIndex) {
		const element = arr[startIndex];
		const side = element >= relativeNum;
		if (side) {
			return startIndex;
		} else if (!side) {
			startIndex = startIndex + 1;
		}
	}

	return -1;
}
