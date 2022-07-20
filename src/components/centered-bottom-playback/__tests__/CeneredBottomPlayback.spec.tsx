import '@testing-library/jest-dom';
import { fireEvent, renderWithProviders } from '../../../utils/testing-render';
import { CenteredBottomPlayback } from '../CenteredBottomPlayback';

describe('<CenteredBottomPlayback />', () => {
	it('check onDelete prop', async () => {
		const { getByTestId } = renderWithProviders(<CenteredBottomPlayback />);
		const firstPlaybackRate = getByTestId('c-playbackRate-1');
		const secondPlaybackRate = getByTestId('c-playbackRate-2');
		fireEvent.click(firstPlaybackRate);
		expect(secondPlaybackRate).toHaveAttribute('data-is-active', 'false');
		expect(firstPlaybackRate).toHaveAttribute('data-is-active', 'true');
		fireEvent.click(secondPlaybackRate);
		expect(secondPlaybackRate).toHaveAttribute('data-is-active', 'true');
		expect(firstPlaybackRate).toHaveAttribute('data-is-active', 'false');
	});
});
