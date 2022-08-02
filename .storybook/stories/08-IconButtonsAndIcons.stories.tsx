import {
	PauseOutlined,
	PlayArrow,
	ReplayOutlined,
	Forward10Outlined,
	FullscreenOutlined,
	PictureInPictureAltOutlined,
	Replay10Outlined,
	VolumeDown,
	VolumeUp,
	DeleteOutlineOutlined,
	FileDownloadOutlined,
	ImageNotSupportedOutlined,
	ImageOutlined,
	Forward10,
	Replay10,
} from '@mui/icons-material';
import { Paper, Grid, IconButton } from '@mui/material';

import {
	FullscreenEnterIcon,
	FullscreenExitIcon,
	PiPIcon,
	VolumeMutedIcon,
} from '../../src/components/icons';
import { withDemoCard, withPlayerTheme } from '../decorators';

const UPDATED_SIZES: Array<'large' | 'small' | 'medium'> = [
	'large',
	'medium',
	'small',
];

export const IconButtonsAndIcons = () => {
	return (
		<>
			<Paper sx={{ padding: 2 }}>
				{UPDATED_SIZES.map(iconButtonSize => (
					<div style={{ padding: 8 }}>
						IconButton size: {iconButtonSize}
						<Grid container direction="row" display="flex">
							{UPDATED_SIZES.map(svgSize => (
								<Grid
									container
									direction="column"
									display={'inline-flex'}
									width="auto"
								>
									<div style={{ padding: 8 }}>
										<div>
											<div>icon fontSize: {svgSize}</div>
										</div>
										<IconButton size={iconButtonSize}>
											<PlayArrow fontSize={svgSize} />
										</IconButton>
									</div>
								</Grid>
							))}
						</Grid>
					</div>
				))}
			</Paper>
			<Paper sx={{ padding: 2, marginTop: 2 }}>
				{UPDATED_SIZES.map(svgSize => (
					<Grid
						container
						direction="column"
						width="auto"
						alignItems={'space-between'}
					>
						<div style={{ padding: 8 }}>
							<div>
								<div>fontSize: {svgSize}</div>
							</div>
							<PlayArrow fontSize={svgSize} />
							<PauseOutlined fontSize={svgSize} />
							<ReplayOutlined fontSize={svgSize} />
							<FullscreenOutlined fontSize={svgSize} />
							<PictureInPictureAltOutlined fontSize={svgSize} />
							<Forward10Outlined fontSize={svgSize} />
							<Replay10Outlined fontSize={svgSize} />
							<VolumeDown fontSize={svgSize} />
							<VolumeUp fontSize={svgSize} />
							<DeleteOutlineOutlined fontSize={svgSize} />
							<FileDownloadOutlined fontSize={svgSize} />
							<ImageNotSupportedOutlined fontSize={svgSize} />
							<ImageOutlined fontSize={svgSize} />
							<Forward10 fontSize={svgSize} />
							<Replay10 fontSize={svgSize} />
							<VolumeMutedIcon fontSize={svgSize} />
							<FullscreenEnterIcon fontSize={svgSize} />
							<FullscreenExitIcon fontSize={svgSize} />
							<PiPIcon fontSize={svgSize} />
						</div>
					</Grid>
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
