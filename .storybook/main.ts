import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
	stories: ['./stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: ['@storybook/addon-actions', '@storybook/addon-toolbars'],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
};
export default config;
