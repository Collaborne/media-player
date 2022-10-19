import { createContext } from 'react';

import { MediaType } from '../types';

export interface MediaTypeContext {
	mediaType?: MediaType;
}

export const MediaTypeContext = createContext<MediaTypeContext>({
	mediaType: undefined,
});
