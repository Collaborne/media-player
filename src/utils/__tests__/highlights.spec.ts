import { Highlight } from '../../types';
import { getRailSegments } from '../highlights';

describe('getRailSegments', () => {
	it('create segments when a highlight has an interval that starts with 0(zero)', () => {
		const highlights: Highlight[] = [
			{
				startTime: 10,
				endTime: 40,
				color: '##fff',
				id: 'highlight-1',
			},
			{
				startTime: 0,
				endTime: 20,
				color: '#f00',
				id: 'highlight-2',
			},
			{
				startTime: 60,
				endTime: 100,
				color: '##f11',
				id: 'highlight-3',
			},
		];
		const segments = [
			{ start: 0, end: 10 },
			{ start: 10, end: 20 },
			{ start: 20, end: 40 },
			{ start: 40, end: 60 },
			{ start: 60, end: 100 },
			{ start: 100, end: 110 },
		];
		expect(getRailSegments(highlights, 110)).toStrictEqual(segments);
	});

	it('create segments when a highlight has an interval that ends at video duration', () => {
		const highlights: Highlight[] = [
			{
				startTime: 20,
				endTime: 30,
				color: '#aaf',
				id: 'highlight-1',
			},
			{
				startTime: 30,
				endTime: 40,
				color: '#ffa',
				id: 'highlight-2',
			},
		];

		const segments = [
			{ start: 0, end: 20 },
			{ start: 20, end: 30 },
			{ start: 30, end: 40 },
		];

		expect(getRailSegments(highlights, 40)).toStrictEqual(segments);
	});

	it('returns no segments if there are no highlights', () => {
		expect(getRailSegments([], 367)).toStrictEqual([]);
	});
});
