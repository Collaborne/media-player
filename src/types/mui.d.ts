import '@mui/styles/createTheme';

/**
 * Define own color schema
 * @see https://material-ui.com/customization/palette/#adding-new-colors
 */
declare module '@mui/material/styles/createPalette' {
	interface Palette {
		/** Blurring background for all components that have a background */
		backdropFilter: string;
	}

	interface PaletteOptions {
		/** Blurring background for all components that have a background */
		backdropFilter: string;
	}
}
