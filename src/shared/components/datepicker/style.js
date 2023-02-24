import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
	calendar: {
		background: theme.palette.background.paper,
	},
	day: {
		color: theme.palette.text.primary,
	},
	popper: {
		zIndex: theme.zIndex.modal,
	},
}));
