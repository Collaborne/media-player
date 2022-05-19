import '@mui/styles/createTheme';
import { Theme } from '@mui/material/styles';
import type { CustomColor } from '@collaborne/carrot-styles';

import type {
	ProjectColors,
	TagColors,
} from '@collaborne/carrot-styles/src/types/material-ui';

/**
 * Define own color schema
 * @see https://material-ui.com/customization/palette/#adding-new-colors
 */
declare module '@mui/material/styles/createPalette' {
	type CustomColorMap = Record<CustomColor, string>;

	interface ContrastColors {
		1: string;
		2: string;
		3: string;
		4: string;
		5: string;
	}
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
