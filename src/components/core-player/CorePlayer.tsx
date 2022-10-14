import CssBaseline from '@mui/material/CssBaseline';
import {
	StyledEngineProvider,
	Theme,
	ThemeProvider,
} from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import clsx from 'clsx';
import { FC, ReactNode } from 'react';

import { MediaProvider } from '../../context/MediaProvider';
import { MediaStore } from '../../store/media-store';
import { createPlayerTheme } from '../../theme';
import { Highlight } from '../../types';
import { blend, BlendColors } from '../../utils/colors';
import { MediaContainer } from '../media-container/MediaContainer';
import { useFilePlayerStyles } from '../media-container/useMediaContainerStyles';

import { CorePlayerInitialState, PROVIDER_INITIAL_STATE } from './types';

export interface CorePlayerProps {
	/** The url of the media file to be played */
	url: string;
	/** CSS class name applied to component  */
	className?: string;
	/** A MUI theme to control the stylization of the player . */
	theme?: Theme;
	/** Highlights to be displayed in the scrub bar */
	highlights?: Highlight[];
	/** Blend highlights colors in the scrub bar */
	getHighlightColorBlended?: BlendColors;
	/** Callback for media store update */
	onStoreUpdate?: (store: MediaStore) => void;
	/** `CorePlayer` initial state */
	initialState?: CorePlayerInitialState;
	children: ReactNode;
	/** Time in sec for values that will set `onAlarmUpdate` */
	timeAlarm?: number[];
	/** Time before `onAlarmUpdate` event should ran in sec */
	timeBeforeAlarm?: number;
}

export const CorePlayer: FC<CorePlayerProps> = ({
	url,
	className,
	getHighlightColorBlended = blend,
	highlights,
	onStoreUpdate,
	theme,
	initialState = PROVIDER_INITIAL_STATE,
	timeAlarm,
	timeBeforeAlarm,
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
					getHighlightColorBlended={getHighlightColorBlended}
					onStoreUpdate={onStoreUpdate}
					highlights={highlights}
					timeAlarm={timeAlarm}
					timeBeforeAlarm={timeBeforeAlarm}
				>
					<MediaContainer className={classNames} url={url}>
						{children}
					</MediaContainer>
				</MediaProvider>
			</StyledEngineProvider>
		</ThemeProvider>
	);
};
