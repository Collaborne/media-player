import type { StoryContext } from '@storybook/types';
import { FC } from 'react';

import { DemoCard } from '../components/demo-card/DemoCard';

/** Adds a nice DemoCard to story (template-wrapper for stories) */
export const withDemoCard = (
	Story: FC<StoryContext>,
	context: StoryContext,
) => {
	return (
		<DemoCard title={context.name}>
			<Story {...context} />
		</DemoCard>
	);
};
