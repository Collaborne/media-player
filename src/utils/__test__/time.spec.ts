import { toTimestamp } from '../time';

// multiplier to convert ms to s
const MS_MULTIPLIER = 1000;
const TEN_SECONDS = 10 * MS_MULTIPLIER;
const ONE_MINUTE = 60 * MS_MULTIPLIER;
const ONE_HOUR = 60 * 60 * MS_MULTIPLIER;

describe('toTimeStamp', () => {
	it(`convert 10s`, () => {
		expect(toTimestamp(TEN_SECONDS)).toBe('0:10');
		expect(toTimestamp(TEN_SECONDS, false)).toBe('00:10');
	});
	it(`convert 1min`, () => {
		expect(toTimestamp(ONE_MINUTE)).toBe('1:00');
		expect(toTimestamp(ONE_MINUTE, false)).toBe('01:00');
	});
	it(`convert 1hr`, () => {
		expect(toTimestamp(ONE_HOUR)).toBe('1:00:00');
		expect(toTimestamp(ONE_HOUR, false)).toBe('01:00:00');
	});
	it(`convert 1hr:1min:10s`, () => {
		expect(toTimestamp(ONE_HOUR + ONE_MINUTE + TEN_SECONDS)).toBe('1:01:10');
		expect(toTimestamp(ONE_HOUR + ONE_MINUTE + TEN_SECONDS, false)).toBe(
			'01:01:10',
		);
	});
});
