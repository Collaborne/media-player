import '@mui/styles/createTheme';
import { Theme } from '@mui/material/styles';

import { CustomColor } from '../theme';

export {};

/**
 * Colors used for tags
 */
interface TagColors {
	turquoise: string;
	yellow: string;
	green: string;
	red: string;
	orange: string;
	purple: string;
	brown: string;
	pink: string;
	blue: string;
	raspberry: string;
	navy: string;
	lime: string;
}

/**
 * Colors used e.g. for project background
 */
interface ProjectColors {
	orange: string;
	green: string;
	purple: string;
	blue: string;
	brown: string;
	yellow: string;
	red: string;
	grey: string;
	pink: string;
	turquoise: string;
}

/**
 * Define own color schema
 * @see https://material-ui.com/customization/palette/#adding-new-colors
 */
declare module '@mui/material/styles/createPalette' {
	type CustomColorMap = Record<CustomColor, string>;

	export interface Palette extends Partial<CustomColorMap> {
		/** Color for indicator icons */
		icon: string;

		comment: string;

		primaryVeryLight: string;
		primaryVeryDark: string;
		selection: string;

		tags: TagColors;
		project: ProjectColors;

		contrasts: Partial<ContrastColors>;
	}

	interface ContrastColors {
		1: string;
		2: string;
		3: string;
		4: string;
		5: string;
	}
	interface PaletteOptions extends Partial<CustomColorMap> {
		icon: string;
		comment: string;
		primaryVeryLight: string;
		primaryVeryDark: string;
		selection: string;

		tags: TagColors;
		project: ProjectColors;

		contrasts: Partial<ContrastColors>;
	}

	interface TypeBackground {
		/**
		 * Paper on elevation 2
		 */
		paper2: string;
		/**
		 * Paper on elevation 3
		 */
		paper3: string;
	}

	interface TypeText {
		error: string;
		warning: string;
		success: string;
		link: string;
		hint: string;
	}
}

declare module '@mui/material/styles/components' {
	interface Components {
		MuiDataGrid: any;
		MuiPickersCalendarHeader: any;
		MuiTabScrollButton: any;
	}
}

declare module '@mui/styles' {
	interface DefaultTheme extends Theme {}
}
