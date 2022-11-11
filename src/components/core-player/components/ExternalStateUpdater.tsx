import { FC, useEffect } from 'react';

import { CorePlayerProps } from '../..';
import { useMediaStore } from '../../../context';
import { MediaType } from '../../../types';

interface ExternalStateUpdaterProps extends Pick<CorePlayerProps, 'alarms'> {
	mediaType: MediaType;
	isAudio: boolean;
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
}) => {
	const [setMediaType, setIsAudio, replaceAlarms] = useMediaStore(state => [
		state.setMediaType,
		state.setIsAudio,
		state.replaceAlarms,
	]);

	// Update `MediaStore` from external props(esp. for fields that can be updated after the store initialization)
	useEffect(() => {
		if (alarms) {
			replaceAlarms(alarms);
		}
	}, [alarms, replaceAlarms]);

	useEffect(() => {
		setIsAudio(isAudio);
		setMediaType(mediaType);
	}, [isAudio, mediaType, setIsAudio, setMediaType]);

	return null;
};
