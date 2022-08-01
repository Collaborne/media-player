import '@mui/styles/createTheme';
import { Theme } from '@mui/material/styles';

import { TagColor as CustomColor } from '../theme';

/**
 * Define own color schema
 @see https://material-ui.com/customization/palette/#adding-new-colors
 */
declare module '@mui/material/styles/createPalette' {
	type CustomColorMap = Record<CustomColor, string>;

	interface Palette extends Partial<CustomColorMap> {
		backdrop: string;
		contrasts: Partial<ContrastColors>;
	}

	interface ContrastColors {
		1: string;
		2: string;
		3: string;
		4: string;
		5: string;
	}
	// TODO: Check the necessity to update with tags color:
	// https://github.com/Collaborne/backlog/issues/896
	interface PaletteOptions extends Partial<CustomColorMap> {
		backdrop: string;
		contrasts: Partial<ContrastColors>;
	}

	interface TypeBackground {}
}

declare module '@mui/styles' {
	interface DefaultTheme extends Theme {}
}
