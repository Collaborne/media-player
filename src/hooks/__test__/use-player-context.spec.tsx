import { render } from '@testing-library/react';
import { MutableRefObject, useEffect } from 'react';

import { MediaContext } from '../../context/media';
import { MediaApi } from '../../types';
import { usePlayerContext } from '../use-player-context';

function setup(context: MediaContext) {
	const returnVal: {
		mediaContextRef: MutableRefObject<MediaContext | undefined> | undefined;
		mediaContextApi: MediaApi | undefined;
	} = {
		mediaContextRef: undefined,
		mediaContextApi: undefined,
	};
	function TestComponent() {
		const { setMediaContext, mediaContextRef, mediaContextApi } =
			usePlayerContext();
		useEffect(() => {
			setMediaContext(context);
		}, [setMediaContext]);
		Object.assign(returnVal, { mediaContextApi, mediaContextRef });
		return null;
	}
	render(<TestComponent />);
	return returnVal;
}

describe('usePlayerContext', () => {
	it('getCurrentTime from player context', () => {
		const getCurrentTime = jest.fn();
		const mediaContext = {
			api: { getCurrentTime } as MediaApi,
		} as MediaContext;
		const { mediaContextApi, mediaContextRef } = setup(mediaContext);
		mediaContextRef?.current?.api?.getCurrentTime?.();
		expect(getCurrentTime).toHaveBeenCalledTimes(1);
		expect(mediaContextApi).toEqual(mediaContext.api);
	});
});
