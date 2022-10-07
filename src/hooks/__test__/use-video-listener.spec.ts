import { renderHook } from '@testing-library/react';
import mitt from 'mitt';

import { EmitterListeners, MediaEvents } from '../../types';
import { EventEmittersName, useVideoListener } from '../use-video-listener';

const emitter = mitt<MediaEvents>();
const eventName: EventEmittersName = 'play';
const emitApi: EmitterListeners = {
	addEventListener: emitter.on,
	removeEventListener: emitter.off,
};
const addEventListenerSpy = jest.spyOn(emitApi, 'addEventListener');
const removeEventListenerSpy = jest.spyOn(emitApi, 'removeEventListener');

describe('useVideoListener', () => {
	it(`mount/unmount on "${eventName}" event`, async () => {
		const handler = jest.fn();
		const { unmount } = renderHook(() =>
			useVideoListener(eventName, handler, emitApi),
		);
		expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
		expect(addEventListenerSpy).toHaveBeenCalledWith(
			eventName,
			expect.any(Function),
		);
		unmount();
		expect(removeEventListenerSpy).toHaveBeenCalledWith(
			eventName,
			expect.any(Function),
		);
	});
});
