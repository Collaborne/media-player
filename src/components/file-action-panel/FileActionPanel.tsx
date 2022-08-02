import {
	DeleteOutlineOutlined,
	FileDownloadOutlined,
	ImageNotSupportedOutlined,
	ImageOutlined,
} from '@mui/icons-material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import clsx from 'clsx';
import { FC, useState } from 'react';
import intl from 'react-intl-universal';

import { useFileActionPanelStyles } from './useFileActionPanelStyles';
export const FILE_ACTION_TEST_SUFFIX = 'data-test-file-action';

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
/** A ReactComponent that provides functionality for downloading, deleting, remove or set as cover */
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
	const { wrapper, buttonWrapper, gridWrapper } = useFileActionPanelStyles({
		isOpened,
	}).classes;

	const onMouseEnter = () => setIsOpened(true);
	const onMouseLeave = () => setIsOpened(false);

	return (
		<div className={clsx(wrapper, className)}>
			<Grid
				container
				direction="column"
				justifyContent="flex-start"
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				data-testid={`${FILE_ACTION_TEST_SUFFIX}-wrapper`}
				className={gridWrapper}
			>
				<Button
					variant="contained"
					color="inherit"
					size="medium"
					onClick={onDownload}
					className={buttonWrapper}
					data-testid={`${FILE_ACTION_TEST_SUFFIX}-download`}
					startIcon={<FileDownloadOutlined />}
				>
					{intl.get('action.download')}
				</Button>
				<Button
					variant="contained"
					color="inherit"
					size="medium"
					onClick={onDelete}
					className={buttonWrapper}
					data-testid={`${FILE_ACTION_TEST_SUFFIX}-delete`}
					startIcon={<DeleteOutlineOutlined />}
				>
					{intl.get('action.delete')}
				</Button>

				{isCover ? (
					<Button
						variant="contained"
						color="inherit"
						size="medium"
						onClick={removeAsCover}
						className={buttonWrapper}
						data-testid={`${FILE_ACTION_TEST_SUFFIX}-removeAsCover`}
						startIcon={<ImageNotSupportedOutlined />}
					>
						{intl.get('action.remove_as_cover')}
					</Button>
				) : (
					<Button
						variant="contained"
						color="inherit"
						size="medium"
						onClick={setAsCover}
						disabled={!hasImageCover}
						className={buttonWrapper}
						data-testid={`${FILE_ACTION_TEST_SUFFIX}-setAsCover`}
						startIcon={<ImageOutlined color="primary" />}
					>
						{intl.get('action.set_as_cover')}
					</Button>
				)}
			</Grid>
		</div>
	);
};
