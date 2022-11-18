import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

const CustomizedSlider = styled(Slider)`
    color: #20b2aa;

    :hover {
        color: #2e8;
    }

    & .MuiSlider-thumb {
        border-radius: 1px;
    }
`;

const CustomizedButton = styled(Button)`
    color: ${(props) => props.$primary};
    margin: 5px;
    background-color: ${(props) => (props.$secondary ? props.$secondary : '#000fff')};

    :hover {
        background-color: #2e8b57;
    }
`;
export { CustomizedSlider, CustomizedButton };
