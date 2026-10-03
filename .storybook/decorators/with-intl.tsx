import type { Decorator } from '@storybook/react';
import intl from 'react-intl-universal';

import EN from '../locales/en.json';

export const withIntl: Decorator = (StoryFn, context) => {
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

	return StoryFn(context);
};
