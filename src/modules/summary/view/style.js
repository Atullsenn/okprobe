import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
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

  statusBox: {
    background: 'red',
    borderRadius: 4
  },

  typeFilterModal: {
    width: 500,
    height: 280
  },

  startIcon: {
    borderRadius: '0.25rem',
    alignItems: 'center',
    display: 'flex',
    fontSize: '1.875rem',
    justifyContent: 'center',
    textAlign: 'center',
    width: 70,
    color: '#fff'
  },

  bookmarkPaper: {
    height: 80,
  },

  bookmarkDiv: {
    borderRadius: 4,
    width: 70,
    height: 66,
    backgroundColor: "#28a745!important",
  },

  contractGrid: {
    minHeight: 100
  },
  bookmarkWrapper: {
    maxHeight: 430,
  },

  headerClasss: {
    minWidth: 60,
    maxWidth: 60,
    textAlign: 'center'
  },

  ButtonSimilarWidth: {
    width: '8%',
  },

  newbookmark: {
    display: 'flex !important',
    justifyContent: 'start',
  },

  "@media (max-width: 767px)": {
    newbookmark: {
      display: 'inherit !important',
    },
  },

}));

export default useStyles;