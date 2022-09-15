import { Button as MUIButton, Paper, Grid } from '@mui/material';
import React from 'react';

import { withDemoCard } from '../decorators';
import { withPlayerTheme } from '../decorators/with-player-theme';

const UPDATED_SIZES: Array<'small' | 'medium'> = ['medium', 'small'];
const UPDATED_VARIANT: Array<'text' | 'contained'> = ['contained', 'text'];
const UPDATED_COLOR: Array<'primary'> = ['primary'];

export const Button: React.FC = () => {
	return (
		<Paper sx={{ padding: 2 }}>
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
													{size === 'small' ? 'x' : 'Button text'}
												</MUIButton>
											</div>
										</div>
									</Grid>
								))}
							</div>
						</>
					))}
				</>
			))}
		</Paper>
	);
};

export default {
	title: 'UI Kit',
	component: Button,
	decorators: [withDemoCard, withPlayerTheme],
};
