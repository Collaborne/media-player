import { useContext } from 'react';

import { MediaContext } from '../context/media';

export const useMedia = (): MediaContext => {
	const context = useContext<MediaContext | null>(MediaContext);
	if (!context) {
		throw new Error('useMedia must be used in a MediaProvider ');
	}
	return context;
};
