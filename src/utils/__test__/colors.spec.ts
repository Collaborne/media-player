import { hexToRGB, blend } from '../colors';

describe('colors', () => {
	describe('hexToRGB', () => {
		it('default conversion with 4 chars', () => {
			expect(hexToRGB('#000')).toEqual([0, 0, 0]);
		});
		it('default conversion with 7 chars', () => {
			expect(hexToRGB('#123456')).toEqual([18, 52, 86]);
		});
		it('wrong hex format', () => {
			expect(() => hexToRGB('#123456563')).toThrowError();
		});
	});

	describe('blend', () => {
		it('returns undefined if no colors', () => {
			expect(blend([])).toBeUndefined();
		});
		it('default blending of 2 colors', () => {
			expect(blend(['#ff0000', '#0000ff'])).toEqual('#69006982');
		});
		it('with intensify', () => {
			expect(blend(['#ff0000', '#0000ff'], { intensifyIndex: 0 })).toEqual(
				'#95002bb8',
			);

			expect(blend(['#ff0000', '#0000ff'], { intensifyIndex: 1 })).toEqual(
				'#2a0095b8',
			);

			expect(blend(['#ff0000', '#0000ff'], { intensifyAll: true })).toEqual(
				'#490049d6',
			);
		});

		it('with discount factor', () => {
			expect(blend(['#ff0000', '#0000ff'])).toEqual('#69006982');
			expect(
				blend(['#ff0000', '#0000ff'], {
					discountFactor: 0.5,
				}),
			).toEqual('#75007547');
			expect(
				blend(['#ff0000', '#0000ff'], {
					intensifyIndex: 0,
					discountFactor: 0.5,
				}),
			).toEqual('#a1004267');
		});
	});
});
