export interface Transcript {
	index: number;
	start: number;
	end: number;
}

enum FIND_PART_STRATEGY {
	NEXT = 'NEXT',
	PREV = 'PREV',
	CLOSEST = 'CLOSEST',
}
// Use binary search to find the word in transcript with [start, end]
// containing the given timestamp.
// @param strategy {string}, one of ['NEXT', 'PREV', 'CLOSEST'], the fallback
// strategy for handling timestamps that do not occur within a spoken part
// - NEXT: for bounding the start of a highlight range
// - PREV: for bounding the end of a highlight range
// - CLOSEST: for any other use
function getMatchingPartToTimestamp(
	transcript: Transcript[],
	timestamp: number,
	strategy = FIND_PART_STRATEGY.CLOSEST,
) {
	let start = 0;
	let end = transcript.length - 1;
	let part: Transcript = { start: 0, index: 0, end: 0 };
	let mid = 0;
	while (start <= end) {
		mid = Math.floor((start + end) / 2);
		part = transcript[mid];

		// If the timestamp falls within this word, return it!
		if (timestamp >= part.start && timestamp < part.end) {
			break;
		} else if (part.start < timestamp) {
			start = mid + 1;
		} else {
			end = mid - 1;
		}
	}

	// We have a direct match, return it
	if (timestamp >= part.start && timestamp < part.end) {
		return part;
	}

	// CLOSEST: calculate the diff between the prev and next word and return the closer one.
	if (strategy === FIND_PART_STRATEGY.CLOSEST) {
		if (timestamp > part.end) {
			const currentDiff = Math.abs(timestamp - part.end);
			const nextPart = transcript[mid + 1];
			if (!nextPart) {
				// at the last word of transcript
				return part;
			}
			const nextDiff = Math.abs(timestamp - nextPart?.start);
			return currentDiff < nextDiff ? part : nextPart;

			// Timestamp before part, check if closer to previous word
		} else if (timestamp < part.start) {
			const currentDiff = Math.abs(timestamp - part.start);
			const prevPart = transcript[mid - 1];
			if (!prevPart) {
				// at the first word of transcript
				return part;
			}
			const prevDiff = Math.abs(timestamp - prevPart?.end);
			return currentDiff < prevDiff ? part : prevPart;
		}
		return part;
	}

	// PREV: return the part that is before the timestamp
	if (strategy === FIND_PART_STRATEGY.PREV) {
		const prevPart = transcript[mid - 1];
		if (timestamp >= part.end) {
			return part;
		}
		return prevPart ?? part;
	}

	// NEXT: return the part that is after the timestamp
	if (strategy === FIND_PART_STRATEGY.NEXT) {
		const nextPart = transcript[mid + 1];
		if (timestamp <= part.start) {
			return part;
		}
		return nextPart ?? part;
	}

	return part;
}

export const findClosestPartToTimestamp = (
	transcript: Transcript[],
	timestamp: number,
) => {
	return getMatchingPartToTimestamp(
		transcript,
		timestamp,
		FIND_PART_STRATEGY.CLOSEST,
	);
};

export const findMatchingPartOrNext = (
	transcript: Transcript[],
	timestamp: number,
) => {
	return getMatchingPartToTimestamp(
		transcript,
		timestamp,
		FIND_PART_STRATEGY.NEXT,
	);
};
