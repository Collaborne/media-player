import { useContext } from 'react';

import { MediaTypeContext } from '../context/mediaType';

export const useMediaType = (): MediaTypeContext => {
	const context = useContext<MediaTypeContext>(MediaTypeContext);
	if (!context) {
		throw new Error('useMediaType must be used in a MediaTypeProvider ');
	}
	return context;
};
