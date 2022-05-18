import { createThemeOptions } from '@collaborne/carrot-styles';
import {
	createTheme,
	StyledEngineProvider,
	ThemeProvider,
	CssBaseline,
} from '@mui/material';

import { StoryContext } from '@storybook/addons';

const lightTheme = createTheme(createThemeOptions(false));
const darkTheme = createTheme(createThemeOptions(true));

// Known issues: storybook throws a warning "an uncontrolled input of type checkbox"
// @see https://github.com/storybookjs/storybook/issues/10967

const darkModeToTheme = {
	dark: darkTheme,
	light: lightTheme,
};

export const withTheme = (Story: any, context: StoryContext) => {
	const theme = darkModeToTheme[context.globals.theme];
	return (
		<ThemeProvider theme={theme}>
			<StyledEngineProvider injectFirst>
				<CssBaseline />
				<div
					style={{
						backgroundColor: theme.palette.background.default,
						color: theme.palette.text.primary,
						padding: theme.spacing(3),
					}}
				>
					<Story {...context} />
				</div>
			</StyledEngineProvider>
		</ThemeProvider>
	);
};
