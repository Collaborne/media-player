import { createThemeOptions } from '@collaborne/carrot-styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { render as renderRTL, RenderOptions } from '@testing-library/react';
import { ReactNode } from 'react';

import { DEFAULT_CONTROLS_CONFIG } from '../components/controls/controls-config';
import { VideoProvider } from '../context';
export * from '@testing-library/react';

export type RenderResult = ReturnType<typeof renderWithProviders>;
const darkTheme = createTheme(createThemeOptions(true));

export const renderWithProviders = (
	Component: ReactNode,
	options?: RenderOptions,
) =>
	renderRTL(
		<VideoProvider controlsConfig={DEFAULT_CONTROLS_CONFIG}>
			<ThemeProvider theme={darkTheme}>{Component}</ThemeProvider>
		</VideoProvider>,
		options,
	);
