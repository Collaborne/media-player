import { PaletteOptions, Components, Theme } from '@mui/material/styles/';

interface PlayerPaletteOptions
	extends Pick<PaletteOptions, 'background' | 'text'> {
	backdrop?: string;
	common?: Record<'black', string>;
}

interface PlayerComponents
	extends Pick<Components, 'MuiSvgIcon' | 'MuiButton' | 'MuiIconButton'> {}

/** Player theme, that should be merged into mui Theme */
interface PlayerTheme {
	palette: PlayerPaletteOptions;
	components: PlayerComponents;
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

	const playerTheme = {
		palette: {
			...newPalette,

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
	};

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
					// Overriding https://github.com/Collaborne/carrot-styles/blob/35ec01752f68d1504c10b7a9dbb7eabc2004641b/src/theme.ts#L380-L396
					containedPrimary: {
						...actionStates,
					},
					root: ({ ownerState, theme }) => {
						const outerTheme = theme as Theme;
						return {
							...actionStates,
							minWidth: 'unset',
							// color="primary"
							...(ownerState.color === 'primary' && {
								color: playerTheme.palette.text?.secondary,
							}),
							// variant="text"
							...(ownerState.variant === 'text' && {
								borderRadius: outerTheme.spacing(0.5),

								...(ownerState.size === 'small' && {
									borderRadius: outerTheme.spacing(0.5),
									...outerTheme.typography.caption,
									padding: outerTheme.spacing(0.5, 0),
									fontWeight: 600,
								}),
								...(ownerState.size === 'medium' && {
									...outerTheme.typography.subtitle2,
									fontWeight: 600,
									padding: outerTheme.spacing(0.625, 1),
								}),
							}),

							// variant="contained"
							...(ownerState.variant === 'contained' && {
								background: playerTheme.palette?.background?.default,
								...(ownerState.size === 'small' && {
									...outerTheme.typography.caption,
									padding: outerTheme.spacing(0.5, 0),
									fontWeight: 600,
									borderRadius: outerTheme.spacing(0.5),
									height: outerTheme.spacing(3),
									width: outerTheme.spacing(3),
								}),
								...(ownerState.size === 'medium' && {
									...outerTheme.typography.subtitle2,
									fontWeight: 600,
									height: outerTheme.spacing(4.5),
									padding: outerTheme.spacing(0.625, 1),
								}),
							}),
						};
					},
				},
			},
			MuiIconButton: {
				styleOverrides: {
					// Overriding https://github.com/Collaborne/carrot-styles/blob/35ec01752f68d1504c10b7a9dbb7eabc2004641b/src/theme.ts#L786-L788
					colorPrimary: {
						...actionStates,
					},
					colorInherit: {
						color: playerTheme.palette?.text?.primary,
						'&:disabled': {
							color: playerTheme.palette?.text?.disabled,
						},
					},
					root: ({ ownerState, theme }) => {
						const outerTheme = theme as Theme;
						return {
							...actionStates,
							borderRadius: outerTheme.spacing(0.5),
							color: playerTheme.palette?.text?.primary,
							...(ownerState.size === 'small' && {
								width: outerTheme.spacing(3),
								height: outerTheme.spacing(3),
							}),
							...(ownerState.size === 'medium' && {
								height: outerTheme.spacing(4.5),
								width: outerTheme.spacing(4.5),
							}),
							...(ownerState.size === 'large' && {
								height: outerTheme.spacing(7),
								width: outerTheme.spacing(7),
							}),
							...(ownerState.color === 'primary' && {
								background: playerTheme.palette.background?.default,
							}),
						};
					},
				},
			},
			MuiSvgIcon: {
				styleOverrides: {
					colorPrimary: {
						color: 'inherit',
					},
					root: ({ ownerState, theme }) => {
						const outerTheme = theme as Theme;
						return {
							color: outerTheme.palette.text.primary,
							...(ownerState.fontSize === 'small' && {
								width: outerTheme.spacing(2.5),
								height: outerTheme.spacing(2.5),
							}),
							...(ownerState.fontSize === 'medium' && {
								height: 'auto',
								width: outerTheme.spacing(3.5),
							}),
							...(ownerState.fontSize === 'large' && {
								height: outerTheme.spacing(6),
								width: outerTheme.spacing(6),
							}),
						};
					},
				},
			},
		},
	};
};

export const playerTheme = createPlayerTheme();
