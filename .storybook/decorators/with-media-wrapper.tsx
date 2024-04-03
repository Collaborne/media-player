import { Paper, styled } from '@mui/material';
import type { StoryContext } from '@storybook/types';
import { FC } from 'react';

// TODO: Fixing TS via updating/implementing new addons/decorators to fix the any TS

const WrappedStyled = styled(Paper)(({ theme }) => ({
	display: 'flex',
	height: theme.spacing(60),
	width: theme.spacing(80),
	borderRadius: `${theme.shape.borderRadius} ${theme.shape.borderRadius} 0 0`,
	borderColor: theme.palette.grey[500],
	overflow: 'hidden',
	backgroundImage:
		'url("https://images.unsplash.com/photo-1533827432537-70133748f5c8")',
	position: 'relative',
}));
/**
 * Adds media wrapper for styles simulation
 * added borderColor and radiuses style={{ display: 'flex', height: '380px', width: '640px' }}
 */
export const withMediaWrapper = (
	Story: FC<StoryContext>,
	context: StoryContext,
) => {
	return (
		<WrappedStyled title={context.name}>
			<Story {...context} />
		</WrappedStyled>
	);
};
