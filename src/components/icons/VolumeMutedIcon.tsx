import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { FC } from 'react';

/**
 * Wrapper that holds all the UI Components for Controls
 * @category React Component
 * @category UI Controls
 * @category Custom Icons
 */
export const VolumeMutedIcon: FC<SvgIconProps> = props => (
	<SvgIcon viewBox="0 0 24 24" {...props}>
		<path d="M3 9V15H7L12 20V4L7 9H3Z" />
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M13.7143 15.0364L20.1793 8.57141L21.4723 9.86441L15.0073 16.3294L13.7143 15.0364Z"
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M20.18 16.3294L13.715 9.86444L15.008 8.57141L21.4731 15.0364L20.18 16.3294Z"
		/>
	</SvgIcon>
);
