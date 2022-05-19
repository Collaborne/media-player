import { StoryContext } from '@storybook/addons';
import { Paper, styled } from '@mui/material';

// TODO: Fixing TS via updating/implementing new addons/decorators to fix the any TS

const WrappedStyled = styled(Paper)(({ theme }) => ({
	display: 'flex',
	height: theme.spacing(60),
	width: theme.spacing(80),
	borderRadius: `${theme.shape.borderRadius} ${theme.shape.borderRadius} 0 0`,
	borderColor: theme.palette.grey[500],
	overflow: 'hidden',
	backgroundImage: 'url("https://picsum.photos/640/480")',
}));
/**
 * Adds video wrapper for styles simulation
 * added borderColor and radiuses style={{ display: 'flex', height: '380px', width: '640px' }}
 */
export const withVideoWrapper = (Story: any, context: StoryContext) => {
	return (
		<WrappedStyled title={context.name}>
			<Story {...context} />
		</WrappedStyled>
	);
};
