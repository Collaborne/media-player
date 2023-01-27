import { useRef } from 'react';
import { shallow } from 'zustand/shallow';

import { useMediaStore } from '../../context';
import { useMediaListener } from '../../hooks';

interface UsePipControlsProps {
	skipSeconds: number;
}
interface UsePipControlsHook {
	onRwd: VoidFunction;
	onFwd: VoidFunction;
	onClose: VoidFunction;
}

export const usePipControlsHook = ({
	skipSeconds,
}: UsePipControlsProps): UsePipControlsHook => {
	const [setCurrentTime, getListener, exitPip, pause] = useMediaStore(
		state => [
			state.setCurrentTime,
			state.getListener,
			state.exitPip,
			state.pause,
		],
		shallow,
	);
	const listener = getListener();

	// Storing current time into a ref, to avoid rerenders
	const currentTimeRef = useRef(0);

	useMediaListener(
		'timeupdate',
		e => (currentTimeRef.current = e.seconds),
		listener,
	);

	const onStop = pause;
	const onRwd = () => setCurrentTime(currentTimeRef.current - skipSeconds);
	const onFwd = () => setCurrentTime(currentTimeRef.current + skipSeconds);
	const onClose = () => {
		onStop();
		exitPip();
	};

	return {
		onRwd,
		onFwd,
		onClose,
	};
};
