import { Button as MUIButton, Card, Grid } from '@mui/material';

import { withDemoCard, withTheme } from '../decorators';
import { withPlayerTheme } from '../decorators/with-player-theme';

const UPDATED_SIZES: Array<'small' | 'medium'> = ['medium', 'small'];
const UPDATED_VARIANT: Array<'text' | 'contained'> = ['contained', 'text'];
const UPDATED_COLOR: Array<'primary'> = ['primary'];

export const Button = () => {
	return (
		<Card sx={{ background: 'rgba(0, 0, 0, 0.72)', padding: 2 }}>
			{UPDATED_COLOR.map(color => (
				<>
					<div>
						<b>color: {color}</b>
					</div>
					{UPDATED_VARIANT.map(variant => (
						<>
							<div style={{ padding: 8 }}>
								<b>variant: {variant}</b>
								{UPDATED_SIZES.map(size => (
									<Grid
										container
										direction="column"
										width="auto"
										alignItems={'space-between'}
									>
										<div style={{ padding: 4 }}>
											<div>
												<div>size: {size}</div>
												<MUIButton size={size} variant={variant} color={color}>
													I'm a button
												</MUIButton>
											</div>
										</div>
									</Grid>
								))}
							</div>
						</>
					))}
					,
				</>
			))}
		</Card>
	);
};

export default {
	title: 'UI Kit',
	component: Button,
	decorators: [withDemoCard, withPlayerTheme, withTheme],
};
