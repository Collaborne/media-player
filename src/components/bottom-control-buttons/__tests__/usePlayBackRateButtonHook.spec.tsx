import { useMediaStore } from '../../../context';
import { setupMediaProvider, userEvent } from '../../../utils/testing-render';
import {
	usePlaybackRateButtonHook,
	UsePlaybackRateButtonHook,
} from '../hooks/usePlaybackRateButtonHook';

const playbackRates = [1, 2];
const TEST_ID = 'test-id';

function setupPlaybackRate<T extends number>(playbackRates: T[], initial?: T) {
	const clickHandler = {} as UsePlaybackRateButtonHook;
	function NullComponent() {
		const [playbackRate, setPlaybackRate] = useMediaStore(state => [
			state.playbackRate,
			state.setPlaybackRate,
		]);
		const { handleClick } = usePlaybackRateButtonHook({
			currentRate: initial ?? playbackRate,
			setPlaybackRate,
			playbackRates,
		});
		Object.assign(clickHandler, handleClick);

		return <button data-testid={TEST_ID} onClick={handleClick} />;
	}

	const setupResults = setupMediaProvider(<NullComponent />);
	return { ...setupResults, ...clickHandler };
}

describe('usePlaybackRateButtonHook', () => {
	describe('initialization', () => {
		it('currentRate do not belongs to playbackRates', async () => {
			const { handleClick } = setupPlaybackRate(playbackRates, 0);

			expect(() => {
				handleClick();
			}).toThrowError();
		});
		it('default', () => {
			const { mediaStore } = setupPlaybackRate(playbackRates);

			expect(mediaStore.playbackRate).toBe(playbackRates[0]);
		});
	});
	describe('rotation', () => {
		it('only 1 item in array', async () => {
			const { getByTestId, mediaStore } = setupPlaybackRate([1]);
			expect(mediaStore.playbackRate).toBe(playbackRates[0]);
			const testButton = getByTestId(TEST_ID);

			await userEvent.click(testButton);
			expect(mediaStore.playbackRate).toBe(playbackRates[0]);
		});
		it('pass to next item', async () => {
			const { getByTestId, mediaStore } = setupPlaybackRate(playbackRates);
			const testButton = getByTestId(TEST_ID);

			await userEvent.click(testButton);
			expect(mediaStore.playbackRate).toBe(playbackRates[1]);
		});
		it('rotates from beginning', async () => {
			const { getByTestId, mediaStore } = setupPlaybackRate(playbackRates);
			expect(mediaStore.playbackRate).toBe(playbackRates[0]);
			const testButton = getByTestId(TEST_ID);

			await userEvent.click(testButton);
			expect(mediaStore.playbackRate).toBe(playbackRates[1]);

			await userEvent.click(testButton);
			expect(mediaStore.playbackRate).toBe(playbackRates[0]);
		});
	});
});
