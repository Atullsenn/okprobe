import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  starIconPaper: {
    height: 80,
    width: 80,
  },

  startImagePaper: {
    height: 80,
    width: 100,
  },

  ImageCrownStyle: {
    height: '100%',
    width: '100%',
  },

  lcdDisplay: {
    padding: '0px',
    margin: '-2px 0px 0px 0px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#e9e5e5',
  },

  lcdMainBox: {
    background: '#8a888a',
    textAlign: 'center',
    height: '100%',
    borderRadius: '0px 0px 3px 3px',
  },

  lcdInnerBox: {
    width: '93%',
    height: '47px',
    background: '#ccfe63',
    marginTop: '-8px',
    margin: '-13px auto',
    borderRadius: '3px',
  },

  startDigitalScreenPaper: {
    height: 80,
    width: 120,
  },

  lcdMainText: {
    margin: '14px 0px 0px 0px',
  },

  ImageStyle: {
    height: '100%',
    width: '100%',
    marginTop: '3.5px',
  },

  ButtonSimilarWidth: {
    width: '8%',
  },

  DeleteButtonSimilarWidth: {
    width: '80px',
  },

  startIcon: {
    borderRadius: '0.25rem',
    alignItems: 'center',
    display: 'flex',
    fontSize: '1.875rem',
    justifyContent: 'center',
    textAlign: 'center',
    width: 70,
  },

  isBookmark: {
    color: 'blue'
  },

  whiteIcon: {
    borderRadius: '0.25rem',
    alignItems: 'center',
    display: 'flex',
    fontSize: '1.875rem',
    justifyContent: 'center',
    textAlign: 'center',
    width: 70,
    color: '#fff'
  },

  mobTabg: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      display: 'block'
    },
  },

  tabPaper: {
    height: 80,
    width: "33%",
    [theme.breakpoints.down('xs')]: {
      width: "100%",
    },
  },

  usagePagePaper: {
    maxHeight: 444,
    overflowY: 'auto'
  },

  eventbox: {
    borderRadius: 4,
    width: 70,
    height: 66,
    backgroundColor: "#17a2b8!important",
  },

  memoBox: {
    borderRadius: 4,
    width: 70,
    height: 66,
    backgroundColor: "#28a745!important",
  },

  reportBox: {
    borderRadius: 4,
    width: 70,
    height: 66,
  },

  deleteModal: {
    minWidth: 310,
    maxHeight: 250,
  },

  usagePageGrid: {
    maxHeight: 175,
    overflow: 'inherit'
  },

  detailButtonRoot: {
    backgroundColor: 'rgba(0,0,0,.03)'
  },

  detailButtonLabel: {
    fontWeight: 'bold'
  },

  iconSize: {
    fontSize: 56,
    marginTop: 4
  },

  warning: {
    color: '#28a745!important',
  },

  switch: {
    position: 'relative',
    display: 'inline-block',
    width: '90px',
    height: '34px',
    right: '-300px',
    top: '9px',
  },

  tablefixed: {

    overflow: 'inherit',
  },

  "@media (max-width: 767px)": {
    prienter_mainarea: {
      display: 'none!important'
    },
  },
}));

export default useStyles;
