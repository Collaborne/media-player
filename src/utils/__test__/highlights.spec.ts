import { getPercentFromDuration } from '../highlights';

describe('getPercentFromDuration', () => {
	it('returns 0% for file without duration', () => {
		expect(getPercentFromDuration(0, 0)).toBe(0);
	});
	it('returns 0% at beginning of file', () => {
		expect(getPercentFromDuration(10, 0)).toBe(0);
	});
	it('returns percentage in middle of file', () => {
		expect(getPercentFromDuration(10, 100)).toBe(10);
	});
	it('returns absolute value if max range is provided', () => {
		expect(getPercentFromDuration(10, 100, 50)).toBe(5);
	});
});
