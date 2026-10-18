import { FC, ReactNode } from 'react';

import { Highlight } from '../types/index.js';
import { BlendColors } from '../utils/colors.js';

import { EventRailsContext } from './eventRails.js';

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
