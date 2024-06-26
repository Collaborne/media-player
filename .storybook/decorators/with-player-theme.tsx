import {
	CssBaseline,
	StyledEngineProvider,
	ThemeProvider,
} from '@mui/material';
import type { StoryContext } from '@storybook/types';
import { FC } from 'react';

import { createPlayerTheme } from '../../src/theme';

const theme = createPlayerTheme();

export const withPlayerTheme = (
	Story: FC<StoryContext>,
	context: StoryContext,
) => {
	return (
		<ThemeProvider theme={theme}>
			<StyledEngineProvider injectFirst>
				<CssBaseline />
				<Story {...context} />
			</StyledEngineProvider>
		</ThemeProvider>
	);
};
