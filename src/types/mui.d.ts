import '@mui/styles/createTheme';

/**
 * Define own color schema
 * @see https://material-ui.com/customization/palette/#adding-new-colors
 */
declare module '@mui/material/styles/createPalette' {
	interface Palette {
		primaryVeryDark: string;
	}

	interface PaletteOptions {
		primaryVeryDark: string;
	}
}
