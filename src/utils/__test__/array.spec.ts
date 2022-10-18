import { findNextConsecutiveIndex } from '../array';

const array = [0, 1, 2, 3, 4, 5];
describe('array', () => {
	it('next consecutive number', () => {
		expect(findNextConsecutiveIndex(array, 2)).toBe(2);
	});
	it('throws Error on wrong CHUNK_VALUES', () => {
		expect(() => {
			findNextConsecutiveIndex(array, 2, 0);
		}).toThrow(Error);
	});
	it('no values found', () => {
		expect(findNextConsecutiveIndex(array, 6)).toBe(-1);
	});
});
