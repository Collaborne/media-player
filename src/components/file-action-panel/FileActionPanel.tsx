import {
	DeleteOutlineOutlined,
	FileDownloadOutlined,
	ImageNotSupportedOutlined,
	ImageOutlined,
} from '@mui/icons-material';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import clsx from 'clsx';
import { FC, useState } from 'react';
import intl from 'react-intl-universal';

import { useFileActionPanelStyles } from './useFileActionPanelStyles';

/** FileActionPanel Props */
export interface FileActionPanelProps {
	/** Download the current video */
	onDownload?: VoidFunction;
	/** Delete the current video */
	onDelete?: VoidFunction;
	/** Set current note thumbnail to this video thumbnail */
	setAsCover?: VoidFunction;
	/** Remove current note thumbnail to this video thumbnail */
	removeAsCover?: VoidFunction;
	/** If video's thumbnail is current set as cover */
	isCover?: boolean;
	/** If `false` - button is disabled. Note: not all videos can have thumbnails: "Old uploaded videos do not have" */
	hasImageCover?: boolean;
	/** CSS class name applied to component */
	className?: string;
}
/** A ReactComponent that provides functionality for downloading, deleting, remove or set as cover  */
export const FileActionPanel: FC<FileActionPanelProps> = ({
	onDownload,
	onDelete,
	setAsCover,
	removeAsCover,
	isCover = false,
	hasImageCover = false,
	className,
}) => {
	const [isOpened, setIsOpened] = useState(false);
	const { wrapper, iconWrapper, textWrapper } = useFileActionPanelStyles({
		isOpened,
	}).classes;

	const onMouseEnter = () => setIsOpened(true);
	const onMouseLeave = () => setIsOpened(false);

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
					<ImageOutlined color="primary" />

					<Typography variant="button" className={textWrapper}>
						{intl.get('action.set_as_cover')}
					</Typography>
				</IconButton>
			)}
		</Grid>
	);
};
