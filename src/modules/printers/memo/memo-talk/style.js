import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles =  makeStyles(theme => ({
  talkWrapper: {
    height: 'calc(100vh - 144px)',
  },
  membersWrapper: {
    background: '#fff',
    borderRight: `1px solid #EBEBEB`
  },
  chatWrapper: {
  //  background: '#F8F9FA'
    background: '#fff'
  },
  userName: {
    borderBottom: '1px solid #ccc',
  },
  avatar: {
    background: '#fff',
    color: '#343a40'
  },
  listWrapper: {
    overflowY: 'auto',
    overflowX: 'hidden',
    height: 'calc(100% - 70px)'
  },
  printerList: {
    // color: '#fff',
    borderBottom: '1px solid rgb(242, 242, 242)',
    '&:hover': {
      background: '#F6F6F6',
      // color: '#343a40'
    }
  },
  activePrinter: {
    background: '#EBEBEB',
    //color: '#343a40'
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
}));

export default useStyles;