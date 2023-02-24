import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles =  makeStyles(theme => ({
  probeNotice: {
    width: 550,
    height: 650,
    display: 'none',
  },
  
  listpadd:{
    padding: '0px 35px 0px 43px',
   
  },


  hidepopup:{
    display: 'none !important',
  }

}));

export default useStyles;