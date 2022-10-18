import { toTwoDigits } from '../../../src/utils/number';
import { Transcript } from '../../stories/shared/transcript';

/** A utility tool that is used for building `Transcript[]` until `stopPoint` limiter */
export const createTimestamps = (
	/** Limit to stop or maximum point for creating `Transcript[]` */
	stopPointSeconds: number,
	/** How many intervals should include 1 second */
	secondDivider: number,
): Transcript[] => {
	const result: Transcript[] = [];
	for (let i = 0; i < stopPointSeconds * secondDivider; i++) {
		result.push({
			start: toTwoDigits(i / secondDivider),
			end: toTwoDigits((i + 1) / secondDivider),
			index: i,
		});
	}
	return result;
};
