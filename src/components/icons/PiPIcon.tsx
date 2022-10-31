import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { FC } from 'react';

/**
 * Wrapper that holds all the UI Components for Controls
 * @category React Component
 * @category UI Controls
 * @category Custom Icons
 */
export const PiPIcon: FC<SvgIconProps> = props => (
	<SvgIcon viewBox="0 0 24 24" {...props}>
		<path d="M18 12C18 11.4477 17.5523 11 17 11H11C10.4477 11 10 11.4477 10 12V16C10 16.5523 10.4477 17 11 17H17C17.5523 17 18 16.5523 18 16V12ZM22 19V4.98C22 3.88 21.1 3 20 3H4C2.9 3 2 3.88 2 4.98V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19ZM20 19.02H4V4.97H20V19.02Z" />
	</SvgIcon>
);
