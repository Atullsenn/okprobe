import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  deleteModal: {
    minWidth: 310,
    maxHeight: 250,
  },

  DeleteButtonSimilarWidth: {
    width: '80px',
  },

  tableCell: {
    padding: '5px 10px 5px 10px',
  },

  btnprinter: {
    height: '38px !important',
  },

}));

export default useStyles;