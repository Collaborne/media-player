import { FC } from 'react';
import cn from 'clsx';

import IconButton, {
	IconButtonProps,
} from '@mui/material/IconButton/IconButton';
import SvgIcon from '@mui/material/SvgIcon/SvgIcon';

import { useCenteredPlayButtonStyles } from './centered-play-button.styles';

interface CenteredPlayButtonProps {
	onClick?: VoidFunction;
	classNames?: string;
	iconButtonProps?: IconButtonProps;
}

export const CenteredPlayButton: FC<CenteredPlayButtonProps> = ({
	onClick,
	classNames,
	iconButtonProps,
}) => {
	const { controlsWrapper, svgStyle } = useCenteredPlayButtonStyles();

	return (
		<div className={cn(controlsWrapper, classNames)}>
			<IconButton onClick={onClick} {...iconButtonProps}>
				<SvgIcon className={svgStyle} viewBox="0 0 64 64">
					<path
						fill="rgba(242, 242, 242, 0.24)"
						d="M32,64c17.7,0,32-14.3,32-32S49.7,0,32,0S0,14.3,0,32S14.3,64,32,64z"
					/>
					<path
						fill="rgba(242, 242, 242, 0.96)"
						d="M32,60c15.5,0,28-12.5,28-28S47.5,4,32,4S4,16.5,4,32S16.5,60,32,60z"
					/>
					<path
						fill="rgba(0, 0, 0, 0.72)"
						d="M24.5,45.1V18.9L45.1,32L24.5,45.1z"
					/>
				</SvgIcon>
			</IconButton>
		</div>
	);
};
