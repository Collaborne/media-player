import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const VolumeMuted: FC<SvgIconProps> = props => (
	<SvgIcon viewBox="0 0 24 24" {...props}>
		<path d="M3.42859 8.99998V15H7.42859L12.4286 20V4L7.42859 8.99998H3.42859Z" />
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M13.7142 15.0364L20.1792 8.57141L21.4723 9.86441L15.0072 16.3294L13.7142 15.0364Z"
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M20.1799 16.3293L13.7148 9.86441L15.0079 8.57141L21.4729 15.0364L20.1799 16.3293Z"
		/>
	</SvgIcon>
);
