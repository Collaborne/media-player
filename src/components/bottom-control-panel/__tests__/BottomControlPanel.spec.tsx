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
	it('When first mounted, display play button from the <PlayPauseReplay /> and play/pause events', async () => {
		const { getByTestId } = renderWithProviders(<BottomControlPanel />);
		// On first load, we show play button
		expect(getByTestId('icon-play')).toBeInTheDocument();

		// If play button is pressed, then we show play button
		await userEvent.click(getByTestId('icon-play'));
		expect(getByTestId('icon-pause')).toBeInTheDocument();
	});
});
describe('<Check the button fired events />', () => {
	it('api setters correspond to icon buttons', async () => {
		const api: VideoContext['api'] = {
			play: jest.fn(),
			pause: jest.fn(),
			mute: jest.fn(),
			setCurrentTime: jest.fn(),
			setPlaybackRate: jest.fn(),
			getPictureInPicture: jest.fn(),
		};

		const { getByTestId } = render(
			<TestingVideoProvider api={api}>
				<BottomControlPanel />
			</TestingVideoProvider>,
		);
		// Click on play icon button
		const playButton = getByTestId('icon-play');
		await userEvent.click(playButton);
		expect(api.play).toHaveBeenCalledTimes(1);

		// Click on volume icon button - muting
		const volumeButton = getByTestId('icon-volume');
		await userEvent.click(volumeButton);
		expect(api.mute).toHaveBeenCalledTimes(1);

		// Click on forward-rewind icon button
		const fwdButton = getByTestId('icon-fwd');
		const rwdButton = getByTestId('icon-rwd');
		await userEvent.click(fwdButton);
		expect(api.setCurrentTime).toHaveBeenCalledTimes(1);
		await userEvent.click(rwdButton);
		expect(api.setCurrentTime).toHaveBeenCalledTimes(2);

		// Click on playbackRate
		const rateBtn = getByTestId('playback-rate');
		await userEvent.click(rateBtn);
		expect(api.setPlaybackRate).toHaveBeenCalledTimes(1);

		// Click on pip icon button
		const pip = getByTestId('icon-pip');
		await userEvent.click(pip);
		// TODO: FIX-> api.requestPip wont be called (state setter wont work in jest)
		expect(api.getPictureInPicture).toHaveBeenCalledTimes(1);
	});
});
