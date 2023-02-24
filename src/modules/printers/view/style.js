import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles =  makeStyles(theme => ({
  loginWrapper: {
    height: '100vh',
    background: '#e9ecef',
  },
  paper: {
    minWidth: 256,
  },
  colorLink: {
    color: '#007bff',
  },
  divider: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  formControl: {
    // margin: theme.spacing(1),
    // minWidth: 120
  },
  warning:{
    color: '#28a745!important',
  }
}));

export default useStyles;