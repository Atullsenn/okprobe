import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    [theme.breakpoints.down('xs')]: {
      overflowX: 'hidden !important',
    },
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: '#fff',
    borderBottom: '1px solid #dee2e6'
  },

  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },

  appBarClosed: {
    marginLeft: theme.spacing(18),
    width: `calc(100% - ${theme.spacing(18)}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },

  menuButton: {
    marginRight: 36,
  },

  title: {
    flexGrow: 1,
  },

  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    background: theme.palette.background.primary.light,
    [theme.breakpoints.down('xs')]: {
      position: 'absolute',
      zIndex: theme.zIndex.drawer + 2,
    },
  },

  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(18),
    [theme.breakpoints.down('xs')]: {
      left: - drawerWidth + 20
    },
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    [theme.breakpoints.down('xs')]: {
      paddingTop: 6,
    },
  },

  container: {
    paddingTop: theme.spacing(3) + 1,
    paddingBottom: theme.spacing(0),
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(0),
    },
  },

  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },

  fixedHeight: {
    height: 240,
  },

  divider: {
    background: '#4b545c',
  },

  activeListItem: {
    // background: '#007bff',
    borderRadius: '4px'
  },

  header: {
    display: 'flex !important',
    width: '100% !important',
    alignItems: 'center !important',
    justifyContent: 'space-between !important',
  },

  avtarImage: {
    width: 32,
    height: 32,
    minWidth: 32,
    minHeight: 32,
    border: `1px solid ${theme.palette.divider}`,
  },

  listIcon: {
    minWidth: 36
  },
  testmySelf: {

  },
  testmySelf1: {

  },
  showLogOutOnlYMobile: {
    display: 'none'
  },

  "@media(max-width: 767px)": {
    drawerPaper: {
      width: '80px',
      // left:'-220px',
    },
    testmySelf: {
      left: '0px',
    },
    testmySelf1: {

      left: '-220px',
    },
    showLogOutOnlYMobile: {
      backgroundColor: '#041536',
      borderRadius: '0px',
      color: '#fff',
      width: '34px',
      height: '35px',
      outline: 'none',
      display: 'block',
      marginRight: '-9px',
    }
  },

}));

export default useStyles;