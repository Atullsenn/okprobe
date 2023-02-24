import { createMuiTheme, darken, responsiveFontSizes } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
  name: 'Default',
  spacing: 4,
  font: {
    regular: 'SourceSansPro-Regular',
  },
  typography: {
    fontFamily: [
      'SourceSansPro-Regular',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    background: {
      primary: {
        light: '#343a40',
        main: darken('#343a40', 0.2),
        dark: darken('#343a40', 0.4),
      },
    },
    primary: {
      light: '#007bff',
      main: darken('#007bff', 0.2),
      dark: darken('#007bff', 0.4)
    },
    secondary: {
      light: '#dc3545',
      main: darken('#dc3545', 0.2),
      dark: darken('#dc3545', 0.4)
    }
  }
});

export default responsiveFontSizes(theme);