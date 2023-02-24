import makeStyles from '@material-ui/core/styles/makeStyles';

const customerStyle =  makeStyles(theme => ({
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

  customergrid:{
    background: '#000',
  },
  table:{
    border:'1px solid red'
  },
  root: {
    "& MuiTable-stickyHeader": {
      color: "red",
      // color: theme.palette.text.color
    }
  }
}));


export default customerStyle;