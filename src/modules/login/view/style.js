import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles =  makeStyles(theme => ({
  loginWrapper: {
    height: '100vh',
    background: '#e9ecef',
  },
  paper: {
    minWidth: 256,
  },
  googleSignInBtn: {
    width: '222px',
    height: '43px',
    background: 'rgb(26, 115, 232) !important',
    '& span': {
      width: '100%',
      fontSize: 16
    }
  },
  loginBtn: {
    background: 'rgb(26, 115, 232) !important',
    colofr: '#fff !important'
  },

  login_info:{

    position: 'relative',
    top: '-42px',
    left: '-66px',
    fontSize: '13px',
  },


 

}));

export default useStyles;