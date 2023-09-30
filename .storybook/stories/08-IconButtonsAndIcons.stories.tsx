import { Paper, Grid, IconButton } from '@mui/material';
import React from 'react';
import {
	PiArrowClockwise,
	PiArrowCounterClockwise,
	PiCornersIn,
	PiCornersOut,
	PiPictureInPicture,
	PiPlay,
	PiSpeakerSimpleHigh,
	PiSpeakerSimpleLow,
	PiSpeakerSimpleX,
} from 'react-icons/pi';

import { BigPauseIcon, BigPlayIcon, BigReplayIcon } from '../../src/components';
import { withDemoCard, withPlayerTheme } from '../decorators';

const UPDATED_SIZES: Array<'large' | 'small' | 'medium'> = [
	'large',
	'medium',
	'small',
];

export const IconButtonsAndIcons: React.FC = () => {
	return (
		<>
			<Paper sx={{ padding: 2, marginBottom: 3 }}>
				<h3>Fixed size icons</h3>
				<PiPlay />
				<PiSpeakerSimpleHigh />
				<PiSpeakerSimpleLow />
				<PiSpeakerSimpleX />
				<PiArrowClockwise />
				<PiArrowCounterClockwise />
				<PiCornersOut />
				<PiCornersIn />
				<PiPictureInPicture />

				<h3>Variable size icons</h3>
				{UPDATED_SIZES.map(svgSize => (
					<Grid
						key={svgSize}
						container
						direction="column"
						width="auto"
						alignItems={'space-between'}
					>
						<div style={{ padding: 4 }}>
							<div>
								<div>fontSize: {svgSize}</div>
							</div>
							<BigPauseIcon fontSize={svgSize} />
							<BigPlayIcon fontSize={svgSize} />
							<BigReplayIcon fontSize={svgSize} />
						</div>
					</Grid>
				))}
			</Paper>

			<Paper sx={{ padding: 2 }}>
				{UPDATED_SIZES.map(iconButtonSize => (
					<div key={iconButtonSize} style={{ padding: 8 }}>
						<h3>IconButton size: {iconButtonSize}</h3>
						<Grid container direction="row" display="flex">
							{UPDATED_SIZES.map(svgSize => (
								<Grid
									key={svgSize}
									container
									direction="column"
									display={'inline-flex'}
									width="auto"
								>
									<div style={{ padding: 8 }}>
										<h4>icon fontSize: {svgSize}</h4>
										<IconButton size={iconButtonSize}>
											<BigPlayIcon fontSize={svgSize} />
										</IconButton>
									</div>
								</Grid>
							))}
						</Grid>
					</div>
				))}
			</Paper>
		</>
	);
};

export default {
	title: 'UI Kit',
	component: IconButtonsAndIcons,
	decorators: [withDemoCard, withPlayerTheme],
};
