import { createContext } from 'react';

import { Highlight } from '../types';

export interface HighlightsContext {
	highlights?: Highlight[];
}

export const HighlightsContext = createContext<HighlightsContext>({
	highlights: [],
});
