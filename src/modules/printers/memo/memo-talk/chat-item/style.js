import makeStyles from '@material-ui/core/styles/makeStyles';
import grey from '@material-ui/core/colors/grey';
import lightBlue from '@material-ui/core/colors/lightBlue';

const useStyles = makeStyles(theme => ({
  chatItem: {
    // maxWidth: '60%',
    maxWidth: '600px',
    minWidth: '120px',
    borderRadius: '10px',
    background: '#F1F1F1',
    '&:hover': {
      '& .deleteWrapper': {
        display: 'block!important'
      }
    }
  },
  chatText: {
    wordWrap: 'break-word',
  },
  chatTitle: {
    color: grey[700]
  },
  chatMe: {
    background: '#2268F6',
    // background: lightBlue[500],
    borderRadius: '10px',
    color: '#fff'
  },
  chatTitleMe: {
    color: '#fff !important'
  },
  imageWrapper: {
    
  },
  image: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 4,
  }
}));

export default useStyles;