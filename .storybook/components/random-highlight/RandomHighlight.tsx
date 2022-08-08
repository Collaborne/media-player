import { Button } from '@mui/material';
import { FC } from 'react';
import { uuid } from 'uuidv4';

import { useVideo } from '../../../src';

const highlightColors = [
	'#08E8E8',
	'#F4DF82',
	'#00CF80',
	'#FF6347',
	'#F5AB35',
	'#C67FE8',
	'#C9874F',
	'#EDAEEB',
	'#89CFF0',
	'#FC6399',
	'#7FA8F0',
	'#DAF7A6',
	'#EA99FF',
];

const pickRandomItem = () =>
	highlightColors[Math.round(Math.random() * (highlightColors.length - 1))];

export const RandomHighlight: FC = () => {
	const { api } = useVideo();
	const videoDuration = api?.getDuration?.() || 0;
	const endTime = Math.random() * videoDuration;
	const startTime = Math.random() * endTime;

	const handleSaveHighlight = () => {
		api?.addHighlightToStart?.({
			startTime,
			endTime,
			color: pickRandomItem(),
			id: uuid(),
		});
	};

	const allHighlights = api?.getHighlights?.();

	return (
		<div style={{ marginTop: '20px', minHeight: '200px' }}>
			<Button onClick={handleSaveHighlight} variant="contained">
				Add highlight
			</Button>

			{allHighlights && allHighlights.length > 0 && (
				<>
					<div>All Highlights stored in state:</div>
					{allHighlights.map(highlight => (
						<div key={highlight.id}>{JSON.stringify(highlight)}</div>
					))}
				</>
			)}
		</div>
	);
};
