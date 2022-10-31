import { createContext } from 'react';

import { Highlight } from '../types';

export interface HighlightsContext {
	highlights?: Highlight[];
}
/** Context for storing `Highlight` to distribute it to UI Controls
 * @category React Context
 */
export const HighlightsContext = createContext<HighlightsContext>({
	highlights: [],
});
