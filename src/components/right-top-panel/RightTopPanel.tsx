import { FC, useCallback, useState } from 'react';

import clsx from 'clsx';
import Grid from '@mui/material/Grid';
import intl from 'react-intl-universal';

import IconButton from '@mui/material/IconButton';
import {
	DeleteOutlineOutlined,
	FileDownloadOutlined,
	ImageNotSupportedOutlined,
	ImageOutlined,
} from '@mui/icons-material';

import { useRightTopPanelStyles } from './useRightTopPanelStyles';
import { Typography } from '@mui/material';

export interface RightTopPanelProps {
	onDownload: VoidFunction;
	onDelete: VoidFunction;
	setAsCover: VoidFunction;
	removeAsCover: VoidFunction;
	// If video's thumbnail is current set as cover
	isCover?: boolean;
	// Note: not all videos can have thumbnails: "Old uploaded videos do not have"
	hasImageCover?: boolean;
	className?: string;
}

export const RightTopPanel: FC<RightTopPanelProps> = ({
	onDownload,
	onDelete,
	setAsCover,
	removeAsCover,
	isCover = false,
	hasImageCover = false,
	className,
}) => {
	const [isOpened, setIsOpened] = useState(false);
	const { wrapper, iconWrapper, textWrapper } = useRightTopPanelStyles({
		isOpened,
	});

	const onMouseEnter = useCallback(() => setIsOpened(true), []);
	const onMouseLeave = useCallback(() => setIsOpened(false), []);

	return (
		<Grid
			container
			direction="column"
			justifyContent="flex-start"
			className={clsx(wrapper, className)}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<IconButton
				color="inherit"
				size="medium"
				onClick={onDownload}
				className={iconWrapper}
			>
				<FileDownloadOutlined />

				<Typography variant="button" className={textWrapper}>
					{intl.get('action.download')}
				</Typography>
			</IconButton>
			<IconButton
				color="inherit"
				size="medium"
				onClick={onDelete}
				className={iconWrapper}
			>
				<DeleteOutlineOutlined />

				<Typography variant="button" className={textWrapper}>
					{intl.get('action.delete')}
				</Typography>
			</IconButton>

			{isCover ? (
				<IconButton
					color="inherit"
					size="medium"
					onClick={removeAsCover}
					className={iconWrapper}
				>
					<ImageNotSupportedOutlined />

					<Typography variant="button" className={textWrapper}>
						{intl.get('action.remove_as_cover')}
					</Typography>
				</IconButton>
			) : (
				<IconButton
					color="inherit"
					size="medium"
					onClick={setAsCover}
					disabled={!hasImageCover}
					className={iconWrapper}
				>
					<ImageOutlined />

					<Typography variant="button" className={textWrapper}>
						{intl.get('action.set_as_cover')}
					</Typography>
				</IconButton>
			)}
		</Grid>
	);
};
