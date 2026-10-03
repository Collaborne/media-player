let incrementingId = 0;

export const createRandomId = () => {
	if (typeof globalThis !== 'undefined') {
		const crypto = (globalThis as { crypto?: { randomUUID?: () => string } })
			.crypto;
		if (crypto?.randomUUID) {
			return crypto.randomUUID();
		}
	}
	incrementingId += 1;
	return `storybook-id-${Date.now()}-${incrementingId}`;
};
