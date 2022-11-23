/**
 * Helpers related to working with formatting time
 */

// Prefixes values with leading 0s
function padTime(num: number) {
	return ('0' + num).slice(-2);
}

/**
 * Converts milliseconds to HH:MM:SS format
 */
export const toTimestamp = (ms: number, short = true) => {
	const seconds = Math.round(ms / 1000);

	const minutes = Math.floor(seconds / 60);
	const sec = seconds % 60;
	const hours = Math.floor(minutes / 60);
	const min = minutes % 60;

	if (hours) {
		if (!short) {
			return `${padTime(hours)}:${padTime(min)}:${padTime(sec)}`;
		}
		return `${hours}:${padTime(min)}:${padTime(sec)}`;
	}

	return `${short ? min : padTime(min)}:${padTime(sec)}`;
};
