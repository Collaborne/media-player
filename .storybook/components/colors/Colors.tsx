import { PaletteColor, useTheme } from '@mui/material';
import { CSSProperties, ReactNode } from 'react';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(theme => ({
	colorBox: {
		...(theme.typography.caption as CSSProperties),
		display: 'inline-flex',
		justifyContent: 'center',
		alignItems: 'center',
		verticalAlign: 'middle',
		textAlign: 'center',
		width: theme.spacing(8),
		height: theme.spacing(8),
		margin: theme.spacing(0.5),
		padding: theme.spacing(0.5),
		borderWidth: 1,
		borderColor: theme.palette.common.black,
		borderStyle: 'solid',
		textShadow: `1px 1px 1px ${theme.palette.getContrastText(
			theme.palette.text.primary,
		)}`,
	},
	primaryMain: {
		background: theme.palette.primary.main,
	},
	imageCard: {
		backgroundImage:
			'url(https://interactive-examples.mdn.mozilla.net/media/examples/balloon.jpg)',
		backgroundSize: 'cover',
		width: theme.spacing(20),
		height: theme.spacing(20),
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	imageCardInner: {
		color: theme.palette.text.primary,
		padding: theme.spacing(2, 1),
		backgroundColor: theme.palette.background.default,
		width: '100%',
		textAlign: 'center',
	},
}));

interface ColorBoxProps {
	bgColor?: string;
	label?: string;
	title?: string;
	backdropFilter?: string;
	children?: ReactNode;
}

const ImageCard: React.FC<{ children: ReactNode }> = props => {
	const { imageCard } = useStyles().classes;
	return <div className={imageCard}>{props.children}</div>;
};

const ColorBox: React.FC<ColorBoxProps> = props => {
	const { classes } = useStyles();
	return (
		<div
			className={classes.colorBox}
			style={{
				backgroundColor: props.bgColor,
				backdropFilter: props.backdropFilter,
			}}
			title={props.title}
		>
			{props.label}
			{props.children}
		</div>
	);
};

export const Colors: React.FC = () => {
	const theme = useTheme();
	const palette = theme.palette;
	const { classes } = useStyles();

	const renderPaletteColor = (color: PaletteColor) => (
		<>
			<ColorBox label="Light" bgColor={color.light} />
			<ColorBox label="Main" bgColor={color.main} />
			<ColorBox label="Dark" bgColor={color.dark} />
		</>
	);
	return (
		<>
			<h2>Base colors</h2>

			<h3>Primary</h3>
			{renderPaletteColor(palette.primary)}

			<h3>Secondary</h3>
			{renderPaletteColor(palette.secondary)}

			<h3>Background</h3>
			<ColorBox label="default" bgColor={palette.background.default} />
			<ColorBox label="paper" bgColor={palette.background.paper} />

			<h3>Action</h3>
			{['transparent', 'lightgreen'].map(backgroundColor => (
				<div key={backgroundColor}>
					<h4>Background {backgroundColor}</h4>
					<div style={{ backgroundColor }}>
						<ColorBox label="action. active" bgColor={palette.action.active} />
						<ColorBox label="action. hover" bgColor={palette.action.hover} />
						<ColorBox label="action. focus" bgColor={palette.action.focus} />
						<ColorBox
							label="action. selected"
							bgColor={palette.action.selected}
						/>
					</div>
				</div>
			))}

			<h3>Special purpose</h3>

			<ImageCard>
				<div
					className={classes.imageCardInner}
					style={{
						backdropFilter: theme.palette.backdropFilter,
					}}
				>
					backdropFilter
				</div>
			</ImageCard>
			<ColorBox label="primary VeryDark" bgColor={palette.primaryVeryDark} />
			<ColorBox label="common black" bgColor={palette.common.black} />

			<h2>Text</h2>
			<div style={{ color: palette.text.primary }}>text.primary</div>
			<div style={{ color: palette.text.secondary }}>text.secondary</div>
			<div style={{ color: palette.text.disabled }}>text.disabled</div>
		</>
	);
};
