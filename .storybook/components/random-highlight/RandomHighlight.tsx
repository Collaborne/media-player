import { Button } from '@mui/material';
import { FC } from 'react';

import { Highlight } from '../../../src';

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
