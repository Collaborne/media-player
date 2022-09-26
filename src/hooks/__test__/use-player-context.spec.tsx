import { render } from '@testing-library/react';
import { MutableRefObject } from 'react';

import { VideoContext } from '../../context/video';
import { VideoApi } from '../../types';
import { usePlayerContext } from '../use-player-context';

function setup(context: VideoContext) {
	const returnVal: {
		videoContextRef: MutableRefObject<VideoContext | undefined> | undefined;
		videoContextApi: VideoApi | undefined;
	} = {
		videoContextRef: undefined,
		videoContextApi: undefined,
	};
	function TestComponent() {
		const { setVideoContext, videoContextRef, videoContextApi } =
			usePlayerContext();
		setVideoContext(context);
		Object.assign(returnVal, { videoContextApi, videoContextRef });
		return null;
	}
	const component = render(<TestComponent />);
	const rerender = component.rerender(<TestComponent />);
	return { ...returnVal, rerender };
}

describe('usePlayerContext', () => {
	it('getCurrentTime from player context', () => {
		const getCurrentTime = jest.fn();
		const videoContext = {
			api: { getCurrentTime } as VideoApi,
		} as VideoContext;
		const { videoContextApi, videoContextRef, rerender } = setup(videoContext);
		videoContextRef?.current?.api?.getCurrentTime?.();
		expect(getCurrentTime).toHaveBeenCalledTimes(1);
		void rerender;
		expect(videoContextApi).toEqual(videoContext.api);
	});
});
