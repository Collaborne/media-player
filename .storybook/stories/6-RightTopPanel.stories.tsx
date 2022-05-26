import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { withDemoCard, withTheme, withVideoWrapper } from '../decorators';
import {
	RightTopPanel as RightTopPanelComponent,
	RightTopPanelProps,
} from '../../src/components/right-top-panel/RightTopPanel';

export const RightTopPanel: Story<Partial<RightTopPanelProps>> = () => {
	return (
		<div
			style={{
				display: 'flex',
				width: '100%',
				flexDirection: 'column-reverse',
			}}
		>
			<RightTopPanelComponent
				onCover={action('onCover')}
				onDelete={action('onDelete')}
				onDownload={action('onDownload')}
			/>
		</div>
	);
};

export default {
	title: 'Video Player Controls',
	component: RightTopPanel,
	decorators: [withVideoWrapper, withDemoCard, withTheme],
	args: {},
	argTypes: {},
	parameters: {
		controls: { expanded: true },
	},
} as Meta;
