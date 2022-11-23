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
	it('split in 3 chunks', () => {
		expect(findNextConsecutiveIndex(array, 3, 3)).toBe(3);
	});
	it('no values found', () => {
		expect(findNextConsecutiveIndex(array, 6)).toBe(-1);
	});
	it('split in 3 chunks and no found values', () => {
		expect(findNextConsecutiveIndex(array, 6, 3)).toBe(-1);
	});
});
