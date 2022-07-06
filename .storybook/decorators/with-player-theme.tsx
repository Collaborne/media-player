import { ThemeProvider } from '@mui/material';
import { deepmerge } from '@mui/utils';
import { StoryContext } from '@storybook/addons';
import { FC } from 'react';

import { playerTheme } from '../../src/theme';

export const withPlayerTheme = (
	Story: FC<StoryContext>,
	context: StoryContext,
) => {
	return (
		<ThemeProvider theme={outerTheme => deepmerge(outerTheme, playerTheme)}>
			<Story {...context} />
		</ThemeProvider>
	);
};
