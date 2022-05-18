export const parameters = {
	controls: { expanded: true },
};
//TODO: Add Internationalization packet/toolbar
export const globalTypes = {
	theme: {
		name: 'Dark Mode',
		description: 'Dark mode enabled/disabled',
		defaultValue: 'light',
		toolbar: {
			icon: 'circlehollow',
			items: [
				{ value: 'light', icon: 'circlehollow', title: 'Light mode' },
				{ value: 'dark', icon: 'circle', title: 'Dark mode' },
			],
		},
	},
};
