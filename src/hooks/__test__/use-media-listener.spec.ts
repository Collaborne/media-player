import { renderHook } from '@testing-library/react';
import mitt from 'mitt';
import { describe, expect, it, vi } from 'vitest';

import { EmitterListeners, MediaEvents } from '../../types/index.js';
import { EventEmittersName, useMediaListener } from '../use-media-listener.js';

const createEmitter = mitt as unknown as typeof import('mitt').default;

const emitter = createEmitter<MediaEvents>();
const eventName: EventEmittersName = 'play';
const emitApi: EmitterListeners = {
	addEventListener: emitter.on,
	removeEventListener: emitter.off,
};
const addEventListenerSpy = vi.spyOn(emitApi, 'addEventListener');
const removeEventListenerSpy = vi.spyOn(emitApi, 'removeEventListener');

describe('useMediaListener', () => {
	it(`mount/unmount on "${eventName}" event`, async () => {
		const handler = vi.fn();
		const { unmount } = renderHook(() =>
			useMediaListener(eventName, handler, emitApi),
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
