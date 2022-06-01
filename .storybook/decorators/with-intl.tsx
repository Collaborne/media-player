import intl from 'react-intl-universal';

import { StoryContext } from '@storybook/addons';

import EN from '../locales/en.json';

export const withIntl = (Story: any, context: StoryContext) => {
	intl
		.init({
			currentLocale: context.globals.locale,
			locales: {
				en: EN,
			},
		})
		.catch(err => {
			console.log(`Cannot initialize the intl support: ${err.message}`);
		});

	return <Story {...context} />;
};
