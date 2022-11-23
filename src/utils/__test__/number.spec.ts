import { toTwoDigits } from '../number';

describe('toTwoDigits', () => {
	it('round 0(zero) equals to 0(zero)', () => {
		expect(toTwoDigits(0)).toBe(0);
	});
	it('natural number is always same', () => {
		expect(toTwoDigits(2)).toBe(2);
	});
	it('negative integer', () => {
		expect(toTwoDigits(-2.001)).toBe(-2);
		expect(toTwoDigits(-2.006)).toBe(-2.01);
		expect(toTwoDigits(-2.758)).toBe(-2.76);
	});
	it('positive integer', () => {
		expect(toTwoDigits(2.001)).toBe(2);
		expect(toTwoDigits(2.006)).toBe(2.01);
		expect(toTwoDigits(2.758)).toBe(2.76);
	});
});
