let incrementingId = 0;

export const createRandomId = () => {
	if (typeof globalThis !== 'undefined') {
		const randomUUID = (
			globalThis as { crypto?: { randomUUID?: () => string } }
		).crypto?.randomUUID;
		if (randomUUID) {
			return randomUUID();
		}
	}
	incrementingId += 1;
	return `storybook-id-${Date.now()}-${incrementingId}`;
};
