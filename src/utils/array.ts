/** Find closest higher `number` in a `Array<numbers>` with a delta approximate */
export function findNextConsecutiveIndex(
	arr: number[],
	num: number,
	CHUNK_VALUE = 100,
) {
	if (CHUNK_VALUE <= 0) {
		throw new Error('CHUNK_VALUE should be greater than 0');
	}
	const totalLength = arr.length;

	if (totalLength <= CHUNK_VALUE) {
		return arr.findIndex(el => el >= num);
	}
	// get the number of intervals
	const intervalNr = Math.ceil(totalLength / CHUNK_VALUE);
	// arrChunks = [0,99],[100, 199]...[CHUNK_VALUE*INTERVAL, n]
	const arrChunks: [number, number][] = [];
	for (let i = 0; i < intervalNr - 1; i++) {
		arrChunks.push([i * CHUNK_VALUE, (i + 1) * CHUNK_VALUE - 1]);
	}
	arrChunks.push([(intervalNr - 1) * CHUNK_VALUE, totalLength - 1]);

	// find the chunk where should be searching for
	// sometimes searched number can be at the border of 2 intervals:
	// EX: number 3, in intervals [0,1,2,3] [4,5,6,7], belongs to the [3,4] interval
	// because we look to the next highest value
	const arrToSearch: number[] = [];
	arrChunks.forEach((item, index) => {
		if (arr[item[0]] <= num && arr[item[1]] > num) {
			arrToSearch.push(...item);
		}

		if (
			arr[arrChunks[index][1]] <= num &&
			arr[arrChunks[index + 1][0]] >= num
		) {
			arrToSearch.push(arrChunks[index][1], arrChunks[index + 1][0]);
		}
	});
	if (!arrToSearch) {
		return -1;
	}
	let startIndex = arrToSearch[0];
	const endIndex = arrToSearch[1];

	// Iterate while do not find first element that is bigger than the number
	while (startIndex <= endIndex) {
		const element = arr[startIndex];
		if (element >= num) {
			return startIndex;
		}
		startIndex = startIndex + 1;
	}

	return -1;
}
