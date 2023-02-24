import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  paper: {
   maxHeight: 444,
   overflowY: 'auto'
  },
  tableRightBorder: {
    borderRightWidth: 1,
    borderRightColor: theme.palette.grey[300],
    borderRightStyle: "solid",
    
},
MuiButton:{
  padding: '0px 10px !important',

}


}));

export default useStyles;
