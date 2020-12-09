import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import blueGrey from '@material-ui/core/colors/blueGrey';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: green[700],
      dark: green[900],
      contrastText: '#000'
    },
    secondary: {
      light: blueGrey[200],
      main: blueGrey[50],
      dark: blueGrey[800],
      contrastText: '#000'
    },
    text: {
      primary: green[700],
      secondary: blueGrey[50]
    },
    background: {
      paper: blueGrey[200],
      default: blueGrey[100]
    },
    type: 'light'
  }
  
});

export default theme;