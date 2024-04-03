const path = require('path');
const webpack = require('webpack');

const storybookDotenv = require('dotenv').config({
	path: path.resolve(__dirname, '.env.storybook'),
});
const EslintWebpackPlugin = require('eslint-webpack-plugin');

// An object that contains env.storybook environment variables.
// PS: Now is used for debugging media-player only in storybooks environment
const processEnvStorybook = Object.keys(storybookDotenv.parsed).reduce(
	(c, key) => {
		c[`process.env.${key}`] = JSON.stringify(process.env[key]);

		return c;
	},
	{},
);

const injectEnv = definitions => {
	const env = 'process.env';

	if (!definitions[env]) {
		const definitionsEntries = Object.entries(definitions);
		const envValues = definitionsEntries
			.filter(([key]) => key.startsWith(env))
			.map(([key, value]) => [
				key.substring(env.length + 1),
				JSON.parse(value),
			]);

		return {
			...definitions,
			[env]: JSON.stringify(Object.fromEntries(envValues)),
		};
	}
	return definitions;
};

module.exports = {
    stories: ['./stories/*.stories.tsx'],

    addons: [
		'@storybook/preset-create-react-app',
		'@storybook/addon-actions',
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
			plugins: config.plugins
				.filter(plugin => {
					// Remove the eslint-webpack-plugin: We already check our code, storybook doesn't need to bother
					// doing it again with potentially different options.
					if (plugin instanceof EslintWebpackPlugin) {
						return false;
					}
					return true;
				})
				// Inject vars from .env file into webpack.DefinePlugin
				// https://github.com/storybookjs/storybook/issues/12270
				// Note: `debug` package needs injecting into process.env a parameter of `DEBUG=*`, that will allow debugging in storybook
				.map(plugin => {
					if (plugin instanceof webpack.DefinePlugin) {
						return new webpack.DefinePlugin(
							injectEnv({
								...plugin.definitions,
								...processEnvStorybook,
							}),
						);
					}
					return plugin;
				}),
		};
	},

    framework: {
        name: '@storybook/react-webpack5',
        options: {}
    },
};
