import { StoryContext } from '@storybook/addons';

// TODO: Fixing TS via updating/implementing new addons/decorators to fix the any TS
/**
 * Adds video wrapper for styles simulation
 * added borderColor and radiuses style={{ display: 'flex', height: '380px', width: '640px' }}
 */
export const withVideoWrapper = (Story: any, context: StoryContext) => {
	return (
		<div
			style={{
				display: 'flex',
				height: '480px',
				width: '640px',
				borderRadius: ' 4px 4px 0 0',
				borderColor: 'grey',
				overflow: 'hidden',
				backgroundImage: 'url("https://picsum.photos/640/480")',
			}}
			title={context.name}
		>
			<Story {...context} />
		</div>
	);
};
