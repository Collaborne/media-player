import '@testing-library/jest-dom';
import { fireEvent, renderWithProviders } from '../../../utils/testing-render';
import { BottomControlPanel } from '../BottomControlPanel';

describe('<BottomControlPanel />', () => {
	it('When first mounted, display play button from the <PlayPauseReplay /> and play/pause events', () => {
		const { getByTestId } = renderWithProviders(<BottomControlPanel />);
		// On first load, we show play button
		expect(getByTestId('icon-play')).toBeInTheDocument();

		// If play button is pressed, then we show play button
		fireEvent.click(getByTestId('icon-play'));
		expect(getByTestId('icon-pause')).toBeInTheDocument();
	});
	it('On forward', () => {
		const { getByTestId } = renderWithProviders(<BottomControlPanel />);
	});
});
