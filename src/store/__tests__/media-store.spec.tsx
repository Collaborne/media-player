import { ExternalStateUpdater } from '../../components/core-player/components/ExternalStateUpdater';
import { MediaProviderProps, useMediaStore } from '../../context';
import { useMediaListener } from '../../hooks';
import { MediaType } from '../../types';
import { act, setupMediaProvider } from '../../utils/testing-render';

const setupMediaType = (mediaProviderProps: {
	isAudio: boolean;
	mediaType: MediaType;
}) => {
	const setupResults = setupMediaProvider(
		<ExternalStateUpdater
			isPipEnabled
			isAudio={mediaProviderProps.isAudio}
			mediaType={mediaProviderProps.mediaType}
		/>,
	);
	return setupResults;
};

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
	describe('mediaType', () => {
		it('initializes state based on properties', () => {
			const { mediaStore } = setupMediaType({
				mediaType: 'audio',
				isAudio: true,
			});
			expect(mediaStore.mediaType).toBe('audio');
			expect(mediaStore.isAudio).toBeTruthy();
		});
		it('updates initialized state when setters are called', () => {
			const { mediaStore } = setupMediaType({
				mediaType: 'audio',
				isAudio: true,
			});
			act(() => mediaStore.setMediaType('video'));
			expect(mediaStore.mediaType).toBe('video');
			act(() => mediaStore.setIsAudio(false));
			expect(mediaStore.isAudio).toBeFalsy();
			act(() => mediaStore.setMediaType('unknown'));
			expect(mediaStore.mediaType).toBe('unknown');
		});
	});
});
