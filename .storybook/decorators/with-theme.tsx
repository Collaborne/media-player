import { useCallback, useMemo, useState } from 'react';
import { createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { StoryContext } from '@storybook/addons';
import { createThemeOptions } from '@collaborne/carrot-styles';

import { ThemeSwitcher } from '../../src/components/theme-switcher/theme-switcher.component';

const lightTheme = createTheme(createThemeOptions(false));
const darkTheme = createTheme(createThemeOptions(true));

export const withTheme = (Story: any, context: StoryContext) => {
	const [isLightTheme, setIsLightTheme] = useState<boolean>(true);
	const onSwitchTheme = useCallback(() => {
		setIsLightTheme(prevState => !prevState);
	}, []);

	const theme = useMemo(
		() => (isLightTheme ? lightTheme : darkTheme),
		[isLightTheme],
	);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<ThemeSwitcher onSwitchTheme={onSwitchTheme} />
			<div
				style={{
					backgroundColor: theme.palette.background.default,
					color: theme.palette.text.primary,
					padding: theme.spacing(3),
				}}
			>
				<Story {...context} />
			</div>
		</ThemeProvider>
	);
};
