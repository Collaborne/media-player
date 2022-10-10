import { ThemeProvider } from '@mui/material/styles';
import { render as renderRTL, RenderOptions } from '@testing-library/react';
import { FC, ReactNode, useRef } from 'react';

import { PROVIDER_INITIAL_STATE } from '../components/core-player/types';
import { MediaContext } from '../context/media';
import { MediaProvider } from '../context/MediaProvider';
import { createPlayerTheme } from '../theme';

import { blend } from './colors';
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

export type RenderResult = ReturnType<typeof renderWithProviders>;
const playerTheme = createPlayerTheme();

export const renderWithProviders = (
	Component: ReactNode,
	options?: RenderOptions,
) =>
	renderRTL(
		<MediaProvider
			initialState={PROVIDER_INITIAL_STATE}
			getHighlightColorBlended={blend}
		>
			<ThemeProvider theme={playerTheme}>{Component}</ThemeProvider>
		</MediaProvider>,
		options,
	);

interface TestingMediaProviderProps
	extends Omit<MediaContext, 'mediaContainerRef'> {
	children?: ReactNode;
}
export const TestingMediaProvider: FC<TestingMediaProviderProps> = ({
	children,
	...props
}) => {
	const mediaContainerRef = useRef<HTMLDivElement>(null);
	const value = { ...props, mediaContainerRef };
	return (
		<MediaContext.Provider value={value}>{children}</MediaContext.Provider>
	);
};
