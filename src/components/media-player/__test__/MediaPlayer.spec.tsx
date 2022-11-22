import { render, cleanup, act } from '@testing-library/react';
import '@testing-library/jest-dom';

import { useMediaStore } from '../../../context/MediaProvider';
import { MediaStore } from '../../../store/media-store';
import {
	BOTTOM_CONTROL_BUTTONS,
	CENTERED_BOTTOM_PLAYBACK,
	CENTERED_PLAY_BUTTON,
	DEFAULT_EVENT_ANIMATION_DURATION,
	MEDIA_CONTAINER,
	OVERLAY_HIDE_DELAY,
	PAUSE_ANIMATION,
	PLAY_ANIMATION,
	PLAY_PAUSE_REPLAY,
	REACT_PLAYER,
	sleep,
	userEvent,
} from '../../../utils';
import { MediaPlayer } from '../MediaPlayer';

// Start the playback.
global.window.HTMLMediaElement.prototype.play = async function playMock() {
	this.dispatchEvent(new Event('play'));
};

// Pause the playback.
global.window.HTMLMediaElement.prototype.pause = async function playMock() {
	this.dispatchEvent(new Event('pause'));
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
			// wait 1 ms to mount state and load initial data
			await act(async () => await sleep(1));

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
				// wait 1 ms to mount state and load initial data
				await act(async () => await sleep(1));

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
				// wait 1 ms to mount state and load initial data
				await act(async () => await sleep(1));

				const playbackRate2Btn = getByTestId(`${CENTERED_BOTTOM_PLAYBACK}-2`);

				await userEvent.click(playbackRate2Btn);

				expect(mediaStore.isPlaying).toBeFalsy();
				expect(mediaStore.hasPlayedOrSeeked).toBeFalsy();
				expect(mediaStore.playbackRate).toBe(2);
			});
			it('click on media-player layout start playing and hide <CenteredPlayButton /> and <CenteredPlayButton /> ', async () => {
				const { getByTestId, mediaStore } = setupMediaPlayer();
				// wait 1 ms to mount state and load initial data
				await act(async () => await sleep(1));

				const mediaPlayerDiv = getByTestId(REACT_PLAYER);
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
	describe('Play/Pause animation on triggered event', () => {
		it('play/pause animation on layout click', async () => {
			const { getByTestId } = setupMediaPlayer();
			// wait 1 ms to mount state and load initial data
			await act(async () => await sleep(1));

			const mediaPlayerDiv = getByTestId(REACT_PLAYER);
			const playEl = getByTestId(PLAY_ANIMATION);
			const pauseEl = getByTestId(PAUSE_ANIMATION);

			// on first time play animation is not shown
			await userEvent.click(mediaPlayerDiv);
			expect(playEl.style.display).toBe('none');

			// run pause animation
			await userEvent.click(mediaPlayerDiv);
			expect(pauseEl.style.display).toBe('block');

			// wait until pause event was finished
			await act(async () => await sleep(DEFAULT_EVENT_ANIMATION_DURATION));
			expect(pauseEl.style.display).toBe('none');

			// run play animation
			await userEvent.click(mediaPlayerDiv);
			expect(playEl.style.display).toBe('block');
			expect(pauseEl.style.display).toBe('none');
		});
		it('play/pause animation on clicking <PlayPauseReplay />', async () => {
			const { getByTestId } = setupMediaPlayer();
			// wait 1 ms to mount state and load initial data
			await act(async () => await sleep(1));

			const startBtn = getByTestId(CENTERED_PLAY_BUTTON);
			const playEl = getByTestId(PLAY_ANIMATION);
			const pauseEl = getByTestId(PAUSE_ANIMATION);

			// on first time play animation is not shown
			await userEvent.click(startBtn);
			expect(playEl.style.display).toBe('none');

			const playPauseReplayBtn = getByTestId(PLAY_PAUSE_REPLAY);
			// run pause animation
			await userEvent.click(playPauseReplayBtn);
			expect(pauseEl.style.display).toBe('block');

			// wait until pause event was finished
			await act(async () => await sleep(DEFAULT_EVENT_ANIMATION_DURATION));
			expect(pauseEl.style.display).toBe('none');

			// run play animation
			await userEvent.click(playPauseReplayBtn);
			expect(playEl.style.display).toBe('block');
			expect(pauseEl.style.display).toBe('none');
		});
	});
	describe('<BottomControls />: hovering player layout', () => {
		it('do not display on first time play', async () => {
			const { getByTestId, queryByTestId } = setupMediaPlayer();
			// wait 1 ms to mount state and load initial data
			await act(async () => await sleep(1));

			const startBtn = getByTestId(CENTERED_PLAY_BUTTON);
			const bottomButtons = queryByTestId(BOTTOM_CONTROL_BUTTONS);
			expect(bottomButtons).not.toBeInTheDocument();

			await userEvent.click(startBtn);
			expect(getByTestId(BOTTOM_CONTROL_BUTTONS)).toBeInTheDocument();
		});
		it('do not display when leaving <MediaContainer />', async () => {
			const { getByTestId, queryByTestId } = setupMediaPlayer();
			// wait 1 ms to mount state and load initial data
			await act(async () => await sleep(1));

			const startBtn = getByTestId(CENTERED_PLAY_BUTTON);

			await userEvent.click(startBtn);
			expect(queryByTestId(BOTTOM_CONTROL_BUTTONS)).toBeInTheDocument();

			await userEvent.unhover(getByTestId(MEDIA_CONTAINER));
			expect(queryByTestId(BOTTOM_CONTROL_BUTTONS)).not.toBeInTheDocument();
		});
		it(`do not display after ${OVERLAY_HIDE_DELAY}ms on hovered <MediaContainer /> layout`, async () => {
			const { getByTestId, queryByTestId } = setupMediaPlayer();
			// wait 1 ms to mount state and load initial data
			await act(async () => await sleep(1));

			const startBtn = getByTestId(CENTERED_PLAY_BUTTON);

			await userEvent.click(startBtn);
			expect(queryByTestId(BOTTOM_CONTROL_BUTTONS)).toBeInTheDocument();

			await userEvent.hover(getByTestId(MEDIA_CONTAINER));
			expect(queryByTestId(BOTTOM_CONTROL_BUTTONS)).toBeInTheDocument();
			// because onMouseEvent is throttled, overlay can be hidden for a +-1sec
			await act(async () => await sleep(OVERLAY_HIDE_DELAY + 1000));
			expect(queryByTestId(BOTTOM_CONTROL_BUTTONS)).not.toBeInTheDocument();
		});
	});
});
