import { useContext } from 'react';

import { PIPControlsContext } from '../context/pipControls';

/**
 * Selector for `PIPControlsContext` value
 * @category hooks
 */

export const usePipControlsContext = (): PIPControlsContext => {
	const context = useContext<PIPControlsContext | null>(PIPControlsContext);
	if (!context) {
		throw new Error(
			'usePipControlsContext must be used in a PIPControlsContext ',
		);
	}
	return context;
};
