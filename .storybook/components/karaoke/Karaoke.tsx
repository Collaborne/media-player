import React from 'react';

import { Transcript } from '../../../src/utils/transcript';

import { TimestampStyled } from './TimestampStyled';

interface KaraokeProps {
	setCurrentTime?: (durationSec: number) => void;
	transcripts: Transcript[];
	activeTranscript?: Transcript;
}

export const Karaoke: React.FC<KaraokeProps> = ({
	setCurrentTime,
	transcripts,
	activeTranscript,
}) => {
	return (
		<div>
			{transcripts.map(({ start, end, index }) => {
				return (
					<TimestampStyled
						onClick={() => setCurrentTime?.(start)}
						key={index}
						isActive={index === activeTranscript?.index}
					>
						{`[${start} - ${end}]`}
					</TimestampStyled>
				);
			})}
		</div>
	);
};
