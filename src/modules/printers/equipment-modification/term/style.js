import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  termModal: {
    minWidth: 800,
    maxHeight: 700,
  },

  ButtonSimilarWidth: {
    width: '8%',
  },

  headerClass: {
    minWidth: 30,
  }
}));

export default useStyles;