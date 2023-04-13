import { FC, useEffect } from 'react';
import { shallow } from 'zustand/shallow';

import { CorePlayerProps } from '../..';
import { useMediaStore } from '../../../context';
import { MediaType } from '../../../types';

interface ExternalStateUpdaterProps extends Pick<CorePlayerProps, 'alarms'> {
	mediaType: MediaType;
	isAudio: boolean;
	isPipEnabled: boolean;
}
/**
 * Component that updates MediaStore from external values
 * @category React Component
 * @category MediaStore
 */
export const ExternalStateUpdater: FC<ExternalStateUpdaterProps> = ({
	alarms,
	mediaType,
	isAudio,
	isPipEnabled,
}) => {
	const [setMediaType, setIsAudio, replaceAlarms, setIsPipEnabled] =
		useMediaStore(
			state => [
				state.setMediaType,
				state.setIsAudio,
				state.replaceAlarms,
				state.setIsPipEnabled,
			],
			shallow,
		);

	// Update `MediaStore` from external props(esp. for fields that can be updated after the store initialization)
	useEffect(() => {
		if (alarms) {
			replaceAlarms(alarms);
		}
	}, [alarms, replaceAlarms]);

	useEffect(() => {
		setIsAudio(isAudio);
		setMediaType(mediaType);
		setIsPipEnabled(isPipEnabled);
	}, [
		isAudio,
		isPipEnabled,
		mediaType,
		setIsAudio,
		setIsPipEnabled,
		setMediaType,
	]);

	return null;
};
