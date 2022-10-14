import { findNextConsecutiveIndex } from '../array';

const array = [0, 1, 2, 3, 4, 5];
describe('array', () => {
	it('next consecutive number without delta', () => {
		expect(findNextConsecutiveIndex(array, 2, 0)).toBe(2);
	});
	it('next consecutive number with delta', () => {
		expect(findNextConsecutiveIndex(array, 2, 1)).toBe(1);
	});
	it('no values found', () => {
		expect(findNextConsecutiveIndex(array, 6, 0)).toBe(-1);
	});
});
