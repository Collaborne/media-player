import { render, cleanup, act } from '@testing-library/react';
import '@testing-library/jest-dom';

import { useMediaStore } from '../../../context/MediaProvider';
import { MediaStore } from '../../../store/media-store';
import {
	CENTERED_BOTTOM_PLAYBACK,
	CENTERED_PLAY_BUTTON,
	sleep,
	userEvent,
} from '../../../utils';
import { MediaPlayer } from '../MediaPlayer';

// Start the playback.
global.window.HTMLMediaElement.prototype.play = async function playMock() {
	this.dispatchEvent(new Event('play'));
};
const URL =
	'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';

// A test setup for MediaPlayer, that can access `MediaStore` from `MediaProvider`
const setupMediaPlayer = () => {
	const returnVal = {} as MediaStore;
	function NullComponent() {
		const mediaStore = useMediaStore();
		Object.assign(returnVal, mediaStore);
		return null;
	}
	function TestComponent() {
		return (
			<MediaPlayer url={URL}>
				<NullComponent />
			</MediaPlayer>
		);
	}
	return { ...render(<TestComponent />), mediaStore: returnVal };
};

describe('<MediaPlayer>', () => {
	afterEach(cleanup);
	describe('initialization', () => {
		it('media has not started before', async () => {
			const { getByTestId, mediaStore } = setupMediaPlayer();
			// wait 1 sec to mount state and load initial data
			await act(async () => await sleep(1000));

			const startBtn = getByTestId(CENTERED_PLAY_BUTTON);
			const playbackRateDiv = getByTestId(CENTERED_BOTTOM_PLAYBACK);
			const playbackRate1Btn = getByTestId(`${CENTERED_BOTTOM_PLAYBACK}-1`);

			expect(mediaStore.hasPlayedOrSeeked).toBeFalsy();
			expect(startBtn).toBeInTheDocument();
			expect(playbackRateDiv).toBeInTheDocument();
			expect(playbackRate1Btn).toBeInTheDocument();
			expect(playbackRate1Btn).toHaveAttribute('data-is-active', 'true');
		});
		describe('first time play', () => {
			it('click on <CenteredPlayButton /> start playing', async () => {
				const { getByTestId, mediaStore } = setupMediaPlayer();
				await act(async () => await sleep(1000));
				const startBtn = getByTestId(CENTERED_PLAY_BUTTON);
				const playbackRateDiv = getByTestId(CENTERED_BOTTOM_PLAYBACK);

				await userEvent.click(startBtn);

				expect(startBtn).not.toBeInTheDocument();
				expect(mediaStore.isPlaying).toBeTruthy();
				expect(mediaStore.hasPlayedOrSeeked).toBeTruthy();
				expect(playbackRateDiv).not.toBeInTheDocument();
			});
			it('click on <CenteredBottomPlayback /> do not start playing', async () => {
				const { getByTestId, mediaStore } = setupMediaPlayer();
				await act(async () => await sleep(1000));
				const playbackRate2Btn = getByTestId(`${CENTERED_BOTTOM_PLAYBACK}-2`);

				await userEvent.click(playbackRate2Btn);

				expect(mediaStore.isPlaying).toBeFalsy();
				expect(mediaStore.hasPlayedOrSeeked).toBeFalsy();
				expect(mediaStore.playbackRate).toBe(2);
			});
			it('click on media-player layout start playing and hide <CenteredPlayButton /> and <CenteredPlayButton /> ', async () => {
				const { getByTestId, mediaStore } = setupMediaPlayer();
				await act(async () => await sleep(1000));
				const mediaPlayerDiv = getByTestId('media-player');
				const playbackRateDiv = getByTestId(CENTERED_BOTTOM_PLAYBACK);
				const startBtn = getByTestId(CENTERED_PLAY_BUTTON);

				await userEvent.click(mediaPlayerDiv);

				expect(mediaStore.isPlaying).toBeTruthy();
				expect(mediaStore.hasPlayedOrSeeked).toBeTruthy();
				expect(playbackRateDiv).not.toBeInTheDocument();
				expect(startBtn).not.toBeInTheDocument();
			});
		});
	});
});
