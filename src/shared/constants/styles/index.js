import makeStyles from '@material-ui/core/styles/makeStyles';
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles(theme => ({
  '@global': {
    ':focus': {
      outline: 'none',
    },
    body: {
      
      margin: 0,
      // backgroundColor: theme.palette.background.default,
      // color: theme.palette.text.primary,
      fontFamily: theme.font.regular,
    },
    '.d-flex': {
      display: 'flex !important',
    },
    '.d-none': {
      display: 'none',
    },
    '.d-block': {
      display: 'block',
    },
    '.d-inline-block': {
      display: 'inline-block',
    },
    '.d-inline-flex': {
      display: 'inline-flex',
    },
    '.d-content': {
      display: 'content',
    },
    'o-hidden': {
      overflow: 'hidden !important',
    },
    'o-auto': {
      overflow: 'auto !important',
    },
    'o-scroll': {
      overflow: 'scroll !important',
    },
    'ox-hidden': {
      overflowX: 'hidden !important',
    },
    'oy-hidden': {
      overflowY: 'hidden !important',
    },
    'ox-auto': {
      overflowX: 'auto !important',
    },
    'oy-auto': {
      overflowY: 'auto !important',
    },
    'ox-scroll': {
      overflowX: 'scroll !important',
    },
    'oy-scroll': {
      overflowY: 'scroll !important',
    },
    '.d-inline': {
      display: 'inline',
    },
    '.f-wrap': {
      flexWrap: 'wrap',
    },
    'ws-no-wrap': {
      whiteSpace: 'nowrap',
    },
    '.flex-row': {
      flexDirection: 'row !important',
    },
    '.flex-column': {
      flexDirection: 'column !important',
    },
    '.flex-column-reverse': {
      flexDirection: 'column-reverse !important',
    },
    '.f-align-center': {
      alignItems: 'center !important',
    },
    '.f-align-start': {
      alignItems: 'flex-start !important',
    },
    '.f-align-end': {
      alignItems: 'flex-end !important',
    },
    '.f-align-baseline': {
      alignItems: 'baseline !important',
    },
    '.f-justify-start': {
      justifyContent: 'flex-start !important',
    },
    '.f-justify-center': {
      justifyContent: 'center !important',
    },
    '.f-justify-end': {
      justifyContent: 'flex-end ',
    },
    '.f-justify-between': {
      justifyContent: 'space-between',
    },
    '.f-justify-around': {
      justifyContent: 'space-around',
    },
    a: {
      textDecoration: 'none !important',
      cursor: 'pointer',
      color: theme.palette.grey[600],
    },
    '.c-pointer': {
      cursor: 'pointer !important',
    },
    '.c-default': {
      cursor: 'default !important',
    },
    '.no-events': {
      pointerEvents: 'none',
      '&:hover': {
        pointerEvents: 'all',
      },
      '&:active': {
        pointerEvents: 'none',
      },
    },
    '.all-events': {
      pointerEvents: 'all',
    },
    '.align-center': {
      textAlign: 'center !important',
    },
    '.align-left': {
      textAlign: 'left',
    },
    '.align-right': {
      textAlign: 'right',
    },
    '.v-align-baseline': {
      verticalAlign: 'baseline !important',
    },
    '.v-align-initial': {
      verticalAlign: 'initial !important',
    },
    '.v-align-middle': {
      verticalAlign: 'middle !important',
    },
    '.v-align-bottom': {
      verticalAlign: 'bottom !important',
    },
    '.p-0': {
      padding: '0!important',
    },
    '.flex-1': {
      flex: 1,
    },
    '.m-0': {
      margin: '0px !important',
    },
    '.m-1': {
      margin: `${theme.spacing(1)}px !important`,
    },
    '.m-2': {
      margin: `${theme.spacing(2)}px !important`,
    },
    '.m-3': {
      margin: `${theme.spacing(3)}px !important`,
    },
    '.m-4': {
      margin: `${theme.spacing(4)}px !important`,
    },
    '.m-5': {
      margin: `${theme.spacing(5)}px !important`,
    },
    '.m-6': {
      margin: `${theme.spacing(6)}px !important`,
    },
    '.m-7': {
      margin: `${theme.spacing(7)}px !important`,
    },
    '.m-8': {
      margin: `${theme.spacing(8)}px !important`,
    },
    '.m-9': {
      margin: `${theme.spacing(9)}px !important`,
    },
    '.m-10': {
      margin: `${theme.spacing(10)}px !important`,
    },
    '.mr-auto': {
      marginRight: 'auto !important',
    },
    '.mr-0': {
      marginRight: `${theme.spacing(0)}px !important`,
    },
    '.mr-1': {
      marginRight: `${theme.spacing(1)}px !important`,
    },
    '.mr-2': {
      marginRight: `${theme.spacing(2)}px !important`,
    },
    '.mr-3': {
      marginRight: `${theme.spacing(3)}px !important`,
    },
    '.mr-4': {
      marginRight: `${theme.spacing(4)}px !important`,
    },
    '.mr-5': {
      marginRight: `${theme.spacing(5)}px !important`,
    },
    '.mr-6': {
      marginRight: `${theme.spacing(6)}px !important`,
    },
    '.mr-7': {
      marginRight: `${theme.spacing(7)}px !important`,
    },
    '.mr-8': {
      marginRight: `${theme.spacing(8)}px !important`,
    },
    '.mr-9': {
      marginRight: `${theme.spacing(9)}px !important`,
    },
    '.mr-10': {
      marginRight: `${theme.spacing(10)}px !important`,
    },
    '.ml-auto': {
      marginLeft: 'auto  !important',
    },
    '.ml-0': {
      marginLeft: `${theme.spacing(0)}px !important`,
    },
    '.ml-1': {
      marginLeft: `${theme.spacing(1)}px !important`,
    },
    '.ml-2': {
      marginLeft: `${theme.spacing(2)}px !important`,
    },
    '.ml-3': {
      marginLeft: `${theme.spacing(3)}px !important`,
    },
    '.ml-4': {
      marginLeft: `${theme.spacing(4)}px !important`,
    },
    '.ml-5': {
      marginLeft: `${theme.spacing(5)}px !important`,
    },
    '.ml-6': {
      marginLeft: `${theme.spacing(6)}px !important`,
    },
    '.ml-7': {
      marginLeft: `${theme.spacing(7)}px !important`,
    },
    '.ml-8': {
      marginLeft: `${theme.spacing(8)}px !important`,
    },
    '.ml-9': {
      marginLeft: `${theme.spacing(9)}px !important`,
    },
    '.ml-10': {
      marginLeft: `${theme.spacing(10)}px !important`,
    },
    '.mt-auto': {
      marginTop: 'auto  !important',
    },
    'mt-0': {
      marginTop: '0 !important',
    },
    '.mt-1': {
      marginTop: `${theme.spacing(1)}px !important`,
    },
    '.mt-2': {
      marginTop: `${theme.spacing(2)}px !important`,
    },
    '.mt-3': {
      marginTop: `${theme.spacing(3)}px !important`,
    },
    '.mt-4': {
      marginTop: `${theme.spacing(4)}px !important`,
    },
    '.mt-5': {
      marginTop: `${theme.spacing(5)}px !important`,
    },
    '.mt-6': {
      marginTop: `${theme.spacing(6)}px !important`,
    },
    '.mt-7': {
      marginTop: `${theme.spacing(7)}px !important`,
    },
    '.mt-8': {
      marginTop: `${theme.spacing(8)}px !important`,
    },
    '.mt-9': {
      marginTop: `${theme.spacing(9)}px !important`,
    },
    '.mt-10': {
      marginTop: `${theme.spacing(10)}px !important`,
    },
    '.mb-auto': {
      marginBottom: 'auto  !important',
    },
    'mb-0': {
      marginBottom: '0 !important',
    },
    '.mb-1': {
      marginBottom: `${theme.spacing(1)}px !important`,
    },
    '.mb-2': {
      marginBottom: `${theme.spacing(2)}px !important`,
    },
    '.mb-3': {
      marginBottom: `${theme.spacing(3)}px !important`,
    },
    '.mb-4': {
      marginBottom: `${theme.spacing(4)}px !important`,
    },
    '.mb-5': {
      marginBottom: `${theme.spacing(5)}px !important`,
    },
    '.mb-6': {
      marginBottom: `${theme.spacing(6)}px !important`,
    },
    '.mb-7': {
      marginBottom: `${theme.spacing(7)}px !important`,
    },
    '.mb-8': {
      marginBottom: `${theme.spacing(8)}px !important`,
    },
    '.mb-9': {
      marginBottom: `${theme.spacing(9)}px !important`,
    },
    '.mb-10': {
      marginBottom: `${theme.spacing(10)}px !important`,
    },
    '.p-1': {
      padding: `${theme.spacing(1)}px !important`,
    },
    '.p-2': {
      padding: `${theme.spacing(2)}px !important`,
    },
    '.p-3': {
      padding: `${theme.spacing(3)}px !important`,
    },
    '.p-4': {
      padding: `${theme.spacing(4)}px !important`,
    },
    '.p-5': {
      padding: `${theme.spacing(5)}px !important`,
    },
    '.p-6': {
      padding: `${theme.spacing(6)}px !important`,
    },
    '.p-7': {
      padding: `${theme.spacing(7)}px !important`,
    },
    '.p-8': {
      padding: `${theme.spacing(8)}px !important`,
    },
    '.p-9': {
      padding: `${theme.spacing(9)}px !important`,
    },
    '.p-10': {
      padding: `${theme.spacing(10)}px !important`,
    },
    '.pr-0': {
      paddingRight: `${theme.spacing(0)}px !important`,
    },
    '.pr-1': {
      paddingRight: `${theme.spacing(1)}px !important`,
    },
    '.pr-2': {
      paddingRight: `${theme.spacing(2)}px !important`,
    },
    '.pr-3': {
      paddingRight: `${theme.spacing(3)}px !important`,
    },
    '.pr-4': {
      paddingRight: `${theme.spacing(4)}px !important`,
    },
    '.pr-5': {
      paddingRight: `${theme.spacing(5)}px !important`,
    },
    '.pr-6': {
      paddingRight: `${theme.spacing(6)}px !important`,
    },
    '.pr-7': {
      paddingRight: `${theme.spacing(7)}px !important`,
    },
    '.pr-8': {
      paddingRight: `${theme.spacing(8)}px !important`,
    },
    '.pr-9': {
      paddingRight: `${theme.spacing(9)}px !important`,
    },
    '.pr-10': {
      paddingRight: `${theme.spacing(10)}px !important`,
    },
    '.pl-0': {
      paddingLeft: `${theme.spacing(0)}px !important`,
    },
    '.pl-1': {
      paddingLeft: `${theme.spacing(1)}px !important`,
    },
    '.pl-2': {
      paddingLeft: `${theme.spacing(2)}px !important`,
    },
    '.pl-3': {
      paddingLeft: `${theme.spacing(3)}px !important`,
    },
    '.pl-4': {
      paddingLeft: `${theme.spacing(4)}px !important`,
    },
    '.pl-5': {
      paddingLeft: `${theme.spacing(5)}px !important`,
    },
    '.pl-6': {
      paddingLeft: `${theme.spacing(6)}px !important`,
    },
    '.pl-7': {
      paddingLeft: `${theme.spacing(7)}px !important`,
    },
    '.pl-8': {
      paddingLeft: `${theme.spacing(8)}px !important`,
    },
    '.pl-9': {
      paddingLeft: `${theme.spacing(9)}px !important`,
    },
    '.pl-10': {
      paddingLeft: `${theme.spacing(10)}px !important`,
    },
    '.pt-0': {
      paddingTop: `${theme.spacing(0)}px !important`,
    },
    '.pt-1': {
      paddingTop: `${theme.spacing(1)}px !important`,
    },
    '.pt-2': {
      paddingTop: `${theme.spacing(2)}px !important`,
    },
    '.pt-3': {
      paddingTop: `${theme.spacing(3)}px !important`,
    },
    '.pt-4': {
      paddingTop: `${theme.spacing(4)}px !important`,
    },
    '.pt-5': {
      paddingTop: `${theme.spacing(5)}px !important`,
    },
    '.pt-6': {
      paddingTop: `${theme.spacing(6)}px !important`,
    },
    '.pt-7': {
      paddingTop: `${theme.spacing(7)}px !important`,
    },
    '.pt-8': {
      paddingTop: `${theme.spacing(8)}px !important`,
    },
    '.pt-9': {
      paddingTop: `${theme.spacing(9)}px !important`,
    },
    '.pt-10': {
      paddingTop: `${theme.spacing(10)}px !important`,
    },
    '.pb-0': {
      paddingBottom: `${theme.spacing(0)}px !important`,
    },
    '.pb-1': {
      paddingBottom: `${theme.spacing(1)}px !important`,
    },
    '.pb-2': {
      paddingBottom: `${theme.spacing(2)}px !important`,
    },
    '.pb-3': {
      paddingBottom: `${theme.spacing(3)}px !important`,
    },
    '.pb-4': {
      paddingBottom: `${theme.spacing(4)}px !important`,
    },
    '.pb-5': {
      paddingBottom: `${theme.spacing(5)}px !important`,
    },
    '.pb-6': {
      paddingBottom: `${theme.spacing(6)}px !important`,
    },
    '.pb-7': {
      paddingBottom: `${theme.spacing(7)}px !important`,
    },
    '.pb-8': {
      paddingBottom: `${theme.spacing(8)}px !important`,
    },
    '.pb-9': {
      paddingBottom: `${theme.spacing(9)}px !important`,
    },
    '.pb-10': {
      paddingBottom: `${theme.spacing(10)}px !important`,
    },
    '.bg-primary': {
      backgroundColor: `${theme.palette.primary.main} !important`,
    },
    '.bg-grey': {
      backgroundColor: `${theme.palette.grey[500]} !important`,
    },
    '.bg-success': {
      backgroundColor: `${theme.palette.success.main} !important`,
    },
    '.bg-secondary': {
      backgroundColor: `${theme.palette.secondary.main} !important`,
    },
    '.bg-info': {
      backgroundColor: `${theme.palette.info.main} !important`,
    },
    '.bg-default': {
      backgroundColor: `${theme.palette.background.default} !important`,
    },
    '.bg-paper': {
      backgroundColor: `${theme.palette.background.paper} !important`,
    },
    '.bg-danger': {
      backgroundColor: `${theme.palette.error.main} !important`,
    },
    '.bg-warning': {
      backgroundColor: `${theme.palette.warning.main} !important`,
    },
    '.border-primary': {
      borderColor: `${theme.palette.primary.main} !important`,
    },
    '.border-secondary': {
      borderColor: `${theme.palette.secondary.main} !important`,
    },
    '.border-info': {
      borderColor: `${theme.palette.info.main} !important`,
    },
    '.border-error': {
      borderColor: `${theme.palette.error.main} !important`,
    },
    '.border-warning': {
      borderColor: `${theme.palette.warning.main} !important`,
    },
    '.color-primary': {
      color: `${theme.palette.primary.main} !important`,
    },
    '.color-success': {
      color: `${theme.palette.success.main} !important`,
    },
    '.color-secondary': {
      color: `${theme.palette.secondary.main} !important`,
    },
    '.color-info': {
      color: `${theme.palette.info.main} !important`,
    },
    '.color-error': {
      color: `${theme.palette.error.main} !important`,
    },
    '.color-warning': {
      color: `${theme.palette.warning.main} !important`,
    },
    '.color-white': {
      color: `${theme.palette.common.white} !important`,
    },
    '.color-grey': {
      color: `${theme.palette.grey[500]} !important`,
    },
    '.color-text-primary': {
      color: `${theme.palette.text.primary} !important`,
    },
    '.color-text-secondary': {
      color: `${theme.palette.text.secondary} !important`,
    },
    '.color-text-disabled': {
      color: `${theme.palette.text.disabled} !important`,
    },
    '.color-text-link': {
      color: `${theme.palette.primary.main} !important`,
    },
    '.color-link': {
      color: 'rgba(0,0,0,.5) !important'
    },
    '@keyframes myEffect': {
      '0%': {
        background: grey[100]
      },
      '50%': {
        background: grey[300]
      },
      '100%': {
        background: grey[100]
      }
    },
    '.loading': {
      animation: 'myEffect 2000ms infinite',
      content: '',
    },
    '.v-hidden': {
      visibility: 'hidden',
    },
    '.no-border': {
      border: '0 !important',
    },
    '.text-bold': {
      fontWeight: 'bold !important',
    },
    '.p-relative': {
      position: 'relative !important',
    },
    '.p-absolute': {
      position: 'absolute !important',
    },
    '.p-fixed': {
      position: 'fixed',
    },
    '.w-25': {
      width: '25%',
      boxSizing: 'border-box',
    },
    '.w-50': {
      width: '50%',
      boxSizing: 'border-box',
    },
    '.w-75': {
      width: '75%',
      boxSizing: 'border-box',
    },
    '.w-100': {
      width: '100%',
      boxSizing: 'border-box',
    },
    '.mw-25': {
      maxWidth: '25% !important',
      boxSizing: 'border-box',
    },
    '.mw-50': {
      maxWidth: '50% !important',
      boxSizing: 'border-box',
    },
    '.mw-75': {
      maxWidth: '75% !important',
      boxSizing: 'border-box',
    },
    '.mw-100': {
      maxWidth: '100% !important',
      boxSizing: 'border-box',
    },
    '.minw-0': {
      minWidth: '0 !important',
      boxSizing: 'border-box',
    },
    '.h-25': {
      height: '25%',
      boxSizing: 'border-box',
    },
    '.h-50': {
      height: '50%',
      boxSizing: 'border-box',
    },
    '.h-75': {
      height: '75%',
      boxSizing: 'border-box',
    },
    '.h-100': {
      height: '100%',
      boxSizing: 'border-box',
    },
    '.mh-25': {
      maxHeight: '25%',
      boxSizing: 'border-box',
    },
    '.mh-50': {
      maxHeight: '50%',
      boxSizing: 'border-box',
    },
    '.mh-75': {
      maxHeight: '75%',
      boxSizing: 'border-box',
    },
    '.mh-100': {
      maxHeight: '100%',
      boxSizing: 'border-box',
    },
    '.confirmation-dialog': {
      width: 414,
    },
    '.w-auto': {
      width: 'auto !important',
    },
    '.icon': {
      width: 18,
      height: 18,
    },
    '.icon-inline': {
      display: 'inline',
    },
    '.inverted': {
      transform: 'rotate(180deg)',
    },
    '.w-100p': {
      width: 100,
    },
    '.w-normal': {
      whiteSpace: 'normal',
    },
    '.no-ripple': {
      '& .MuiTouchRipple-root': {
        display: 'none',
      },
    },
    '.info-icon': {
      width: 20,
      minWidth: 20,
    },
    '.bg-all': {
      background: '#17a2b8!important'
    },
    '.bg-normal': {
      background: '#28a745!important'
    },
    '.bg-caution': {
      background: '#ffc107!important'
    },
    '.bg-check': {
      background: '#dc3545!important'
    },
    '.bg-white': {
      background: '#fff!important'
    },
    '.Toastify__toast-body': {
      width: '100%',
      textAlign: 'center'
    },
    '.main-card':{
        display: 'flex',
        justifyContent: 'space-between',
        padding: `${theme.spacing(4)}px !important`,
        alignItems: 'center !important',
        width: '100%',
        [theme.breakpoints.down('xs')]: {
          display: 'grid',
          gridTemplateColumns: '48% 48%',
          gap: 16
        },
     },
     '.card-padding':{
      padding: `${theme.spacing(4)}px !important`,
      paddingTop: `${theme.spacing(4)}px !important`,

      [theme.breakpoints.down('xs')]: {
        padding: `${theme.spacing(2)}px !important`,
        paddingTop: `${theme.spacing(4)}px !important`,

      },
     },
     '.card-img':{
      fontSize: '72px',
      color: 'rgba(0,0,0,.15)',
      [theme.breakpoints.down('xs')]: {
        fontSize: '45px',
      }
     },
     '.col-md-4-card':{
      display: 'flex',
      justifyContent: 'space-between',
      width:'25%',
      boxSizing: 'border-box',
      cursor: 'pointer !important',
      marginLeft: `${theme.spacing(2)}px !important`,
      marginRight: `${theme.spacing(2)}px !important`,
      [theme.breakpoints.down('xs')]: {
      width:'100%',
      marginLeft: `${theme.spacing(0)}px !important`,
      marginRight: `${theme.spacing(0)}px !important`,
      marginBottom: `${theme.spacing(3)}px !important`,
      marginTop: `${theme.spacing(3)}px !important`,
      },
    },
    '.wraplayout':{
      width: '50% !important',
      [theme.breakpoints.down('xs')]: {
        width: '100% !important',
      },
    },
    '.header':{
      display: 'flex !important',
      width: '100% !important',
      alignItems: 'center !important',
      justifyContent: 'space-between !important',
      [theme.breakpoints.down('xs')]: {
        display: 'block !important',
      },
    },
    '.settingwidth':{
      width: '50% !important',
      [theme.breakpoints.down('xs')]: {
        width:'75% !important',
      },
    }
  },
}));

export default useStyles;

