import Grid, { GridProps } from '@mui/material/Grid';
import { FC, memo } from 'react';

import { useMediaStore } from '../../../context';
import { useIsAudio } from '../../../hooks';
import {
	VolumeButton,
	VolumeSlider,
	RwdButton,
	PlayPauseReplay,
	FwdButton,
	PlaybackRateButton,
	FullscreenButton,
} from '../../bottom-control-buttons';
import { CollapseIconButton } from '../../bottom-control-buttons/components/CollapseIconButton';
import { BottomControls } from '../../bottom-controls/BottomControls';
import { CenteredPlayButton } from '../../centered-play-button/CenteredPlayButton';
import { CenteredReplayButton } from '../../centered-replay-button/CenteredReplayButton';
import { useControlsStyles, Controls } from '../../controls';
import { PauseAnimation } from '../../play-pause-animation/PauseAnimation';
import { PlayAnimation } from '../../play-pause-animation/PlayAnimation';
import { ProgressTimerDisplay } from '../../progress-bar/ProgressTimerDisplay';
import { useMediaPlayerStyles } from '../useMediaPlayerStyles';

import { AdditionalControls } from './AdditionalControls';
import { MediaPlayerControlButtons } from './MediaPlayerControlButtons';

export interface MediaPlayerControlsProps {
	isCollapsed: boolean;
	toggleCollapse?: VoidFunction;
	'data-testid'?: string;
}

function ControlGridGroup({
	children,
	justifyContent,
}: Pick<GridProps, 'justifyContent' | 'children'>) {
	const { classes: playerClasses } = useMediaPlayerStyles();
	return (
		<Grid
			item
			className={playerClasses.gridCentered}
			xs
			justifyContent={justifyContent}
		>
			{children}
		</Grid>
	);
}

/**
 * Wrapper that includes media controls
 * @category React Component
 * @category UI Controls
 */
export const MediaPlayerControls: FC<MediaPlayerControlsProps> = memo(
	({ isCollapsed, toggleCollapse }) => {
		const isAudio = useIsAudio();
		const { controls } = useControlsStyles({ isCollapsed }).classes;
		const isFullscreen = useMediaStore(state => state.isFullscreen);

		const showCollapseButton = toggleCollapse && !isAudio && !isFullscreen;

		return (
			<Controls className={controls}>
				{!isCollapsed && (
					<>
						<PlayAnimation />
						<PauseAnimation />
						<AdditionalControls />
					</>
				)}
				<Grid className={controls}>
					<CenteredPlayButton />
					<CenteredReplayButton />
				</Grid>
				<BottomControls>
					<MediaPlayerControlButtons isCollapsed={isCollapsed}>
						<ProgressTimerDisplay />
						<Grid container direction="row" flexWrap="nowrap">
							<ControlGridGroup justifyContent="flex-start">
								<VolumeButton />
								<VolumeSlider />
							</ControlGridGroup>
							<ControlGridGroup justifyContent="center">
								<RwdButton />
								<PlayPauseReplay svgIconSize="medium" />
								<FwdButton />
							</ControlGridGroup>
							<ControlGridGroup justifyContent="flex-end">
								<PlaybackRateButton size="small" />
								{showCollapseButton && (
									<CollapseIconButton
										isCollapsed={isCollapsed}
										onToggleCollapse={toggleCollapse}
									/>
								)}
								{!isCollapsed && <FullscreenButton />}
							</ControlGridGroup>
						</Grid>
					</MediaPlayerControlButtons>
				</BottomControls>
			</Controls>
		);
	},
);
