import { IconButtonProps } from '@mui/material/IconButton';
import useEventListener from '@use-it/event-listener';
import { FC, useState } from 'react';

import { useVideo } from '../../hooks/use-video';
import { BigCenteredButton } from '../big-centered-button/BigCenteredButton';
import { BigReplayIcon } from '../icons/BigReplayIcon';

export interface CenteredReplayButtonProps {
	classNames?: string;
	iconButtonProps?: IconButtonProps;
}

export const CenteredReplayButton: FC<CenteredReplayButtonProps> = ({
	classNames,
	iconButtonProps,
}) => {
	const { api } = useVideo();
	const [isFinished, setIsFinished] = useState(false);
	const hasStarted = api?.getHasPlayedOrSeeked?.();

	// `end` event is emitted when media playing reached the end of the duration
	useEventListener(
		'end',
		() => {
			if (!hasStarted) {
				return;
			}
			setIsFinished(true);
		},
		api as unknown as HTMLElement,
	);
	if (!isFinished) {
		return null;
	}
	return (
		<BigCenteredButton
			Icon={BigReplayIcon}
			onClick={api?.play}
			classNames={classNames}
			iconButtonProps={iconButtonProps}
		/>
	);
};
