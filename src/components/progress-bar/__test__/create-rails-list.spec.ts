import { Highlight, Segment } from '../../../types';
import { blend } from '../../../utils/colors';
import { RailStyledProps } from '../components/RailStyled';
import { createRailsList } from '../utils/create-rails-list';

const VIDEO_DURATION = 100;
const COLORS1 = ['#ffa', '#ff1'];
const COLORS2 = ['#aa8', '#aaf'];
const segments: Segment[] = [
	{ start: 0, end: 5 },
	{ start: 5, end: 10 },
	{ start: 10, end: 30 },
	{ start: 30, end: VIDEO_DURATION },
];

const highlights: Highlight[] = [
	{ colors: COLORS1, id: '1', start: 0, end: 10 },
	{ colors: COLORS2, id: '2', start: 5, end: 30 },
];

/* Graphic representation of relation between a Segment and a Highlight in a video of 100s length:
    `s` -> start; `e` -> end ; `/` -> intersection between highlights
    s-----/------e  highlight1
          s------/------e  highlight2
    0 --- 5 --- 10 --- 30 --- 100
 */

const expected: RailStyledProps[] = [
	{
		startPoint: 0,
		width: 5,
		startColorSegment: blend(COLORS1),
		color: blend(COLORS1),
	},
	{
		startPoint: 5,
		width: 5,
		color: blend([...COLORS1, ...COLORS2]),
		startColorSegment: blend(COLORS2),
		endColorSegment: blend(COLORS1),
	},
	{
		startPoint: 10,
		width: 20,
		color: blend(COLORS2),
		endColorSegment: blend(COLORS2),
	},
	{
		startPoint: 30,
		width: 70,
	},
];

describe('create-rails-list', () => {
	it('creates RailsStyled props', () => {
		const railsParams = createRailsList({
			getHighlightColorBlended: blend,
			highlights,
			segments,
			videoDuration: VIDEO_DURATION,
		});
		expect(railsParams).toEqual(expected);
	});
});
