import { Theme, createTheme, PaletteOptions } from '@mui/material/styles/';

interface PlayerPaletteOptions extends PaletteOptions {
	backdrop?: string;
	common: Record<'black', string>;
}

interface PlayerTheme extends Omit<Theme, 'palette'> {
	palette: PlayerPaletteOptions;
}

declare module '@mui/material/styles/components' {
	interface Components {}
}

const createPlayerTheme = (): PlayerTheme => {
	const newPalette: Partial<PlayerPaletteOptions> = {
		background: {
			default: 'rgba(0, 0, 0, 0.72)',
			paper: 'rgba(252,252,252, 0.28)',
		},

		text: {
			primary: '#fff',
			secondary: 'rgba(252,252,252,0.7)',
			disabled: 'rgba(252,252,252,0.4)',
		},
		backdrop: 'rgba(0, 0, 0, 0.4)',
		common: {
			black: '#000',
		},
	};

	const basePalette = createTheme({
		palette: newPalette as PaletteOptions,
	}).palette;

	const playerTheme = createTheme({
		palette: {
			...basePalette,

			action: {
				hover: 'rgba(252,252,252,0.16)',
				hoverOpacity: 0.16,
				selected: 'rgba(252,252,252,0.32)',
				selectedOpacity: 0.32,
				active: 'rgba(252,252,252,0.32)',
				activatedOpacity: 0.32,
				focus: 'rgba(252,252,252,0.16)',
				focusOpacity: 0.6,
			},
		},
	});

	// Active config for buttons
	const actionStates = {
		'&:hover': {
			backgroundColor: playerTheme.palette.action.hover,
		},
		'&:focus': {
			backgroundColor: playerTheme.palette.action.focus,
		},
		'&:active': {
			backgroundColor: playerTheme.palette.action.active,
		},
	};

	return {
		...playerTheme,
		components: {
			MuiButton: {
				styleOverrides: {
					root: ({ ownerState }) => ({
						...actionStates,
						minWidth: 'unset',
						// color="primary"
						...(ownerState.color === 'primary' && {
							color: playerTheme.palette.text.primary,
						}),
						// variant="text"
						...(ownerState.variant === 'text' && {
							borderRadius: playerTheme.spacing(0.5),
							...(ownerState.size === 'small' && {
								borderRadius: playerTheme.spacing(0.5),
								...playerTheme.typography.caption,
								padding: playerTheme.spacing(0.5, 0),
								fontWeight: 600,
							}),
							...(ownerState.size === 'medium' && {
								...playerTheme.typography.subtitle2,
								fontWeight: 600,
								padding: playerTheme.spacing(0.625, 1),
							}),
						}),
						// variant="contained"
						...(ownerState.variant === 'contained' && {
							...(ownerState.size === 'small' && {
								...playerTheme.typography.caption,
								padding: playerTheme.spacing(0.5, 0),
								fontWeight: 600,
								borderRadius: playerTheme.spacing(0.5),
							}),
							...(ownerState.size === 'medium' && {
								...playerTheme.typography.subtitle2,
								fontWeight: 600,
								padding: playerTheme.spacing(0.625, 1),
							}),
						}),
					}),
				},
			},
			MuiIconButton: {
				styleOverrides: {
					root: ({ ownerState }) => ({
						...actionStates,
						borderRadius: playerTheme.spacing(0.5),
						color: playerTheme.palette.text.primary,
						...(ownerState.size === 'small' && {
							width: playerTheme.spacing(3),
							height: playerTheme.spacing(3),
						}),
						...(ownerState.size === 'medium' && {
							height: playerTheme.spacing(4.5),
							width: playerTheme.spacing(4.5),
						}),
						...(ownerState.size === 'large' && {
							height: playerTheme.spacing(7),
							width: playerTheme.spacing(7),
						}),
					}),
				},
			},
			MuiSvgIcon: {
				styleOverrides: {
					root: ({ ownerState }) => ({
						color: playerTheme.palette.text.primary,
						...(ownerState.fontSize === 'small' && {
							width: playerTheme.spacing(2.5),
							height: playerTheme.spacing(2.5),
						}),
						...(ownerState.fontSize === 'medium' && {
							height: 'auto',
							width: playerTheme.spacing(3.5),
						}),
						...(ownerState.fontSize === 'large' && {
							height: playerTheme.spacing(6),
							width: playerTheme.spacing(6),
						}),
					}),
				},
			},
			MuiPickersCalendarHeader: {},
			MuiTabScrollButton: {},
			MuiDataGrid: {},
		},
	};
};

export const playerTheme = createPlayerTheme();
