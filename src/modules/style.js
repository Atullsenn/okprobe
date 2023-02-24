import makeStyles from '@material-ui/core/styles/makeStyles';
const useStyles = makeStyles(theme => ({
  
  top_hideno1:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
 
 
  "@media (max-width: 767px)": {
  top_hideno1: {
       display: 'none!important'}
     },


     
     logout_time:{
      //top: '-12px',
      color: '#000',
      right: '-6px',
      position: 'relative',
      fontSize: '15px',
  
  
    } 


  


}));

export default useStyles;