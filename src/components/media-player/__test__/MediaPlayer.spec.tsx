/* eslint-disable max-lines */
import { render, cleanup, act } from '@testing-library/react';
import '@testing-library/jest-dom';

import { useMediaStore } from '../../../context/MediaProvider';
import { MediaStore } from '../../../store/media-store';
import {
	BOTTOM_CONTROL_BUTTONS,
	CENTERED_BOTTOM_PLAYBACK,
	CENTERED_PLAY_BUTTON,
	DEFAULT_EVENT_ANIMATION_DURATION,
	DRAGGABLE_POPOVER,
	FULLSCREEN_BUTTON,
	MEDIA_CONTAINER,
	OVERLAY_HIDE_DELAY,
	PAUSE_ANIMATION,
	PIP_BUTTON,
	PLAY_ANIMATION,
	PLAY_PAUSE_REPLAY,
	PROGRESS_BAR,
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
const VIDEO_URL = 'video.mp4';
const AUDIO_URL = 'audio.mp3';

// A test setup for MediaPlayer, that can access `MediaStore` from `MediaProvider`
const setupMediaPlayer = (url = VIDEO_URL) => {
	const returnVal = {} as MediaStore;
	function NullComponent() {
		const mediaStore = useMediaStore();
		Object.assign(returnVal, mediaStore);
		return null;
	}
	function TestComponent() {
		return (
			<MediaPlayer url={url}>
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
		it('animation is absent for audio files', async () => {
			const { getByTestId, queryByTestId } = setupMediaPlayer(AUDIO_URL);
			// wait 1 ms to mount state and load initial data
			await act(async () => await sleep(1));

			await userEvent.click(getByTestId(PLAY_PAUSE_REPLAY));

			expect(queryByTestId(PLAY_ANIMATION)).not.toBeInTheDocument();
			expect(queryByTestId(PAUSE_ANIMATION)).not.toBeInTheDocument();
		});
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
			// because onMouseEvent is throttled, hiding can occur for a upt to 1sec delay
			await act(async () => await sleep(OVERLAY_HIDE_DELAY + 1000));
			expect(queryByTestId(BOTTOM_CONTROL_BUTTONS)).not.toBeInTheDocument();
		});
		it(`display when paused`, async () => {
			const { getByTestId, queryByTestId, mediaStore } = setupMediaPlayer();
			// wait 1 ms to mount state and load initial data
			await act(async () => await sleep(1));

			const startBtn = getByTestId(CENTERED_PLAY_BUTTON);

			await userEvent.click(startBtn);
			expect(queryByTestId(BOTTOM_CONTROL_BUTTONS)).toBeInTheDocument();

			await userEvent.click(getByTestId(PLAY_PAUSE_REPLAY));
			expect(mediaStore.isPlaying).toBeFalsy();

			await userEvent.unhover(getByTestId(MEDIA_CONTAINER));
			expect(queryByTestId(BOTTOM_CONTROL_BUTTONS)).toBeInTheDocument();
		});
		it(`always display when an button of <BottomControlsButtons/> is hovered`, async () => {
			const { getByTestId, queryByTestId, mediaStore } = setupMediaPlayer();
			// wait 1 ms to mount state and load initial data
			await act(async () => await sleep(1));

			const startBtn = getByTestId(CENTERED_PLAY_BUTTON);

			await userEvent.click(startBtn);
			expect(queryByTestId(BOTTOM_CONTROL_BUTTONS)).toBeInTheDocument();
			expect(mediaStore.isPlaying).toBeTruthy();

			await userEvent.hover(getByTestId(PLAY_PAUSE_REPLAY));
			// add delay 1sec - for be certain sure that should wait enough
			await act(async () => await sleep(OVERLAY_HIDE_DELAY + 1000));
			expect(queryByTestId(BOTTOM_CONTROL_BUTTONS)).toBeInTheDocument();
		});
		it(`always display when PIP mode is on`, async () => {
			const { getByTestId, queryByTestId, mediaStore } = setupMediaPlayer();
			// wait 1 ms to mount state and load initial data
			await act(async () => await sleep(1));

			const startBtn = getByTestId(CENTERED_PLAY_BUTTON);

			await userEvent.click(startBtn);

			await userEvent.click(getByTestId(PIP_BUTTON));
			expect(mediaStore.isPlaying).toBeTruthy();
			expect(mediaStore.isPip).toBeTruthy();

			expect(queryByTestId(BOTTOM_CONTROL_BUTTONS)).toBeInTheDocument();
		});
	});
	describe('<ProgressBar>', () => {
		it('do not display before first time play', async () => {
			const { queryByTestId } = setupMediaPlayer();
			// wait 1 ms to mount state and load initial data
			await act(async () => await sleep(1));
			expect(queryByTestId(PROGRESS_BAR)).not.toBeInTheDocument();
		});
		it('display it when <BottomControlButtons/> are shown ', async () => {
			const { getByTestId, queryByTestId } = setupMediaPlayer();
			// wait 1 ms to mount state and load initial data
			await act(async () => await sleep(1));

			const startBtn = getByTestId(CENTERED_PLAY_BUTTON);
			await userEvent.click(startBtn);
			expect(queryByTestId(BOTTOM_CONTROL_BUTTONS)).toBeInTheDocument();
			expect(queryByTestId(PROGRESS_BAR)).toBeInTheDocument();
		});
		it('display it when <BottomControlButtons/> are hidden ', async () => {
			const { getByTestId, queryByTestId } = setupMediaPlayer();
			// wait 1 ms to mount state and load initial data
			await act(async () => await sleep(1));

			const startBtn = getByTestId(CENTERED_PLAY_BUTTON);
			await userEvent.click(startBtn);

			await userEvent.unhover(getByTestId(MEDIA_CONTAINER));
			expect(queryByTestId(BOTTOM_CONTROL_BUTTONS)).not.toBeInTheDocument();
			expect(queryByTestId(PROGRESS_BAR)).toBeInTheDocument();
		});
	});
	describe('PIP mode and <PIPControls />', () => {
		it('show PIP on clicking <PictureInPictureButton />', async () => {
			const { getByTestId, mediaStore } = setupMediaPlayer();
			// wait 1 ms to mount state and load initial data
			await act(async () => await sleep(1));

			const startBtn = getByTestId(CENTERED_PLAY_BUTTON);
			await userEvent.click(startBtn);
			expect(mediaStore.isPip).toBeFalsy();

			const draggablePopover = getByTestId(DRAGGABLE_POPOVER);
			const mediaContainer = getByTestId(MEDIA_CONTAINER);
			expect(mediaContainer.contains(draggablePopover)).toBeTruthy();

			// start PIP mode  = <DraggablePopover /> wont be a child for <MediaContainer />
			await userEvent.click(getByTestId(PIP_BUTTON));
			expect(mediaContainer.contains(draggablePopover)).toBeFalsy();
			expect(mediaStore.isPip).toBeTruthy();
		});
		it('close PIP on clicking <PictureInPictureButton />', async () => {
			const { getByTestId, mediaStore } = setupMediaPlayer();
			// wait 1 ms to mount state and load initial data
			await act(async () => await sleep(1));

			const startBtn = getByTestId(CENTERED_PLAY_BUTTON);
			await userEvent.click(startBtn);

			const draggablePopover = getByTestId(DRAGGABLE_POPOVER);
			const mediaContainer = getByTestId(MEDIA_CONTAINER);
			expect(mediaContainer.contains(draggablePopover)).toBeTruthy();

			// start PIP mode  = <DraggablePopover /> wont be a child for <MediaContainer />
			await userEvent.click(getByTestId(PIP_BUTTON));
			expect(mediaContainer.contains(draggablePopover)).toBeFalsy();
			expect(mediaStore.isPip).toBeTruthy();

			// close pip = <DraggablePopover /> is a child for <MediaContainer />
			await userEvent.click(getByTestId(PIP_BUTTON));
			expect(mediaStore.isPip).toBeFalsy();
			expect(
				getByTestId(MEDIA_CONTAINER).contains(getByTestId(DRAGGABLE_POPOVER)),
			).toBeTruthy();
		});
	});
	describe('Fullscreen API', () => {
		it('FullscreenButton is not present for audio files', async () => {
			const { getByTestId, queryByTestId } = setupMediaPlayer(AUDIO_URL);
			// wait 1 ms to mount state and load initial data
			await act(async () => await sleep(1));

			const startBtn = getByTestId(PLAY_PAUSE_REPLAY);
			await userEvent.click(startBtn);
			expect(queryByTestId(FULLSCREEN_BUTTON)).not.toBeInTheDocument();
		});
		it('request/exit fullscreen by clicking on button', async () => {
			const { getByTestId, mediaStore } = setupMediaPlayer();
			// wait 1 ms to mount state and load initial data
			await act(async () => await sleep(1));

			const startBtn = getByTestId(CENTERED_PLAY_BUTTON);
			await userEvent.click(startBtn);
			expect(mediaStore.isFullscreen).toBeFalsy();
			// enable fullscreen
			await userEvent.click(getByTestId(FULLSCREEN_BUTTON));
			expect(mediaStore.isFullscreen).toBeTruthy();

			// exit fullscreen
			await userEvent.click(getByTestId(FULLSCREEN_BUTTON));
			expect(mediaStore.isFullscreen).toBeFalsy();
		});
	});
});
