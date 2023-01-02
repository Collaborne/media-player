import { useRef } from 'react';
import shallow from 'zustand/shallow';

import { useMediaStore } from '../../context';
import { ReactPlayerProps } from '../../types';

interface UseReactPlayerProps {
	reactPlayerProps: ReactPlayerProps;
}

export const useReactPlayerProps = (): UseReactPlayerProps => {
	const readyFiredRef = useRef(false);
	const [
		reactPlayerRef,
		initialState,
		playbackRate,
		isPlaying,
		isMuted,
		volume,
		emitter,
		setReady,
		setDuration,
		onProgress,
	] = useMediaStore(
		state => [
			state.reactPlayerRef,
			state.initialState,
			state.playbackRate,
			state.isPlaying,
			state.isMuted,
			state.volume,
			state.emitter,
			state._setReady,
			state.setDuration,
			state._handleProgress,
		],
		shallow,
	);
	const reactPlayerProps: ReactPlayerProps = {
		autoPlay: initialState.isPlaying,
		playsinline: true,
		playbackRate,
		playing: isPlaying,
		muted: isMuted,
		volume,
		ref: reactPlayerRef,
		onReady: () => {
			emitter.emit('ready');
			if (!readyFiredRef?.current) {
				emitter.emit('firstReady');
				readyFiredRef.current = true;
			}
			setReady();
		},
		onEnded: () => emitter.emit('ended'),
		onDuration: duration => {
			emitter.emit('durationchange', { duration });
			setDuration(duration);
		},
		onProgress: ({ playedSeconds }) => onProgress(playedSeconds),
	};

	return {
		reactPlayerProps,
	};
};
