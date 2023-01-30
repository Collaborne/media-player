import { createContext } from 'react';

import { Highlight } from '../types';
import { BlendColors } from '../utils';

export interface EventRailsContext {
	highlights?: Highlight[];
	duration: number;
	getHighlightColorBlended: BlendColors;
}
/** Context for storing `EventRailsContext` to distribute it to `<EventRails />`
 * @category React Context
 */
export const EventRailsContext = createContext<EventRailsContext>({
	highlights: [],
	getHighlightColorBlended: () => '',
	duration: 0,
});
