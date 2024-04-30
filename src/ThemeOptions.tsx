import { ThemeOptions } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#ffb0bb',
    },
    secondary: {
      main: '#f9bb34',
    },
    success: {
      main: '#43f835',
    },
    info: {
      main: '#00edcc',
    },
    background: {
      default: `
      radial-gradient(circle,
        rgba(255,239,245,1) 0%,
        rgba(255,253,238,1) 50%,
        rgba(242,255,239,1) 95%);
        `,
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          border: 0,
          borderRadius: 3,
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          color: 'white',
          height: 48,
          padding: '0 30px',
        },
      },
    },

    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundImage: `
            radial-gradient(circle at 10% 20%, rgba(255,176,187,0.1) 2%, transparent 0), // Changed color to match primary color
            radial-gradient(circle at 90% 80%, rgba(249,187,52,0.1) 2%, transparent 0), // Changed color to match secondary color
            linear-gradient(to right, #ffb0bb 0%, #f9bb34 100%)` // Changed colors to match primary and secondary colors
        },
      },
    },
  },
};