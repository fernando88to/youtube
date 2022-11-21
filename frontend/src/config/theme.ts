import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import {colors} from "@mui/material";


// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: '#f44336',
            dark: '#f4f6f8',
        },
        secondary: {
            main: '#3EA6FF',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: colors.common.white,
            paper: colors.common.white,
        },

    },
});

export default theme;