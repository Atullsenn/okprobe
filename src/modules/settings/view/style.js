import makeStyles from '@material-ui/core/styles/makeStyles';
import { ImportantDevices } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  loginWrapper: {
    height: '100vh',
    background: '#e9ecef',
  },

  disableColor: {
    backgroundColor: '#f5f6f8',
  },

  paper: {
    minWidth: 256,
  },

  colorLink: {
    color: '#007bff',
  },

  divider: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },

}));

export default useStyles;