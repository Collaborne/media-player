import { getMediaType } from '../media-type';

const URL = 'qa/projects/1/file.mp4';

describe('media-type', () => {
	it('uses provided media type for audio file', () => {
		const actual = getMediaType({ url: URL, initialMediaType: 'audio/mp4' });
		expect(actual).toBe('audio');
	});

	it('uses provided media type for video file', () => {
		const actual = getMediaType({ url: URL, initialMediaType: 'video/mp4' });
		expect(actual).toBe('video');
	});

	it('uses provided media type for unknown file', () => {
		const actual = getMediaType({ url: URL, initialMediaType: 'text/plain' });
		expect(actual).toBe('unknown');
	});

	it('guesses media type from URL', () => {
		const actual = getMediaType({ url: URL });
		expect(actual).toBe('video');
	});

	it('return unknown for unsupported URL', () => {
		const actual = getMediaType({ url: 'qa/projects/1/file.unsupported' });
		expect(actual).toBe('unknown');
	});

	it('return unknown if no URL is provded', () => {
		const actual = getMediaType({ initialMediaType: 'audio/mp4' });
		expect(actual).toBe('unknown');
	});
});
