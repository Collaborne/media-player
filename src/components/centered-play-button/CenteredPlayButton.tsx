import { IconButtonProps } from '@mui/material/IconButton';
import { FC } from 'react';
import { PiPlayCircleFill } from 'react-icons/pi';

import { useMediaStore } from '../../context';
import { useIsAudio } from '../../hooks';
import { CENTERED_PLAY_BUTTON } from '../../utils/constants';
import { BigCenteredButton } from '../big-centered-button/BigCenteredButton';

export interface CenteredPlayButtonProps {
	classNames?: string;
	iconButtonProps?: IconButtonProps;
}

/**
 * Component shown before a media has started
 * @category React Component
 * @category UI Controls
 */
export const CenteredPlayButton: FC<CenteredPlayButtonProps> = ({
	classNames,
	iconButtonProps,
}) => {
	const isAudio = useIsAudio();
	const hasStarted = useMediaStore(state => state.hasPlayedOrSeeked);
	const play = useMediaStore(state => state.play);

	if (hasStarted || isAudio) {
		return null;
	}

	return (
		<BigCenteredButton
			Icon={PiPlayCircleFill}
			onClick={play}
			classNames={classNames}
			iconButtonProps={{
				'data-testid': CENTERED_PLAY_BUTTON,
				...iconButtonProps,
			}}
		/>
	);
};
