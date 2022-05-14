import Button from '@mui/material/Button/Button';
import styled from '@mui/material/styles/styled';

export const StyledPlaybackRateButton = styled(Button)(({ theme }) => ({
	width: 20,
	color: theme.palette.error,
}));
