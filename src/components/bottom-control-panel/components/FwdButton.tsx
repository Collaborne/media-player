import { Forward10Outlined } from '@mui/icons-material';
import { IconButton, IconButtonProps, SvgIconProps } from '@mui/material';
import { ComponentType, FC } from 'react';

import { useVideo } from '../../../hooks';

interface FwdButtonProps extends IconButtonProps {
	skipSeconds?: number;
	Icon?: ComponentType<SvgIconProps>;
	svgIconProps?: SvgIconProps;
}

const SECONDS_TO_SKIP = 10;

export const FwdButton: FC<FwdButtonProps> = ({
	Icon = Forward10Outlined,
	skipSeconds = SECONDS_TO_SKIP,
	svgIconProps,
	...props
}) => {
	const { api } = useVideo();
	const onFwd = () =>
		api?.setCurrentTime?.(Number(api?.getCurrentTime?.()) + skipSeconds);

	return (
		<IconButton size="medium" onClick={onFwd} data-testid="icon-fwd" {...props}>
			<Icon fontSize="medium" {...svgIconProps} />
		</IconButton>
	);
};
