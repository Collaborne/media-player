import { useEffect, useRef, useState } from 'react';
import { shallow } from 'zustand/shallow';

import { useMediaStore } from '../../context';
import { useMediaListener } from '../../hooks';
import { ReactPlayerProps } from '../../types';

interface UseReactPlayerProps {
	reactPlayerProps: ReactPlayerProps;
}

export const useReactPlayerProps = (): UseReactPlayerProps => {
	const readyFiredRef = useRef(false);
	// get current time in a ref
	const currentTimeRef = useRef(0);
	// store last pip call as a boolean(need to trigger after PIP mode was entered)
	const [hasPipCalled, setHasPipCalled] = useState(false);

	const [
		reactPlayerRef,
		playbackRate,
		initialState,
		isPlaying,
		isMuted,
		volume,
		emitter,
		setReady,
		setDuration,
		onProgress,
		isPip,
		getListener,
		setCurrentTime,
		hasStarted,
	] = useMediaStore(
		state => [
			state.reactPlayerRef,
			state.playbackRate,
			state.initialState,
			state.isPlaying,
			state.isMuted,
			state.volume,
			state.emitter,
			state._setReady,
			state.setDuration,
			state._handleProgress,
			state.isPip,
			state.getListener,
			state.setCurrentTime,
			state.hasPlayedOrSeeked,
		],
		shallow,
	);

	const listener = getListener();

	const reactPlayerProps: ReactPlayerProps = {
		autoPlay: initialState.autoPlay,
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

	useEffect(() => {
		setHasPipCalled(prev => !prev);
	}, [isPip]);

	// store current time in a ref
	useMediaListener(
		'timeupdate',
		e => (currentTimeRef.current = e.seconds),
		listener,
	);

	// When PIP mode was triggered, we unmount ReactPlayer, that will cause to start media from 0 (onProgress prop is initialized)
	// to avoid playing from 0, we will jump to previous time
	useEffect(() => {
		if (!hasStarted) {
			return;
		}
		setCurrentTime(currentTimeRef.current);
	}, [hasPipCalled, hasStarted, setCurrentTime]);

	return {
		reactPlayerProps,
	};
};
