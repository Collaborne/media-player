import { Replay10Outlined } from '@mui/icons-material';
import { IconButton, IconButtonProps, SvgIconProps } from '@mui/material';
import { ComponentType, FC } from 'react';

import { useVideoStore } from '../../../context/VideoProvider';
import { SECONDS_TO_SKIP } from '../../../utils/constants';

interface RwdButtonProps extends IconButtonProps {
	skipSeconds?: number;
	Icon?: ComponentType<SvgIconProps>;
	svgIconProps?: SvgIconProps;
}

export const RwdButton: FC<RwdButtonProps> = ({
	Icon = Replay10Outlined,
	skipSeconds = SECONDS_TO_SKIP,
	svgIconProps,
	...props
}) => {
	const currentTime = useVideoStore(state => state.currentTime);
	const setCurrentTime = useVideoStore(state => state.setCurrentTime);
	const onRwd = () => setCurrentTime(currentTime - skipSeconds);
	console.log('RWD Button RERENDER');

	return (
		<IconButton size="medium" onClick={onRwd} data-testid="icon-rwd" {...props}>
			<Icon fontSize="medium" {...svgIconProps} />
		</IconButton>
	);
};
