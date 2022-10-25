import { createContext } from 'react';

import { SupportedMediaType } from '../types';

export interface MediaTypeContext {
	mediaType?: SupportedMediaType;
}

export const MediaTypeContext = createContext<MediaTypeContext>({
	mediaType: undefined,
});
