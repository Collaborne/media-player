import CssBaseline from '@mui/material/CssBaseline';
import {
	StyledEngineProvider,
	Theme,
	ThemeProvider,
} from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import { FC, ReactNode, RefObject, memo } from 'react';

import { MediaProvider, MediaProviderProps } from '../../context/MediaProvider';
import { PIPContextProvider } from '../../context/PIPControlsProvider';
import { createPlayerTheme } from '../../theme';
import { blend } from '../../utils/colors';
import { MediaContainer } from '../media-container/MediaContainer';
import { useFilePlayerStyles } from '../media-container/useMediaContainerStyles';

import { ExternalStateUpdater } from './components/ExternalStateUpdater';
import { useCorePlayerHook } from './hooks/useCorePlayerHook';
import { CORE_PLAYER_INITIAL_STATE } from './types';

/** Default positioning on X and Y axis of PIP player */
const DEFAULT_AXIS_DISTANCE = 16;

export interface CorePlayerProps
	extends Partial<
		Pick<
			MediaProviderProps,
			| 'initialState'
			| 'getHighlightColorBlended'
			| 'onStoreUpdate'
			| 'highlights'
			| 'alarms'
			| 'isPipEnabled'
		>
	> {
	/** The url of the media file to be played */
	url: string;
	/** CSS class name applied to component  */
	className?: string;
	/** A MUI theme to control the stylization of the player . */
	theme?: Theme;
	children: ReactNode;

	/** URL to image that is displayed in PIP player for audio files */
	audioPlaceholder?: string;
	/** Url mime type */
	mediaType?: string;
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
		highlights,
		onStoreUpdate,
		theme,
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
		getHighlightColorBlended = blend,
		initialState = CORE_PLAYER_INITIAL_STATE,
		isPipEnabled = true,
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
							isPipEnabled={isPipEnabled}
						>
							<ExternalStateUpdater
								alarms={alarms}
								mediaType={mediaType}
								isAudio={isAudio}
								isPipEnabled={isPipEnabled}
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
