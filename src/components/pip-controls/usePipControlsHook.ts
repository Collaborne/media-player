import { useVideoStore } from '../../context';

interface UsePipControlsProps {
	skipSeconds: number;
}
interface UsePipControlsHook {
	showPipControls?: boolean;
	onRwd: VoidFunction;
	onFwd: VoidFunction;
	onClose: VoidFunction;
}

export const usePipControlsHook = ({
	skipSeconds,
}: UsePipControlsProps): UsePipControlsHook => {
	const currentTime = useVideoStore(state => state.currentTime);
	const showPipControls = useVideoStore(state => state.showPipControls);
	const setCurrentTime = useVideoStore(state => state.setCurrentTime);
	const onStop = useVideoStore(state => state.pause);
	const onRwd = () => setCurrentTime(currentTime - skipSeconds);
	const onFwd = () => setCurrentTime(currentTime + skipSeconds);
	const exitPip = useVideoStore(state => state.exitPip);
	const onClose = () => {
		onStop();
		exitPip();
	};

	return {
		showPipControls,
		onRwd,
		onFwd,
		onClose,
	};
};
