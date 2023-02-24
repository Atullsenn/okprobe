import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginBottom: 30,
  },

  container: {
    minHeight: 457,
    maxHeight: 457,
    overflow: 'auto',
  },

  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },

  removeHoverEffect: {
    '&:hover': {
      backgroundColor: '#fff !important',
    }
  },

  table: {
    minWidth: 750,
    maxHeight: 420,
    overflow: 'auto',
    fontSize: '13px',
  },

  row: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },

  tableCell: {
    borderRight: `1px solid ${theme.palette.divider}`,
    padding: '12px 9px 12px 9px',
    whiteSpace: 'inherit',
    width: 'auto',
    fontSize: '13px',
  },

  fontsin: {
    '& p': {
      fontSize: '15px',
    },
    '& p:nth-child(odd)': {
    },
    '& p:nth-child(2n+1)': {
    },
  },

  fontboldsize: {
    fontSize: '16px',
    fontWeight: '600',
    maxWidth: '108px',
    whiteSpace: 'break-spaces',
    lineHeight: '19px',
    margin: 'auto',
  },

  fontboldsizexx: {
    whiteSpace: 'nowrap',
  },

  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    pading: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },

  sortLabel: {
    '& svg': {
      display: 'none !important',
    }
  }
}));

export default useStyles;