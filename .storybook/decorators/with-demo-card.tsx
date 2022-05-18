import { StoryContext } from '@storybook/addons';
import { DemoCard } from '../components/demo-card/DemoCard';

// TODO: Fixing TS via updating/implementing new addons/decorators to fix the any TS
/**
 * Adds a nice DemoCard to story (template-wrapper for stories)
 */
export const withDemoCard = (Story: any, context: StoryContext) => {
	return (
		<DemoCard title={context.name}>
			<Story {...context} />
		</DemoCard>
	);
};
