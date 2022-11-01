import { useContext } from 'react';

import { HighlightsContext } from '../context/highlights';

/**
 * Selector for `HighlightsContext` value
 * @category hooks
 */

export const useHighlights = (): HighlightsContext => {
	const context = useContext<HighlightsContext>(HighlightsContext);
	if (!context) {
		throw new Error('useHighlights must be used in a HighlightsProvider ');
	}
	return context;
};
