import CssBaseline from '@mui/material/CssBaseline';
import {
	StyledEngineProvider,
	Theme,
	ThemeProvider,
} from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import { FC, ReactNode, RefObject, memo } from 'react';

import { MediaProvider } from '../../context/MediaProvider';
import { PIPContextProvider } from '../../context/PIPControlsProvider';
import { MediaStore } from '../../store/media-store';
import { createPlayerTheme } from '../../theme';
import { Highlight, MediaType } from '../../types';
import { blend, BlendColors } from '../../utils/colors';
import { MediaContainer } from '../media-container/MediaContainer';
import { useFilePlayerStyles } from '../media-container/useMediaContainerStyles';

import { ExternalStateUpdater } from './components/ExternalStateUpdater';
import { CorePlayerInitialState, CORE_PLAYER_INITIAL_STATE } from './types';
import { useCorePlayerHook } from './useCorePlayerHook';

/** Default positioning on X and Y axis of PIP player */
const DEFAULT_AXIS_DISTANCE = 16;

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
	/** Trigger points (in sec) when an alert event is emitted */
	alarms?: number[];
	/** URL to image that is displayed in PIP player for audio files */
	audioPlaceholder?: string;
	/** Url file type */
	mediaType?: MediaType;
	/** Builds UI for the PIP Player */
	PIPControls?: FC;
	/** Distance from window border right, on X axis in `pixels`, for PIP player position initialization */
	xAxisDistance?: number;
	/** Distance from window border bottom, on Y axis in `pixels`, for PIP player position initialization */
	yAxisDistance?: number;
	/** <video /> tags wrapper className */
	reactPlayerClassName?: string;
	/** Container where PIP player will be mounted By default PIP player is added as a child of document.body */
	pipContainer?: RefObject<HTMLDivElement>;
	/** ClassName for pip container where PIP player layout belongs too */
	pipPortalClassName?: string;
}

/**
 * The core of the player. With all media logics and functionality but without any UI Controls .
 * @category React Component
 * @category Player
 */
export const CorePlayer: FC<CorePlayerProps> = memo(
	({
		url,
		className,
		getHighlightColorBlended = blend,
		highlights,
		onStoreUpdate,
		theme,
		initialState = CORE_PLAYER_INITIAL_STATE,
		alarms,
		audioPlaceholder,
		children,
		mediaType: initialMediaType,
		PIPControls,
		xAxisDistance,
		yAxisDistance,
		reactPlayerClassName,
		pipContainer,
		pipPortalClassName,
	}) => {
		const { mediaType } = useCorePlayerHook({ url, initialMediaType });
		const isAudio = mediaType === 'audio';
		const nestedThemes = deepmerge(createPlayerTheme(), theme || {});
		const { classes, cx } = useFilePlayerStyles({ isAudio });
		const classNames = cx(classes.wrapper, className);

		return (
			<ThemeProvider theme={nestedThemes}>
				<StyledEngineProvider injectFirst>
					<CssBaseline />
					<PIPContextProvider PIPControls={PIPControls}>
						<MediaProvider
							initialState={initialState}
							getHighlightColorBlended={getHighlightColorBlended}
							onStoreUpdate={onStoreUpdate}
							highlights={highlights}
							alarms={alarms}
							mediaType={mediaType}
							isAudio={isAudio}
						>
							<ExternalStateUpdater
								alarms={alarms}
								mediaType={mediaType}
								isAudio={isAudio}
							/>
							<MediaContainer
								className={classNames}
								url={url}
								audioPlaceholder={audioPlaceholder}
								xAxisDistance={xAxisDistance ?? DEFAULT_AXIS_DISTANCE}
								yAxisDistance={yAxisDistance ?? DEFAULT_AXIS_DISTANCE}
								reactPlayerClassName={reactPlayerClassName}
								pipContainer={pipContainer}
								pipPortalClassName={pipPortalClassName}
							>
								{children}
							</MediaContainer>
						</MediaProvider>
					</PIPContextProvider>
				</StyledEngineProvider>
			</ThemeProvider>
		);
	},
);
