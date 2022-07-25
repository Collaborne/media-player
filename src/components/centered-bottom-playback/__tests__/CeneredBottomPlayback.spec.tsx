import '@testing-library/jest-dom';
import { userEvent, renderWithProviders } from '../../../utils/testing-render';
import { CenteredBottomPlayback } from '../CenteredBottomPlayback';

describe('<CenteredBottomPlayback />', () => {
	it('check onDelete prop', async () => {
		const { getByTestId } = renderWithProviders(<CenteredBottomPlayback />);
		const firstPlaybackRate = getByTestId('c-playbackRate-1');
		const secondPlaybackRate = getByTestId('c-playbackRate-2');
		await userEvent.click(firstPlaybackRate);
		expect(secondPlaybackRate).toHaveAttribute('data-is-active', 'false');
		expect(firstPlaybackRate).toHaveAttribute('data-is-active', 'true');
		await userEvent.click(secondPlaybackRate);
		expect(secondPlaybackRate).toHaveAttribute('data-is-active', 'true');
		expect(firstPlaybackRate).toHaveAttribute('data-is-active', 'false');
	});
});
