import { FC, ReactNode } from 'react';

import { Highlight } from '../types';

import { HighlightsContext } from './highlights';

interface HighlightsProviderProps {
	highlights?: Highlight[];
	children: ReactNode;
}
/** Keep highlights in a context to distribute them to UI Controls
 * @category ContextProvider
 */
export const HighlightsProvider: FC<HighlightsProviderProps> = ({
	highlights = [],
	children,
}) => {
	return (
		<HighlightsContext.Provider value={{ highlights }}>
			{children}
		</HighlightsContext.Provider>
	);
};
