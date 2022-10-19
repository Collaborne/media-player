import { useMediaStore } from '../../context';

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
	const currentTime = useMediaStore(state => state.currentTime);
	const setCurrentTime = useMediaStore(state => state.setCurrentTime);
	const onStop = useMediaStore(state => state.pause);
	const onRwd = () => setCurrentTime(currentTime - skipSeconds);
	const onFwd = () => setCurrentTime(currentTime + skipSeconds);
	const exitPip = useMediaStore(state => state.exitPip);
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
