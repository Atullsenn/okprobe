import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  messageBox: {
    maxHeight: 'calc(100% - 55px)',
    overflow: 'auto',
  },

  
  main_heading:{
    backgroundColor: 'white',
    position: 'sticky',
    top: '0',
    width: '100%',
    left: 'inherit',
    right: 'inherit',
    //margin: 'auto',
    borderBottom: '1px solid #dadadc',
    zIndex: '9',
    padding: '8px 8px 8px 8px',
    },
  

    username_title1h2: {
      color:'red',
      },
      
      username_title:{
      fontSize: '16px',
      margin: '0px 0px -3px 0px',
      fontWeight: '700',
      },
      
      username_title2:{
      fontSize: '14px',
      margin: '3px 0px 0px 0px',
      },
      
      username_title1:{
      marginLeft: '40px',
      marginTop: '-25px',
      },


      arrowds:{
        display: 'none',
      },

  

    
      main_heading: {
       display: 'none!important',
         },
     



       "@media (max-width: 599.9px)": {
        main_heading: {
          display: 'block!important',
           backgroundColor: 'white',
    position: 'sticky',
    top: '0',
    width: '100%',
    left: 'inherit',
    right: 'inherit',
    //margin: 'auto',
    borderBottom: '1px solid #dadadc',
    zIndex: '9',
    padding: '8px 8px 8px 8px',
    //display: 'table-column',
    //display: 'none!important',
         },


         messageBox:{
           width:'100% !important',
         },    
     
       
       },







      "@media (max-width: 767px)": {
        arrowds: {
        display: 'block',
        position: 'relative',
        top: '9px',
         },

         hidetextmobile:{
        display: 'none!important',
         },

      

     
       },
     


  dateWrapper10:{
    position: 'relative',

    '&:before':{
      position: 'absolute',
  left: '60px',
  margin: 'auto',
  height: '1px',
  width: '39%',
  top: '26px',
  backgroundColor:'#a9a8a8',
  content: "''",
    },

    '&:after':{
      position: 'absolute',
  right: '60px',
  margin: 'auto',
  height: '1px',
  width: '39%',
  top: '26px',
  backgroundColor:'#a9a8a8',
  content: "''",
    },

    
 

    "@media (max-width: 767px)": {
      '&:before': {
         left: '40px',
         width: '27%',
       },

       '&:after': {
        right: '40px',
        width: '27%',
      },
    },
    


    
},
 


hideChatWrapper:{
  display:'block',
},
chatWrapper:{
  display:'block',
}





      


}));

export default useStyles;