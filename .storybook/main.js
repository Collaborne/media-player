const EslintWebpackPlugin = require('eslint-webpack-plugin');

module.exports = {
	core: {
		builder: 'webpack5',
	},
	stories: ['./stories/*.stories.tsx'],
	addons: [
		'@storybook/preset-create-react-app',
		'@storybook/addon-actions',
		'@storybook/addon-docs',
		'@storybook/addon-links',
		'@storybook/addon-controls',
		'@storybook/addon-toolbars',
	],
	typescript: {
		reactDocgen: 'none',
	},
	// See https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#emotion11-quasi-compatibility
	features: {
		emotionAlias: false,
	},
	webpackFinal: config => {
		return {
			...config,
			performance: {
				hints: false,
			},
			plugins: config.plugins.filter(plugin => {
				// Remove the eslint-webpack-plugin: We already check our code, storybook doesn't need to bother
				// doing it again with potentially different options.
				if (plugin instanceof EslintWebpackPlugin) {
					return false;
				}
				return true;
			}),
		};
	},
};
