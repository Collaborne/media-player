import { FC, ReactNode } from 'react';

import { Highlight } from '../types';

import { HighlightsContext } from './highlights';

interface HighlightsProviderProps {
	highlights?: Highlight[];
	children: ReactNode;
}
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
