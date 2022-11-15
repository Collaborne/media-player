import { createContext } from 'react';

import { Highlight } from '../types';
import { BlendColors } from '../utils';

export interface EventRailsContext {
	highlights?: Highlight[];
	duration: number;
	getHighlightColorBlended: BlendColors;
}
const NO_OP = () => undefined;
/** Context for storing `Highlight` to distribute it to UI Controls
 * @category React Context
 */
export const EventRailsContext = createContext<EventRailsContext>({
	highlights: [],
	getHighlightColorBlended: NO_OP,
	duration: 0,
});
