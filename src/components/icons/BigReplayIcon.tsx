import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { FC } from 'react';

/**
 * Wrapper that holds all the UI Components for Controls
 * @category React Component
 * @category UI Controls
 * @category Custom Icons
 */
// TODO: Integrate BigReplayIcon fill colors into main themes
export const BigReplayIcon: FC<SvgIconProps> = props => {
	return (
		<SvgIcon viewBox="0 0 24 24" {...props}>
			<circle
				cx="12"
				cy="12"
				r="11.4286"
				fill="gba(242, 242, 242, 0.24)"
				fillOpacity="0.24"
			/>
			<circle cx="12" cy="12" r="10" fill="gba(242, 242, 242, 0.24)" />
			<circle cx="12" cy="12" r="9.5" fill="rgba(242, 242, 242, 0.96)" />
			<path
				d="M12 8.00001V5.71429L9.14287 8.57144L12 11.4286V9.14287C13.8914 9.14287 15.4286 10.68 15.4286 12.5714C15.4286 14.4629 13.8914 16 12 16C10.1086 16 8.57145 14.4629 8.57145 12.5714H7.42859C7.42859 15.0972 9.4743 17.1429 12 17.1429C14.5257 17.1429 16.5714 15.0972 16.5714 12.5714C16.5714 10.0457 14.5257 8.00001 12 8.00001Z"
				fill="rgba(0, 0, 0, 0.72)"
			/>
		</SvgIcon>
	);
};
