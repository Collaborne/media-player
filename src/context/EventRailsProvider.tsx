import { FC, ReactNode } from 'react';

import { Highlight } from '../types';
import { BlendColors } from '../utils/colors';

import { EventRailsContext } from './eventRails';

interface EventRailsProviderProps {
	duration: number;
	getHighlightColorBlended: BlendColors;
	highlights: Highlight[];
	children: ReactNode;
}
/** Distributing necessary context for the `<EventRail />`
 * @category ContextProvider
 */
export const EventRailsProvider: FC<EventRailsProviderProps> = ({
	highlights = [],
	getHighlightColorBlended,
	duration,
	children,
}) => {
	return (
		<EventRailsContext.Provider
			value={{ highlights, getHighlightColorBlended, duration }}
		>
			{children}
		</EventRailsContext.Provider>
	);
};
