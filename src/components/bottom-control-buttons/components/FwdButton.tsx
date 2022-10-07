import { Forward10Outlined } from '@mui/icons-material';
import { IconButton, IconButtonProps, SvgIconProps } from '@mui/material';
import { ComponentType, FC } from 'react';

import { useMediaStore } from '../../../context';
import { SECONDS_TO_SKIP } from '../../../utils/constants';

interface FwdButtonProps extends IconButtonProps {
	skipSeconds?: number;
	Icon?: ComponentType<SvgIconProps>;
	svgIconProps?: SvgIconProps;
}

export const FwdButton: FC<FwdButtonProps> = ({
	Icon = Forward10Outlined,
	skipSeconds = SECONDS_TO_SKIP,
	svgIconProps,
	...props
}) => {
	const currentTime = useMediaStore(state => state.currentTime);
	const setCurrentTime = useMediaStore(state => state.setCurrentTime);
	const onFwd = () => setCurrentTime(currentTime + skipSeconds);
	console.log('FWD Button RERENDER');
	return (
		<IconButton size="medium" onClick={onFwd} data-testid="icon-fwd" {...props}>
			<Icon fontSize="medium" {...svgIconProps} />
		</IconButton>
	);
};
