import makeStyles from '@material-ui/core/styles/makeStyles';
import lightBlue from '@material-ui/core/colors/lightBlue';

const useStyles = makeStyles(theme => ({
  textBox: {
    '& #sc-launcher': {
      width: '100%',
    },
    '& .sc-launcher, & .sc-header': {
      display: 'none',
    },
    '& .sc-chat-window': {
      width: '100%',
      height: '100%',
      maxWidth: '100%',
      maxHeight: '100%',
      position: 'inherit',
      margin: 0,
      borderRadius: 0,
    },
    '& .sc-user-input--text': {
      cursor: 'text'
    },
    '& .sc-message': {
      width: 'inherit',
      marginLeft: 10,
      marginRight: 10,
      paddingBottom: 10,
      display: 'block',
    },
    '& .sc-message--content': {
      width: '50%',
    },
    '& .sc-message--content.sent': {
      float: 'right',
    },
    '& .sc-message--content.sent .sc-message--text': {
      background: '#343a40',
    },
    '& .sc-message-list': {
      display: 'none',
    },
  },
  inputBox: {
    borderRadius: '24px',
    background: '#fff',
  },
  input: {
    //color: '#fff',
  },
  fileBtn: {
    background: '#fff',
   // color: '#fff',
    '&:hover': {
      background: '#343a40',
      color: '#fff',
    }
  },
  send: {
    color: 'rgba(0, 0, 0, 0.20)',
    fontSize: 20,
  },
  activeSend: {
    color: 'rgba(0, 0, 0, 0.54)',
  }
}));

export default useStyles;