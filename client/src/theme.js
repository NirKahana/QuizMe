import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import blueGrey from '@material-ui/core/colors/blueGrey';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: green[700],
      dark: '#002884',
      contrastText: '#000'
    },
    secondary: {
      light: blueGrey[200],
      main: blueGrey[100],
      dark: blueGrey[800],
      contrastText: '#000'
    },
    background: {
      paper: blueGrey[50],
      default: blueGrey[100]
    }
  }
});

export default theme;