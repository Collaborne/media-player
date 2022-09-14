export function throttle(callback: VoidFunction, interval: number) {
	let enableCall = true;

	return (...args: any[]) => {
		if (!enableCall) return;

		enableCall = false;
		callback.apply(args);
		setTimeout(() => (enableCall = true), interval);
	};
}
