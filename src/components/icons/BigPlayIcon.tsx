import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { FC } from 'react';

// TODO: Integrate BigPlayIcon fill colors into main themes
export const BigPlayIcon: FC<SvgIconProps> = props => {
	return (
		<SvgIcon viewBox="0 0 24 24" {...props}>
			<path
				d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
				fill="rgba(242, 242, 242, 0.24)"
			/>
			<path
				d="M12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5C6.20101 1.5 1.5 6.20101 1.5 12C1.5 17.799 6.20101 22.5 12 22.5Z"
				fill="rgba(242, 242, 242, 0.96)"
			/>
			<path
				d="M9.20001 16.9V7.09998L16.9 12L9.20001 16.9Z"
				fill="rgba(0, 0, 0, 0.72)"
			/>
		</SvgIcon>
	);
};
