import React from 'react';

import { Transcript } from '../../stories/shared/transcript';

import { Timestamp } from './Timestamp';

interface KaraokeProps {
	setCurrentTime?: (durationSec: number) => void;
	transcripts: Transcript[];
	activeTranscript?: Transcript;
	isPlaying: boolean;
	requestPip?: VoidFunction;
}

export const Karaoke: React.FC<KaraokeProps> = ({
	setCurrentTime,
	transcripts,
	activeTranscript,
	isPlaying,
	requestPip,
}) => {
	const onNotInViewport = React.useCallback(() => {
		if (isPlaying) {
			requestPip?.();
		}
	}, [isPlaying, requestPip]);

	return (
		<div>
			{transcripts.map(({ start, end, index }) => {
				return (
					<Timestamp
						onClick={() => setCurrentTime?.(start)}
						key={index}
						isActive={index === activeTranscript?.index}
						onNotInViewport={onNotInViewport}
					>
						{`[${start} - ${end}]`}
					</Timestamp>
				);
			})}
		</div>
	);
};
