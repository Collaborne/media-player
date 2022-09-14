import { Replay10Outlined } from '@mui/icons-material';
import { IconButton, IconButtonProps, SvgIconProps } from '@mui/material';
import { ComponentType, FC } from 'react';

import { useVideo } from '../../../hooks';

interface RwdButtonProps extends IconButtonProps {
	skipSeconds?: number;
	Icon?: ComponentType<SvgIconProps>;
	svgIconProps?: SvgIconProps;
}

const SECONDS_TO_SKIP = 10;

export const RwdButton: FC<RwdButtonProps> = ({
	Icon = Replay10Outlined,
	skipSeconds = SECONDS_TO_SKIP,
	svgIconProps,
	...props
}) => {
	const { api } = useVideo();
	const onRwd = () =>
		api?.setCurrentTime?.(Number(api?.getCurrentTime?.()) - skipSeconds);

	return (
		<IconButton size="medium" onClick={onRwd} data-testid="icon-rwd" {...props}>
			<Icon fontSize="medium" {...svgIconProps} />
		</IconButton>
	);
};
