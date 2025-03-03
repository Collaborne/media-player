import type { Renderer, PartialStoryFn, StoryContext } from '@storybook/types';
import intl from 'react-intl-universal';

import EN from '../locales/en.json';

export const withIntl = (
	StoryFn: PartialStoryFn<Renderer>,
	context: StoryContext<Renderer>,
) => {
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
