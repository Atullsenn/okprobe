import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  paper: {
    width: 550,
    height: 560,
  },

  ButtonSimilarWidth: {
    width: '80px',
  },

  backdrop: {
    zIndex: 99999,
    color: '#fff',
  },

  approveBtn: {
    background: '#28a745'
  }
}));

export default useStyles;