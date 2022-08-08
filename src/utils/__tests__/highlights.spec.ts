import { Highlight } from '../../types';
import { getRailSegments } from '../highlights';

const highlightsWithZero: Highlight[] = [
	{
		startTime: 11,
		endTime: 367,
		color: '#EA99FF',
		id: '24624b3c-6393-4fdb-bec1-60488dca292d',
	},
	{
		startTime: 22,
		endTime: 125,
		color: '#FF6347',
		id: '6a943ccc-7248-41c5-b1c9-960f73c77f51',
	},
	{
		startTime: 45,
		endTime: 55,
		color: '#FF6347',
		id: '6d92a898-2304-482d-a99f-7da0ac9a8a32',
	},
	{
		startTime: 29,
		endTime: 152,
		color: '#08E8E8',
		id: 'ac4ac051-1bad-4b74-9176-15e2be785771',
	},
	{
		startTime: 0,
		endTime: 2,
		color: '#C67FE8',
		id: 'f29ed425-2233-4672-82af-3fa154548b3f',
	},
	{
		startTime: 260,
		endTime: 277,
		color: '#F5AB35',
		id: '6a18c1ae-d1a5-4c2c-8211-a1363cb40141',
	},
];

const railSegmentsWithZero = [
	[0, 2],
	[2, 11],
	[11, 22],
	[22, 29],
	[29, 45],
	[45, 55],
	[55, 125],
	[125, 152],
	[152, 260],
	[260, 277],
	[277, 367],
	[367, 400],
];
const highlightsWithMaximumDuration: Highlight[] = [
	{
		startTime: 11,
		endTime: 367,
		color: '#EA99FF',
		id: '24624b3c-6393-4fdb-bec1-60488dca292d',
	},
	{
		startTime: 260,
		endTime: 277,
		color: '#F5AB35',
		id: '6a18c1ae-d1a5-4c2c-8211-a1363cb40141',
	},
];

const railWithMaximumDuration = [
	[0, 11],
	[11, 260],
	[260, 277],
	[277, 367],
];

describe('getRailSegments', () => {
	it('highlights have startTime equals to 0(zero)', () => {
		expect(getRailSegments(highlightsWithZero, 400)).toStrictEqual(
			railSegmentsWithZero,
		);
	});
	it('highlights have endTime equals to maximumDuration', () => {
		expect(getRailSegments(highlightsWithMaximumDuration, 367)).toStrictEqual(
			railWithMaximumDuration,
		);
	});
	it('highlights are empty array', () => {
		expect(getRailSegments([], 367)).toStrictEqual([]);
	});
});
