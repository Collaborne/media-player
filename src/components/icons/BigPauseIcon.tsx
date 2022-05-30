import { FC } from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

// TODO: Integrate BigPauseIcon fill colors into main themes
export const BigPauseIcon: FC<SvgIconProps> = props => {
	return (
		<SvgIcon viewBox="0 0 24 24" {...props}>
			<circle cx="12" cy="12" r="11.4286" fill="rgba(242, 242, 242, 0.24)" />
			<path
				d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 16H9V8H11V16ZM15 16H13V8H15V16Z"
				fill="rgba(242, 242, 242, 0.96)"
			/>
			<path
				d="M11 16H9V8H11V16ZM15 16H13V8H15V16Z"
				fill="rgba(0, 0, 0, 0.72)"
			/>
		</SvgIcon>
	);
};
