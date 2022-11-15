import { useContext } from 'react';

import { EventRailsContext } from '../context/eventRails';

/**
 * Selector for `EventRailsContext` value
 * @category hooks
 */

export const useEventRailsContext = (): EventRailsContext => {
	const context = useContext<EventRailsContext>(EventRailsContext);
	if (!context) {
		throw new Error(
			'useEventRailsContext must be used in a EventRailsProvider ',
		);
	}
	return context;
};
