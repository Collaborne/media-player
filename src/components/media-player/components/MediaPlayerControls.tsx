import { Box } from '@mui/material';
import { CSSProperties, FC, memo, ReactNode } from 'react';

import { useMediaStore } from '../../../context/index.js';
import { useIsAudio } from '../../../hooks/index.js';
import { CollapseIconButton } from '../../bottom-control-buttons/components/CollapseIconButton.js';
import {
	VolumeButton,
	VolumeSlider,
	RwdButton,
	PlayPauseReplay,
	FwdButton,
	PlaybackRateButton,
	FullscreenButton,
} from '../../bottom-control-buttons/index.js';
import { BottomControls } from '../../bottom-controls/BottomControls.js';
import { useControlsStyles, Controls } from '../../controls/index.js';
import { PauseAnimation } from '../../play-pause-animation/PauseAnimation.js';
import { PlayAnimation } from '../../play-pause-animation/PlayAnimation.js';
import { ProgressTimerDisplay } from '../../progress-bar/ProgressTimerDisplay.js';
import { useMediaPlayerStyles } from '../useMediaPlayerStyles.js';

import { AdditionalControls } from './AdditionalControls.js';
import { MediaPlayerControlButtons } from './MediaPlayerControlButtons.js';

export interface MediaPlayerControlsProps {
	isCollapsed: boolean;
	toggleCollapse?: VoidFunction;
	'data-testid'?: string;
}

function ControlGridGroup({
	children,
	justifyContent,
}: {
	children: ReactNode;
	justifyContent: CSSProperties['justifyContent'];
}) {
	const { classes: playerClasses } = useMediaPlayerStyles();
	return (
		<Box className={playerClasses.gridCentered} sx={{ justifyContent }}>
			{children}
		</Box>
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
				<BottomControls>
					<MediaPlayerControlButtons isCollapsed={isCollapsed}>
						<ProgressTimerDisplay />
						<Box
							sx={{
								display: 'flex',
								flexWrap: 'nowrap',
								justifyContent: 'space-between',
							}}
						>
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
						</Box>
					</MediaPlayerControlButtons>
				</BottomControls>
			</Controls>
		);
	},
);
