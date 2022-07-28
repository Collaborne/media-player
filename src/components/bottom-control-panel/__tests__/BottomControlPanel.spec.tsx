import '@testing-library/jest-dom';
import { VideoContext } from '../../../context';
import {
	render,
	renderWithProviders,
	TestingVideoProvider,
	userEvent,
} from '../../../utils/testing-render';
import { BottomControlPanel } from '../BottomControlPanel';

describe('<BottomControlPanel />', () => {
	const api: VideoContext['api'] = {
		play: jest.fn(),
		pause: jest.fn(),
		mute: jest.fn(),
		setCurrentTime: jest.fn(),
		setPlaybackRate: jest.fn(),
		getPictureInPicture: jest.fn(),
	};
	it('displays play button on first mount', async () => {
		const { getByTestId } = renderWithProviders(<BottomControlPanel />);
		expect(getByTestId('icon-play')).toBeInTheDocument();
	});

	it('displays pause button while the video plays', async () => {
		const { getByTestId } = renderWithProviders(<BottomControlPanel />);
		await userEvent.click(getByTestId('icon-play'));
		expect(getByTestId('icon-pause')).toBeInTheDocument();
	});

	it('click on play icon', async () => {
		const { getByTestId } = render(
			<TestingVideoProvider api={api}>
				<BottomControlPanel />
			</TestingVideoProvider>,
		);
		const playButton = getByTestId('icon-play');
		await userEvent.click(playButton);
		expect(api.play).toHaveBeenCalledTimes(1);
	});

	it('click on mute icon', async () => {
		const { getByTestId } = render(
			<TestingVideoProvider api={api}>
				<BottomControlPanel />
			</TestingVideoProvider>,
		);
		const volumeButton = getByTestId('icon-volume');
		await userEvent.click(volumeButton);
		expect(api.mute).toHaveBeenCalledTimes(1);
	});

	it('click on fwd icon', async () => {
		const { getByTestId } = render(
			<TestingVideoProvider api={api}>
				<BottomControlPanel />
			</TestingVideoProvider>,
		);
		const fwdButton = getByTestId('icon-fwd');
		await userEvent.click(fwdButton);
		expect(api.setCurrentTime).toHaveBeenCalledTimes(1);
	});

	it('click on rwd icon', async () => {
		const { getByTestId } = render(
			<TestingVideoProvider api={api}>
				<BottomControlPanel />
			</TestingVideoProvider>,
		);
		const rwdButton = getByTestId('icon-rwd');
		await userEvent.click(rwdButton);
		expect(api.setCurrentTime).toHaveBeenCalledTimes(1);
	});

	it('click on playbackRate icon', async () => {
		const { getByTestId } = render(
			<TestingVideoProvider api={api}>
				<BottomControlPanel />
			</TestingVideoProvider>,
		);
		const rateBtn = getByTestId('playback-rate');
		await userEvent.click(rateBtn);
		expect(api.setPlaybackRate).toHaveBeenCalledTimes(1);
	});

	it('click on pip icon', async () => {
		const { getByTestId } = render(
			<TestingVideoProvider api={api}>
				<BottomControlPanel />
			</TestingVideoProvider>,
		);
		const pip = getByTestId('icon-pip');
		await userEvent.click(pip);
		// TODO: FIX-> api.requestPip wont be called (state setter wont work in jest)
		expect(api.getPictureInPicture).toHaveBeenCalledTimes(1);
	});
});
