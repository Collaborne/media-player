export const getElementOffset = (el: HTMLElement | null) => {
	const rect = el?.getBoundingClientRect();
	return {
		left: (rect?.left || 0) + window.scrollX,
		top: (rect?.top || 0) + window.scrollY,
	};
};
