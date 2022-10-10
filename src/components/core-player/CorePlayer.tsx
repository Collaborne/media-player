import CssBaseline from '@mui/material/CssBaseline';
import {
	StyledEngineProvider,
	Theme,
	ThemeProvider,
} from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import clsx from 'clsx';
import { FC, ReactNode } from 'react';

import { MediaContext } from '../../context';
import { MediaProvider } from '../../context/MediaProvider';
import { MediaStore } from '../../store/media-store';
import { createPlayerTheme } from '../../theme';
import { Highlight, MediaState } from '../../types';
import { blend, BlendColors } from '../../utils/colors';
import { useFilePlayerStyles } from '../media-container/useMediaContainerStyles';
import { MediaContainer } from '../media-container/MediaContainer';

import { CorePlayerInitialState, PROVIDER_INITIAL_STATE } from './types';

export interface CorePlayerProps {
	/** The url of the media file to be played */
	url: string;
	/** CSS class name applied to component  */
	className?: string;
	/** A MUI theme to control the stylization of the player . */
	theme?: Theme;
	/** Highlights to be displayed in scrub bar */
	highlights?: Highlight[];
	/** Blending colors for highlights presented in `<ProgressBar>` */
	getHighlightColorBlended?: BlendColors;
	/** A callback that can updates MediaContext outside of the MediaProvider */
	onStoreUpdate?: (store: MediaStore) => void;
	/** State that needs to be stored in localStorage */
	persistedState?: MediaState;
	/** Provider's initialization state */
	initialState?: CorePlayerInitialState;
	children: ReactNode;
}

export const CorePlayer: FC<CorePlayerProps> = ({
	url,
	className,
	getHighlightColorBlended = blend,
	highlights,
	onStoreUpdate,
	theme,
	initialState = PROVIDER_INITIAL_STATE,
	persistedState,
	children,
}) => {
	const nestedThemes = deepmerge(createPlayerTheme(), theme || {});
	const { wrapper } = useFilePlayerStyles().classes;
	const classNames = clsx(wrapper, className);
	return (
		<ThemeProvider theme={nestedThemes}>
			<StyledEngineProvider injectFirst>
				<CssBaseline />
				<MediaProvider
					initialState={initialState}
					persistedState={persistedState}
					getHighlightColorBlended={getHighlightColorBlended}
					onStoreUpdate={onStoreUpdate}
					highlights={highlights}
				>
					<MediaContainer className={classNames} url={url}>
						{children}
					</MediaContainer>
				</MediaProvider>
			</StyledEngineProvider>
		</ThemeProvider>
	);
};
