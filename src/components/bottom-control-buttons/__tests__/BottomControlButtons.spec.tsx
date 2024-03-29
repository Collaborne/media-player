import '@testing-library/jest-dom';
import {
	PAUSE_ICON,
	PIP_BUTTON,
	PLAYBACK_RATES,
	PLAY_ICON,
	SECONDS_TO_SKIP,
} from '../../../utils/constants';
import {
	act,
	setupMediaProvider,
	userEvent,
} from '../../../utils/testing-render';
import {
	PlayPauseReplay,
	RwdButton,
	FwdButton,
	VolumeButton,
	VolumeSlider,
	TimeDisplay,
	PlaybackRateButton,
	PictureInPictureButton,
} from '../components';

const BottomControlButtons = () => {
	return (
		<>
			<PlayPauseReplay />
			<RwdButton />
			<FwdButton />
			<VolumeButton />
			<VolumeSlider />
			<TimeDisplay />
			<PlaybackRateButton />
			<PictureInPictureButton />
		</>
	);
};

describe('<BottomControlButtons />', () => {
	it('displays play button on first mount', async () => {
		const { getByTestId } = setupMediaProvider(<BottomControlButtons />);
		expect(getByTestId(PLAY_ICON)).toBeInTheDocument();
	});

	it('click on play/pause actions', async () => {
		const { getByTestId, mediaStore } = setupMediaProvider(
			<BottomControlButtons />,
		);
		const playButton = getByTestId(PLAY_ICON);
		await userEvent.click(playButton);
		expect(mediaStore.isPlaying).toBeTruthy();
		const pauseButton = getByTestId(PAUSE_ICON);
		expect(pauseButton).toBeInTheDocument();
		await userEvent.click(pauseButton);
		expect(mediaStore.isPlaying).toBeFalsy();
	});

	it('click on mute icon', async () => {
		const { getByTestId, mediaStore } = setupMediaProvider(
			<BottomControlButtons />,
		);
		const volumeButton = getByTestId('icon-volume');
		await userEvent.click(volumeButton);
		expect(mediaStore.isMuted).toBeTruthy();
	});

	it('click on fwd icon', async () => {
		const { getByTestId, mediaStore } = setupMediaProvider(
			<BottomControlButtons />,
		);

		const fwdButton = getByTestId('icon-fwd');
		act(() => mediaStore.setDuration(100));
		await userEvent.click(fwdButton);
		expect(mediaStore.currentTime).toBe(SECONDS_TO_SKIP);
	});

	it('click on rwd icon', async () => {
		const { getByTestId, mediaStore } = setupMediaProvider(
			<BottomControlButtons />,
		);
		act(() => mediaStore.setDuration(100));
		const rwdButton = getByTestId('icon-rwd');
		await userEvent.click(rwdButton);
		expect(mediaStore.currentTime).toBe(0);
		act(() => mediaStore.setCurrentTime(SECONDS_TO_SKIP));
		expect(mediaStore.currentTime).toBe(SECONDS_TO_SKIP);
		await userEvent.click(rwdButton);
		expect(mediaStore.currentTime).toBe(0);
	});

	it('click on playbackRate icon', async () => {
		const { getByTestId, mediaStore } = setupMediaProvider(
			<BottomControlButtons />,
		);
		const rateBtn = getByTestId('icon-playback-rate');
		await userEvent.click(rateBtn);
		expect(mediaStore.playbackRate).toBe(PLAYBACK_RATES[1]);
		await userEvent.click(rateBtn);
		expect(mediaStore.playbackRate).toBe(PLAYBACK_RATES[2]);
	});

	it('click on pip icon', async () => {
		const { getByTestId, mediaStore } = setupMediaProvider(
			<BottomControlButtons />,
		);
		const pip = getByTestId(PIP_BUTTON);
		await userEvent.click(pip);
		expect(mediaStore.isPip).toBeTruthy();
		expect(mediaStore.hasPipTriggeredByClick).toBeTruthy();
		await userEvent.click(pip);
		expect(mediaStore.isPip).toBeFalsy();
	});
});
