import { isUrlSupported, isAudio, isVideo } from '../is-url-supported';

const VIDEO_URL =
	'https://example.com/media.mp4?AWSAccessKeyId=XXX&Expires=YYY&Signature=XXX';
const VIDEO_URL2 = 'http://example.com/file.mp4';
const AUDIO_URL =
	'https://example.com/media.mp3?AWSAccessKeyId=XXX&Expires=YYY&Signature=XXX';
const AUDIO_URL2 = 'http://example.com/file.mp3';

const NON_MEDIA_URL =
	'https://example.com/media.doc?AWSAccessKeyId=XXX&Expires=YYY&Signature=XXX';
const NON_MEDIA_URL2 = 'http://example.com/file.doc';

describe('is-url-supported', () => {
	it('isVideo', () => {
		expect(isVideo(VIDEO_URL)).toBeTruthy();
		expect(isVideo(VIDEO_URL2)).toBeTruthy();
		expect(isVideo(AUDIO_URL)).toBeFalsy();
		expect(isVideo(AUDIO_URL2)).toBeFalsy();
		expect(isVideo(NON_MEDIA_URL)).toBeFalsy();
		expect(isVideo(NON_MEDIA_URL2)).toBeFalsy();
	});
	it('isAudio', () => {
		expect(isAudio(VIDEO_URL)).toBeFalsy();
		expect(isAudio(VIDEO_URL2)).toBeFalsy();
		expect(isAudio(AUDIO_URL)).toBeTruthy();
		expect(isAudio(AUDIO_URL2)).toBeTruthy();
		expect(isAudio(NON_MEDIA_URL)).toBeFalsy();
		expect(isAudio(NON_MEDIA_URL2)).toBeFalsy();
	});
	it('isUrlSupported', () => {
		expect(isUrlSupported(VIDEO_URL)).toBeTruthy();
		expect(isUrlSupported(VIDEO_URL2)).toBeTruthy();
		expect(isUrlSupported(AUDIO_URL)).toBeTruthy();
		expect(isUrlSupported(AUDIO_URL2)).toBeTruthy();
		expect(isUrlSupported(NON_MEDIA_URL)).toBeFalsy();
		expect(isUrlSupported(NON_MEDIA_URL2)).toBeFalsy();
	});
});
