import { MediaProviderProps, useMediaStore } from '../../context';
import { useMediaListener } from '../../hooks';
import { act, setupMediaProvider } from '../../utils/testing-render';

const setupHandleProgress = (
	mediaProviderProps?: Partial<MediaProviderProps>,
) => {
	const returnVal: Array<unknown> = [];
	function NullComponent() {
		const listener = useMediaStore(state => state.getListener());
		// listen to all events
		useMediaListener(
			'*',
			event => {
				returnVal.push(event);
			},
			listener,
		);

		return null;
	}

	const setupResults = setupMediaProvider(
		<NullComponent />,
		mediaProviderProps,
	);
	return { ...setupResults, events: returnVal };
};

describe('media-store', () => {
	describe('_handleProgress', () => {
		it('emit onTimeAlarm', () => {
			const { mediaStore, events } = setupHandleProgress({
				alarms: [3, 4, 5],
			});
			act(() => mediaStore.play());
			act(() => mediaStore.setDuration(6));
			act(() => mediaStore._handleProgress(0));
			expect(events.includes('onTimeAlarm')).toBeFalsy();
			act(() => mediaStore._handleProgress(1));
			expect(events.includes('onTimeAlarm')).toBeFalsy();
			act(() => mediaStore._handleProgress(2));
			expect(events.includes('onTimeAlarm')).toBeFalsy();
			act(() => mediaStore._handleProgress(3));
			expect(events.includes('onTimeAlarm')).toBeFalsy();
			act(() => mediaStore._handleProgress(3.01));
			expect(events.includes('onTimeAlarm')).toBeTruthy();
		});
	});
});
