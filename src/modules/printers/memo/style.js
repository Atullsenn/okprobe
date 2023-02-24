import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    memoPaper: {
    height: 80,
  },
  deleteModal:{
    minWidth: 600,
    maxHeight: 250,
  },
  addMemoModal:{
    minWidth: 600,
    maxHeight: 350,
  }
}));

export default useStyles;
