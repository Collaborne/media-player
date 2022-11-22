import '@testing-library/jest-dom';
import { CENTERED_BOTTOM_PLAYBACK } from '../../../utils/constants';
import { userEvent, renderWithProviders } from '../../../utils/testing-render';
import { CenteredBottomPlayback } from '../CenteredBottomPlayback';

describe('<CenteredBottomPlayback />', () => {
	it('activates the playback rate button that was clicked last', async () => {
		const { getByTestId } = renderWithProviders(<CenteredBottomPlayback />);
		const firstPlaybackRate = getByTestId(`${CENTERED_BOTTOM_PLAYBACK}-1`);
		const secondPlaybackRate = getByTestId(`${CENTERED_BOTTOM_PLAYBACK}-2`);
		await userEvent.click(firstPlaybackRate);
		expect(secondPlaybackRate).toHaveAttribute('data-is-active', 'false');
		expect(firstPlaybackRate).toHaveAttribute('data-is-active', 'true');
		await userEvent.click(secondPlaybackRate);
		expect(secondPlaybackRate).toHaveAttribute('data-is-active', 'true');
		expect(firstPlaybackRate).toHaveAttribute('data-is-active', 'false');
	});
});
