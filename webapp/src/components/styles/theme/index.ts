import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0078E7',
      contrastText: '#fff',
    },
    error: {
      main: '#D83131',
      contrastText: '#fff',
    },
    info: {
      main: '#1D9BF0',
      contrastText: '#fff',
    },
    secondary: {
      main: '#707070',
      contrastText: '#fff',
    },
    success: {
      main: '#00C27C',
      contrastText: '#fff',
    },
    warning: {
      main: '#FFA800',
      contrastText: '#fff',
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#000",
          color: "#fff",
        }
      }
    },
  }
});
