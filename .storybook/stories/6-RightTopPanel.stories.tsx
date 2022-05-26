import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { withDemoCard, withTheme, withVideoWrapper } from '../decorators';
import {
	RightTopPanel as RightTopPanelComponent,
	RightTopPanelProps,
} from '../../src/components/right-top-panel/RightTopPanel';

export const RightTopPanel: Story<Partial<RightTopPanelProps>> = args => {
	return (
		<div
			style={{
				display: 'flex',
				width: '100%',
				flexDirection: 'column-reverse',
			}}
		>
			<RightTopPanelComponent
				setAsCover={action('setAsCover')}
				removeAsCover={action('removeAsCover')}
				onDelete={action('onDelete')}
				onDownload={action('onDownload')}
				className={args.className}
				hasImageCover={args.hasImageCover}
				isCover={args.isCover}
			/>
		</div>
	);
};

export default {
	title: 'Video Player Controls',
	component: RightTopPanel,
	decorators: [withVideoWrapper, withDemoCard, withTheme],
	args: {
		isCover: false,
		hasImageCover: false,
		className: '',
	},
	argTypes: {
		hasImageCover: {
			name: 'props.hasImageCover',
			description:
				'Video has a cover image! Some video do not have thumbnails!',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: false },
			},
		},
		isCover: {
			name: 'props.isCover',
			description: "If this video's thumbnails is set as a cover image ",
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: false },
			},
		},
		className: {
			name: 'props.className',
			description: 'Class name applied to div*wrapper of the component',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: undefined },
			},
		},
	},
	parameters: {
		controls: { expanded: true },
	},
} as Meta;
