import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  loginWrapper: {
    height: "100vh",
    background: "#e9ecef",
  },

  paper: {
    minWidth: 256,
  },

  ButtonSimilarWidth: {
    width: '80px',
  },

  colorLink: {
    color: "#007bff",
  },

  divider: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },

  waitingModal: {
    minWidth: 600,
    maxHeight: 250,
  },

  deleteModal: {
    minWidth: 310,
    maxHeight: 250,
  },
}));

export default useStyles;
