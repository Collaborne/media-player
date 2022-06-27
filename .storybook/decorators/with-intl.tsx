import { FC } from 'react';

import { StoryContext } from '@storybook/addons';
import intl from 'react-intl-universal';

import EN from '../locales/en.json';

export const withIntl = (Story: FC<StoryContext>, context: StoryContext) => {
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
