import { useContext } from 'react';
import { VideoContext } from '../context/video';

export const useVideo = (): VideoContext => {
	const context = useContext<VideoContext | null>(VideoContext);
	if (!context) {
		throw new Error('useVideo must be used in a VideoProvider ');
	}
	return context;
};
