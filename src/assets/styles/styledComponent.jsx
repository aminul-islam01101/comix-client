import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { CustomizedButton, CustomizedSlider } from './Styled';

export const StyledComponentsDeep = () => <CustomizedSlider defaultValue={30} />;

export const StyledButton = ({ text, bgColor }) => (
    <CustomizedButton $secondary={bgColor} $primary="#fff000" variant="contained">
        {text}
    </CustomizedButton>
);

export const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));
