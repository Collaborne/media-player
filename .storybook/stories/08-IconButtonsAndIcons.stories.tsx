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
import { Card, Grid, IconButton } from '@mui/material';

import { VolumeMuted } from '../../src/components/icons';
import { withDemoCard, withTheme, withPlayerTheme } from '../decorators';

const UPDATED_SIZES: Array<'large' | 'small' | 'medium'> = [
	'large',
	'medium',
	'small',
];

export const IconButtonsAndIcons = () => {
	return (
		<>
			<Card sx={{ background: 'rgba(0, 0, 0, 0.72)', padding: 2 }}>
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
			</Card>
			<Card sx={{ background: 'rgba(0, 0, 0, 0.72)', padding: 2 }}>
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
							<VolumeMuted fontSize={svgSize} />
							<DeleteOutlineOutlined fontSize={svgSize} />
							<FileDownloadOutlined fontSize={svgSize} />
							<ImageNotSupportedOutlined fontSize={svgSize} />
							<ImageOutlined fontSize={svgSize} />
							<Forward10 fontSize={svgSize} />
							<Replay10 fontSize={svgSize} />
						</div>
					</Grid>
				))}
			</Card>
		</>
	);
};

export default {
	title: 'UI Kit',
	component: IconButtonsAndIcons,
	decorators: [withDemoCard, withPlayerTheme, withTheme],
};
