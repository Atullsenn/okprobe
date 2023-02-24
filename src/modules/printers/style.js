import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles =  makeStyles(theme => ({
    tableCell:{
        minWidth:20
    },
    headerClasss: {
        minWidth: 30,
        maxWidth: 30,
        textAlign: 'center'
    }
    
}));

export default useStyles;