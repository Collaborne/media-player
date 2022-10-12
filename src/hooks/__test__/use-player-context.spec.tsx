import { render } from '@testing-library/react';
import { MutableRefObject, useEffect } from 'react';

import { MediaStore } from '../../store/media-store';
import { usePlayerContext } from '../use-player-context';

function setup(store: MediaStore) {
	const returnVal: {
		mediaContextRef: MutableRefObject<MediaStore | undefined> | undefined;
		mediaContext: MediaStore | undefined;
	} = {
		mediaContextRef: undefined,
		mediaContext: undefined,
	};
	function TestComponent() {
		const { setMediaContext, mediaContextRef, mediaContext } =
			usePlayerContext();
		useEffect(() => {
			setMediaContext(store);
		}, [setMediaContext]);
		Object.assign(returnVal, { mediaContext, mediaContextRef });
		return null;
	}
	render(<TestComponent />);
	return returnVal;
}

describe('usePlayerContext', () => {
	it('getCurrentTime from player context', () => {
		const setCurrentTime = jest.fn();
		const testMediaStore = { setCurrentTime } as unknown as MediaStore;
		const { mediaContext } = setup(testMediaStore);
		mediaContext?.setCurrentTime(10);
		expect(setCurrentTime).toHaveBeenCalledTimes(1);
		expect(testMediaStore).toEqual(mediaContext);
	});
});
