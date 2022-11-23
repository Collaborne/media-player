import { getPercentFromDuration } from '../highlights';

describe('getPercentFromDuration', () => {
	it('percentage with 0 values', () => {
		expect(getPercentFromDuration(0, 0)).toBe(0);
	});
	it('percentage for 0 mediaDuration', () => {
		expect(getPercentFromDuration(10, 0)).toBe(0);
	});
	it('percentage from 100 media duration at 10t', () => {
		expect(getPercentFromDuration(10, 100)).toBe(10);
	});
	it('percentage for a 50 barDivider', () => {
		expect(getPercentFromDuration(10, 100, 50)).toBe(5);
	});
});
