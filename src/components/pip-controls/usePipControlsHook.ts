import { useVideo } from '../../hooks';

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
	const { api } = useVideo();
	const currentTime = Number(api?.getCurrentTime?.());
	const showPipControls = api?.getShowPipControls?.();
	const onStop = () => api?.pause?.();
	const onRwd = () => api?.setCurrentTime?.(currentTime - skipSeconds);
	const onFwd = () => api?.setCurrentTime?.(currentTime + skipSeconds);
	const onClose = () => {
		onStop();
		api?.exitPip?.();
	};

	return {
		showPipControls,
		onRwd,
		onFwd,
		onClose,
	};
};
