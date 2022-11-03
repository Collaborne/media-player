import '@mui/styles/createTheme';

/**
 * Define own color schema
 * @see https://material-ui.com/customization/palette/#adding-new-colors
 */
declare module '@mui/material/styles/createPalette' {
	interface Palette {
		primaryVeryDark: string;
		/** Blurring background for all components that have a background */
		backgroundBlur: string;
	}

	interface PaletteOptions {
		primaryVeryDark: string;
		/** Blurring background for all components that have a background */
		backgroundBlur: string;
	}
}
