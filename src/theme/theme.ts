import {
	Theme,
	createTheme,
	TypeBackground,
	TypeText,
	PaletteOptions,
	TypeAction,
} from '@mui/material/styles/';

interface PlayerPaletteOptions {
	backdrop: string;
	background: Pick<TypeBackground, 'default' | 'paper'>;
	text: Pick<TypeText, 'primary' | 'secondary' | 'disabled'>;
	common: Record<'black', string>;
	action: TypeAction;
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
		palette: newPalette as unknown as PaletteOptions,
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
	}) as unknown as PlayerTheme;

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
				defaultProps: {
					disableElevation: true,
					// Workaround for https://github.com/mui-org/material-ui/issues/29598
					// Global disableRipple isn't applied to buttons
					disableRipple: true,
					color: 'inherit',
				},
				styleOverrides: {
					root: {
						...actionStates,
						background: 'red !important',
					},
					startIcon: {
						marginLeft: 0,
						marginRight: playerTheme.spacing(1),
					},
					// ******* TEXT
					// ****
					text: {
						fontSize: playerTheme.typography.caption,
					},
					textInherit: {
						color: playerTheme.palette.text.secondary,
					},
					textPrimary: {
						actionStates,
						'&.Mui-disabled, & .MuiButton-label': {
							color: playerTheme.palette.text.primary,
						},
					},
					// ******* CONTAINED
					// ****
					contained: {
						...actionStates,
					},
					containedInherit: {
						'&.Mui-disabled, & .MuiButton-label': {
							color: playerTheme.palette.text.primary,
						},
					},
					containedPrimary: {},
					// ******* OUTLINED
					// ****
					outlined: {
						...actionStates,
						padding: `4px 8px`,
						borderStyle: 'solid',
					},
					outlinedInherit: {
						color: playerTheme.palette.text.secondary,
					},
					outlinedPrimary: {
						...actionStates,
					},
				},
			},
			MuiButtonBase: {
				defaultProps: {
					// Remove ripples in the whole application
					disableRipple: true,
				},
			},

			MuiIcon: {
				styleOverrides: {
					root: {},
					colorPrimary: {},
				},
			},
			MuiIconButton: {
				defaultProps: {
					color: 'inherit',
				},
				styleOverrides: {
					root: {
						...actionStates,
						padding: playerTheme.spacing(0.75, 0.75),
						borderRadius: playerTheme.shape.borderRadius,
						height: 32,
						width: 32,
					},
					sizeSmall: {
						padding: playerTheme.spacing(0.5, 0.5),
						height: 24,
						width: 24,
					},
					colorInherit: {},
					colorPrimary: {
						...actionStates,
					},
				},
			},

			MuiSvgIcon: {
				styleOverrides: {
					root: {
						height: playerTheme.spacing(2.5),
						width: playerTheme.spacing(2.5),
					},
				},
			},

			MuiDataGrid: {},
			MuiPickersCalendarHeader: {},
			MuiTabScrollButton: {},
		},
	};
};

export const playerTheme = createPlayerTheme();
