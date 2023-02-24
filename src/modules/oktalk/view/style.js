import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  talkWrapper: {
    height: 'calc(100vh - 144px)',
  },

  chatinfo: {
    width: '75%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  "@media (max-width: 700px)": {
    hideMembersWrapper: {
      display: 'none!important',
      width: '100%!important'
    },

    talkWrapper: {
      height: 'calc(100vh - 78px)',
    },

    chatinfo: {
      width: 'auto',
    },

  },

  membersWrapper: {
    backgroundColor: 'rgb(250,250,250)',
    borderRight: `1px solid #EBEBEB`,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important'
    },
    display: 'block',
  },

  hideMembersWrapper: {
    borderRight: '1px solid #EBEBEB',
    backgroundColor: 'rgb(250,250,250)',
  },

  chatWrapper: {
    background: '#fff',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    },
    display: 'block',
  },

  userName: {
    borderBottom: '1px solid #ccc',
  },

  avatar: {
    background: '#fff',
    color: '#343a40'
  },

  chatlist: {
    minWidth: '82%',
    maxWidth: '82%',
  },

  "@media (max-width: 1295px)": {
    chatlist: {
      maxWidth: '79%',
      minWidth: '79%',
    },

    printerListnam: {
      width: '165px',
    },
  },

  listWrapper: {
    overflow: 'hidden',
    scrollbarWidth: 'thin',
    height: 'calc(81% - 42px)',
    position: 'relative',
    '-webkit-overflow-x': 'hidden',
    '-moz-overflow': 'auto',
    '-webkit-overflow-x': 'hidden',
    '-moz-overflow': 'auto',

    '&:hover': {
      overflow: 'scroll',
      overflow: 'overlay',
      transition: 'all 0.8s ease',
      boxSizing: 'border-box',
    },

    '&:focus': {
      visibility: 'visible',
    },

    '&::-webkit-scrollbar': {
      width: '8px',
      borderRadius: '12px',
      height: '90px',
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#c1c1c1ab',
      borderRadius: '10px',
      height: '90px',
    },

  },

  "@media (max-width: 559.9px)": {
    chatprrinfo: {
      //display: 'inherit !important',
      width: '100%',
    },

    listWrapper: {
      overflow: 'auto !important',
      height: 'calc(83% - 78px) !important',
    },

    '&:hover': {
      display: 'none',
    }
  },

  "@media (max-width: 599.9px)": {
    hideChatWrapper: {
      display: 'block !important',
      width: '100% !important',
    },

  },

  printerList: {
    '&:hover': {
      background: '#edf8ff',
      borderRadius: '6px',
    }
  },

  activePrinter: {
    background: '#dbf1ff',
    borderRadius: '6px',
  },

  serachDevice: {
    color: '#fff',
    borderColor: '#fff'
  },

  searchWrapper: {
    background: '#F6F6F6',
    borderBottom: `1px solid ${theme.palette.divider}`
  },

  searchInput: {
    borderRight: 4,
  },

  avtarImage: {
    width: 32,
    height: 32,
    border: `1px solid ${theme.palette.divider}`,
  },

  searchWrapper_bar: {
    background: '#fff',
    borderRadius: '40px',
  },

  chatUsername: {
    fontWeight: '500',
  },

  printerListnam: {
    width: '135px',
    fontWeight: '500',
  },

  pleaseseletstext: {
    fontSize: '16px',
    margin: '5px 0px 5px 0px',
    lineHeight: '48px',

  },

  main_textinfo: {
    width: '67%',
    position: 'relative',
  },

  "@media (max-width: 600px)": {
    chatWrapper: {
      width: '100%!important',
    },

    hiddenchatWrapper: {
      width: '100%!important',
      display: 'none',
    },

    bordernew_line: {
      borderBottom: '1px solid #cccccc7a',
      padding: '0px 0px 11px 0',
    },
  },

  "@media (max-width: 767px)": {
    membersWrapper: {
      width: '100%!important',
    },
    printerList: {
      border: 'none!important',
    },
    printerList1234: {
      border: 'none!important',
    },

    talkWrapper: {
      //height: 'auto',
    },
  },

  maintop_pro: {
    backgroundColor: 'white',
    padding: '5px 13px 3px 13px',
    display: 'flex !important',
    border: '3px solid #ededed',
    position: 'relative',
    margin: '4px 4px 4px 4px',
    borderRadius: '10px',
  },

  user_img: {
    borderRadius: '13px',
    marginRight: '6px',
  },

  Model_Name: {
    fontSize: '13px',
    margin: '0px',
    lineHeight: '23px',
    wordBreak: 'break-word',
    color: 'rgba(0, 0, 0, 0.87)',
  },

  UserTit_Name: {
    margin: '0px',
    fontSize: '16px',
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.87)',

  },

  viewIcons: {
    top: '8px',
    padding: '0px 0px 0px 0px',
    justifyContent: 'end',
    position: 'absolute',
    right: '13px',

  },

  /*Media Query 420*/

  hideChatWrapper: {

  },
  chatWrapper: {

  }
}));

export default useStyles;