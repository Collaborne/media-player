import { FC } from 'react';

import { useVideo } from '../../../hooks';

import { RailsList } from './RailsList';
import { RailStyled } from './RailStyled';

interface RailProps {}

export const Rail: FC<RailProps> = () => {
	const { api, highlights, getHighlightColorBlended } = useVideo();

	// If we do not have highlights, then display a simple Rail
	if (!highlights || highlights.length === 0) {
		return <RailStyled />;
	}

	const videoDuration = api?.getDuration?.() || 0;

	// Create a list of rails from highlight segments
	return (
		<RailsList
			highlights={highlights}
			videoDuration={videoDuration}
			getHighlightColorBlended={getHighlightColorBlended}
		/>
	);
};
