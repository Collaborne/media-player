import { ThemeProvider } from '@mui/material/styles';
import { render as renderRTL, RenderOptions } from '@testing-library/react';
import { ReactNode } from 'react';

import { PROVIDER_INITIAL_STATE } from '../components/core-player/types';
import {
	MediaProvider,
	MediaProviderProps,
	useMediaStore,
} from '../context/MediaProvider';
import { MediaStore } from '../store/media-store';
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

/** Setup test for a component that is dependant of the `MediaProvider` context */
export function setupMediaProvider(
	Component: ReactNode,
	mediaProviderProps?: Partial<MediaProviderProps>,
) {
	const returnVal = {} as MediaStore;
	function NullComponent() {
		const mediaStore = useMediaStore();
		Object.assign(returnVal, mediaStore);
		return null;
	}
	function TestComponent() {
		return (
			<MediaProvider
				initialState={PROVIDER_INITIAL_STATE}
				getHighlightColorBlended={blend}
				{...mediaProviderProps}
			>
				<ThemeProvider theme={playerTheme}>
					{Component}
					<NullComponent />
				</ThemeProvider>
			</MediaProvider>
		);
	}
	return { ...renderRTL(<TestComponent />), mediaStore: returnVal };
}
