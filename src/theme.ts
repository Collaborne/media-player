/* eslint-disable max-lines */
import { createTheme } from '@mui/material/';
import { ThemeOptions } from '@mui/material/styles/createTheme';

// TODO: Check the necessity to update with tags color:
// https://github.com/Collaborne/backlog/issues/896
export const TAG_COLORS = [
	'turquoise',
	'yellow',
	'green',
	'red',
	'orange',
	'purple',
	'brown',
	'pink',
	'blue',
	'raspberry',
	'navy',
	'lime',
] as const;

// TODO: Check the necessity to update with tags color:
// https://github.com/Collaborne/backlog/issues/896
export type TagColor = typeof TAG_COLORS[number];
const grey = {
	50: '#FAFAFA',
	100: '#F4F5F5',
	200: '#ECEDED',
	300: '#CBCCCD',
	400: '#999C9E',
	500: '#6E7377',
	600: '#4C5052',
	700: '#3D4143',
	800: '#1D1F21',
	900: '#0F1010',
};

export const createPlayerTheme = (darkmode?: boolean): ThemeOptions => {
	const basePalette = createTheme({
		palette: {
			background: {
				default: 'rgba(0, 0, 0, 0.72)',
				paper: 'rgba(252,252,252, 0.28)',
			},
			primary: {
				light: '#EA99FF',
				main: '#CB01FF',
				dark: '#A200CC',
			},
			secondary: {
				light: '#CC99FF',
				main: '#7F00FF',
				dark: '#5900B2',
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
			contrasts: {
				1: darkmode ? grey[500] : grey[300],
				2: darkmode ? grey[700] : grey[200],
				3: grey[400],
				4: darkmode ? grey[200] : grey[100],
				5: darkmode ? grey[100] : grey[600],
			},
		},
	}).palette;

	const baseTheme = createTheme({
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
		typography: {
			fontFamily: ['Inter', 'Arial', 'sans-serif'].join(','),
			button: {
				textTransform: 'none',
			},
		},
	});

	// Active config for buttons
	const actionStates = {
		'&:hover': {
			backgroundColor: baseTheme.palette.action.hover,
		},
		'&:focus': {
			backgroundColor: baseTheme.palette.action.focus,
		},
		'&:active': {
			backgroundColor: baseTheme.palette.action.active,
		},
	};

	return {
		...baseTheme,
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
					root: ({ ownerState }) => ({
						...actionStates,
						minWidth: 'unset',
						transition:
							// * Necessary to avoid transition on border but keep the others
							'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
						lineHeight: baseTheme.spacing(2.75),
						fontSize: 14,
						fontWeight: 500,
						padding: baseTheme.spacing(0.625, 1),
						whiteSpace: 'nowrap',
						'&.Mui-disabled': {
							color: baseTheme.palette.text.primary,
							opacity: baseTheme.palette.action.disabledOpacity,
						},

						// color="primary"
						...(ownerState.color === 'primary' && {
							color: baseTheme.palette.text.secondary,
						}),
						// variant="text"
						...(ownerState.variant === 'text' && {
							borderRadius: baseTheme.spacing(0.5),

							// variant="text" && size
							...(ownerState.size === 'small' && {
								borderRadius: baseTheme.spacing(0.5),
								...baseTheme.typography.caption,
								fontWeight: 600,
							}),
							...(ownerState.size === 'medium' && {
								...baseTheme.typography.subtitle2,
								fontWeight: 600,
								padding: baseTheme.spacing(0.625, 1),
							}),

							// variant="text" && color
							...(ownerState.color === 'primary' && {
								actionStates,
								'&.Mui-disabled, & .MuiButton-label': {
									color: baseTheme.palette.text.primary,
								},
							}),
						}),

						// variant="contained"
						...(ownerState.variant === 'contained' && {
							...actionStates,
							...(ownerState.color === 'primary' && {
								color: baseTheme.palette.common.white,
							}),
							background: baseTheme.palette?.background?.default,
							...(ownerState.size === 'small' && {
								...baseTheme.typography.caption,
								padding: baseTheme.spacing(0.5, 0),
								fontWeight: 600,
								borderRadius: baseTheme.spacing(0.5),
								height: baseTheme.spacing(3),
								width: baseTheme.spacing(3),
							}),
							...(ownerState.size === 'medium' && {
								...baseTheme.typography.subtitle2,
								fontWeight: 600,
								height: baseTheme.spacing(4.5),
								padding: baseTheme.spacing(0.625, 1),
							}),
						}),
					}),
					startIcon: {
						marginLeft: 0,
						marginRight: baseTheme.spacing(1),
					},
				},
			},
			MuiButtonBase: {
				defaultProps: {
					// Remove ripples in the whole application
					disableRipple: true,
				},
			},
			MuiButtonGroup: {
				defaultProps: {
					disableRipple: true,
					variant: 'text',
				},
				styleOverrides: {
					groupedTextHorizontal: {
						'&:not(:last-child)': {
							borderRightColor: 'transparent',
							// Ensure that the background isn't behind the transparent border
							backgroundClip: 'padding-box',
						},
					},
				},
			},

			MuiIcon: {
				styleOverrides: {
					root: {
						fontSize: 'initial',
						color: darkmode ? '#BFBFBF' : '#616161',
						// Match size of SvgIcon
						height: baseTheme.spacing(2.5),
						width: baseTheme.spacing(2.5),
					},
					colorPrimary: {
						color: baseTheme.palette.primary.main,
					},
				},
			},
			MuiIconButton: {
				defaultProps: {
					color: 'inherit',
				},
				styleOverrides: {
					colorPrimary: {
						...actionStates,
					},
					colorInherit: {
						color: baseTheme.palette.text.primary,
						'&:disabled': {
							color: baseTheme.palette.text.disabled,
						},
					},
					root: ({ ownerState }) => ({
						...actionStates,
						padding: baseTheme.spacing(0.75, 0.75),
						borderRadius: baseTheme.spacing(0.5),
						color: baseTheme.palette.text.primary,

						height: 32,
						width: 32,
						...(ownerState.size === 'small' && {
							width: baseTheme.spacing(3),
							height: baseTheme.spacing(3),
							padding: baseTheme.spacing(0.5, 0.5),
						}),
						...(ownerState.size === 'medium' && {
							height: baseTheme.spacing(4.5),
							width: baseTheme.spacing(4.5),
						}),
						...(ownerState.size === 'large' && {
							height: baseTheme.spacing(7),
							width: baseTheme.spacing(7),
						}),
						...(ownerState.color === 'primary' && {
							background: baseTheme.palette.background.default,
						}),
					}),
				},
			},

			MuiPaper: {
				styleOverrides: {
					root: {
						backgroundImage: 'unset',
					},
					elevation1: {
						// No border for elevation 1
						backgroundColor: baseTheme.palette.background.paper,
					},
				},
			},
			MuiSvgIcon: {
				styleOverrides: {
					colorPrimary: {
						color: 'inherit',
					},
					root: ({ ownerState }) => {
						return {
							color: baseTheme.palette.text.primary,
							...(ownerState.fontSize === 'small' && {
								width: baseTheme.spacing(2.5),
								height: baseTheme.spacing(2.5),
							}),
							...(ownerState.fontSize === 'medium' && {
								height: 'auto',
								width: baseTheme.spacing(3.5),
							}),
							...(ownerState.fontSize === 'large' && {
								height: baseTheme.spacing(6),
								width: baseTheme.spacing(6),
							}),
						};
					},
				},
			},
		},
	};
};
