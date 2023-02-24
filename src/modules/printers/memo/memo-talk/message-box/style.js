import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  messageBox: {
    maxHeight: 'calc(100% - 55px)',
    overflow: 'auto',
  },
}));

export default useStyles;