import { createContext } from 'react';

import { SupportedMediaType } from '../types';

export interface MediaTypeContext {
	mediaType?: SupportedMediaType;
}
/** Context for storing `SupportedMediaType` to distribute it to UI Controls
 * @category React Context
 */
export const MediaTypeContext = createContext<MediaTypeContext>({
	mediaType: undefined,
});
