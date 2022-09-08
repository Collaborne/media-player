import { Button } from '@mui/material';
import { FC } from 'react';

import { Highlight } from '../../../src';

export const highlightColors = [
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

type PickRandomItem<T> = (array: T[]) => T;

export const pickRandomItem: PickRandomItem<string> = array =>
	array[Math.round(Math.random() * (array.length - 1))];

export interface RandomHighlightProps {
	addHighlightToStart: () => void;
	highlights?: Highlight[];
}

export const RandomHighlight: FC<RandomHighlightProps> = ({
	addHighlightToStart,
	highlights,
}) => {
	return (
		<div style={{ marginTop: '20px', minHeight: '200px' }}>
			<Button onClick={addHighlightToStart} variant="contained">
				Add highlight
			</Button>

			{highlights && highlights.length > 0 && (
				<>
					<div>All Highlights stored in state:</div>
					{highlights.map(highlight => (
						<div key={highlight.id}>{JSON.stringify(highlight)}</div>
					))}
				</>
			)}
		</div>
	);
};
