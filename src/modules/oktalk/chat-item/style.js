import makeStyles from '@material-ui/core/styles/makeStyles';
import grey from '@material-ui/core/colors/grey';
import lightBlue from '@material-ui/core/colors/lightBlue';

const useStyles = makeStyles(theme => ({
  chatItem: {
    // maxWidth: '60%',
    maxWidth: '750px',
    minWidth: '120px',
    borderRadius: '8px',
    background: '#f2f6f9',
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
    background: '#dbf4fd',
    float:'right',
    borderRadius: '8px',
    color: '#000',
    marginBottom: '21px',
  },

  chatTitleMe:{
  color: '#6a6969 !important',
  position: 'absolute',
  top: '-23px',
  textTransform: 'uppercase',
  fontSize: '13px',
},



"@media (max-width: 767px)": {
  chatItem: {
    maxWidth: '270px',
    minWidth: '120px',
   },


 },






  imageWrapper: {
    },
  image: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 4,
  },
  jaisriram:{
    position: 'relative',
    top:'-4px',
  },

  user_time_left:{
    position: 'absolute',
    right: '0',
    top: '-23px',
    textTransform: 'uppercase',
  
  },







}));

export default useStyles;