import { useCallback, useState } from 'react';
import screenfull from 'screenfull';

import { BasicTarget, getTargetElement } from '../utils/dom-target';

import { useLatest } from './use-latest';
import { useOnUnmount } from './use-on-unmount';

export interface Options {
	onExit?: () => void;
	onEnter?: () => void;
}

interface FullscreenHandlers {
	enterFullscreen: () => Promise<void>;
	exitFullscreen: () => Promise<void>;
	toggleFullscreen: () => Promise<void>;
	isEnabled: boolean;
}

export interface UseFullscreen extends FullscreenHandlers {
	isFullscreen: boolean;
}

export const useFullscreen = (
	target: BasicTarget,
	options?: Options,
): UseFullscreen => {
	const { onExit, onEnter } = options || {};

	const onExitRef = useLatest(onExit);
	const onEnterRef = useLatest(onEnter);

	const [isFullscreen, setIsFullscreen] = useState(false);

	const onChange = useCallback(() => {
		if (screenfull.isEnabled) {
			const { isFullscreen } = screenfull;
			if (isFullscreen) {
				onEnterRef.current?.();
			} else {
				screenfull.off('change', onChange);
				onExitRef.current?.();
			}
			setIsFullscreen(isFullscreen);
		}
	}, [onEnterRef, onExitRef]);

	const enterFullscreen = useCallback(async () => {
		const el = getTargetElement(target);
		if (!el) {
			return;
		}

		if (screenfull.isEnabled) {
			try {
				await screenfull.request(el);
				screenfull.on('change', onChange);
			} catch (error) {
				console.error(error);
			}
		}
	}, [onChange, target]);

	const exitFullscreen = useCallback(async () => {
		if (!isFullscreen) {
			return;
		}
		if (screenfull.isEnabled) {
			await screenfull.exit();
		}
	}, [isFullscreen]);

	const toggleFullscreen = useCallback(async () => {
		if (isFullscreen) {
			return exitFullscreen();
		}

		return enterFullscreen();
	}, [enterFullscreen, exitFullscreen, isFullscreen]);

	useOnUnmount(() => {
		if (screenfull.isEnabled) {
			screenfull.off('change', onChange);
		}
	});

	return {
		isFullscreen,
		enterFullscreen,
		exitFullscreen,
		toggleFullscreen,
		isEnabled: screenfull.isEnabled,
	};
};
