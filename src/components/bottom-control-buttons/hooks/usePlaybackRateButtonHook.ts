export interface UsePlaybackRateButtonHookProps<T> {
	currentRate: T;
	setPlaybackRate: (playbackRate: T) => void;
	playbackRates: T[];
}
export interface UsePlaybackRateButtonHook {
	handleClick: VoidFunction;
}

export const usePlaybackRateButtonHook = <T>({
	currentRate,
	playbackRates,
	setPlaybackRate,
}: UsePlaybackRateButtonHookProps<T>): UsePlaybackRateButtonHook => {
	const handleClick = () => {
		// Gets the next value of playback rate, otherwise get first one
		const playbackLength = playbackRates.length - 1;
		const currentIndex = playbackRates.findIndex(el => el === currentRate);
		// currentRate should be always an item from playbackRates
		if (currentIndex === -1) {
			throw Error(
				`${currentRate} should belong to ${JSON.stringify(playbackRates)}`,
			);
		}
		if (playbackLength === currentIndex) {
			return setPlaybackRate(playbackRates[0]);
		}
		return setPlaybackRate(playbackRates[currentIndex + 1]);
	};

	return { handleClick };
};
