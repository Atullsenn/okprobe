import makeStyles from '@material-ui/core/styles/makeStyles';
import lightBlue from '@material-ui/core/colors/lightBlue';

const useStyles = makeStyles(theme => ({
  imagePreview: props => ({
    background: '#E6E6E6',
    maxHeight: props.isPreviewImage ? '100%' : 'calc(100% - 55px)',
    overflow: 'auto',
  }),
  header: {
    background: lightBlue[500],
  },
  image: props => ({
    maxHeight: props.isPreviewImage ? '100%' :' 80%',
    maxWidth: props.isPreviewImage ? '100%' :' 80%',
  }),
  imageWrapper: {
    maxHeight: 'calc(100% - 75px)',
  }
}));

export default useStyles;