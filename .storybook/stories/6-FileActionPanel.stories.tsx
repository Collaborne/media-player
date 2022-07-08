import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react';

import {
	FileActionPanel as FileActionPanelComponent,
	FileActionPanelProps,
} from '../../src/components/file-action-panel/FileActionPanel';
import {
	withDemoCard,
	withIntl,
	withPlayerTheme,
	withTheme,
	withVideoWrapper,
} from '../decorators';

export const FileActionPanel: Story<Partial<FileActionPanelProps>> = args => {
	return (
		<div
			style={{
				display: 'flex',
				width: '100%',
				flexDirection: 'column-reverse',
			}}
		>
			<FileActionPanelComponent
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
	component: FileActionPanel,
	decorators: [
		withVideoWrapper,
		withDemoCard,
		withPlayerTheme,
		withTheme,
		withIntl,
	],
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
			description: `If this video's thumbnails is set as a cover image`,
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
