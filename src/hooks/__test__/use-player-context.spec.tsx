import { render } from '@testing-library/react';
import { MutableRefObject, useEffect } from 'react';

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
		useEffect(() => {
			setVideoContext(context);
		}, [setVideoContext]);
		Object.assign(returnVal, { videoContextApi, videoContextRef });
		return null;
	}
	render(<TestComponent />);
	return returnVal;
}

describe('usePlayerContext', () => {
	it('getCurrentTime from player context', () => {
		const getCurrentTime = jest.fn();
		const videoContext = {
			api: { getCurrentTime } as VideoApi,
		} as VideoContext;
		const { videoContextApi, videoContextRef } = setup(videoContext);
		videoContextRef?.current?.api?.getCurrentTime?.();
		expect(getCurrentTime).toHaveBeenCalledTimes(1);
		expect(videoContextApi).toEqual(videoContext.api);
	});
});
