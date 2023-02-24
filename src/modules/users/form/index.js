import { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import Service from '../service';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { DialogActions, DialogContent, TextField, Divider, FormControlLabel, Checkbox, IconButton } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/EmailOutlined';
import CloseIcon from '@material-ui/icons/Close';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import PersonIcon from '@material-ui/icons/Person';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './style';
import { getTokenData } from 'utils';
import { useTranslation } from 'react-i18next';
import { AppContext } from 'shared/contexts';
import KeyIcon from '@mui/icons-material/Key';
import PasswordIcon from '@mui/icons-material/Password';
import "../../../shared/Shared.css";
import config from "config";

const noop = () => { };
const defaultState = {
  email: '',
  confirmEmail: '',
  password: '',
  confirmPassword: '',
  mobile: '',
  name: '',
  state: '',
  grantToDelete: false,
  isLoading: false,
  errors: {
    email: ' ',
    confirmEmail: ' ',
    password: ' ',
    confirmPassword: ' ',
    mobile: ' ',
    name: ' ',
    state: ' ',
  }
};

const Form = ({
  open = false,
  entry = null,
  onClose = noop
}) => {
  const { lang } = useContext(AppContext);
  const { t } = useTranslation();
  const classes = useStyles();
  const [state, setState] = useState(defaultState);
  const userData = getTokenData();

  useEffect(() => {
    if (entry) {
      setState(prevState => ({
        ...prevState,
        email: entry.email || defaultState.email,
        name: entry.name || defaultState.name,
        password: entry.password || defaultState.password,
        confirmPassword: entry.confirmPassword || defaultState.confirmPassword,
        mobile: entry.mobile || defaultState.mobile,
        state: entry.statusMessage || defaultState.state,
        grantToDelete: entry.deleteOwner || defaultState.grantToDelete,
      }))
    }
  }, [entry]);

  const handleClose = (isSubmitted = false) => {
    setState(defaultState);
    onClose(isSubmitted);
  };

  const handleChange = evt => {
    const { name, value } = evt.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
      errors: {
        ...prevState.errors,
      }
    }));
  };

  const handleSubmit = async () => {
    setState(prevState => ({ ...prevState, isLoading: true }));
    const { email, mobile, grantToDelete } = state;
    const { data, error } = await Service.addUser({
      email,
      mobile,
      grantToDelete: grantToDelete ? 1 : 0
    });
    if (error) {
      toast.error(error);
      setState(prevState => ({ ...prevState, isLoading: false }));
    } else {
      setState(prevState => ({
        ...prevState,
        isLoading: false,
      }));
      toast.success(t("popupCreated"));
      handleClose(true);
    }
  };

  const handleDelete = async () => {
    setState(prevState => ({ ...prevState, isLoading: true }));
    const { data, error } = await Service.deleteUser({
      userId: String(entry.userId),
    });
    if (error) {
      toast.error(error);
      setState(prevState => ({ ...prevState, isLoading: false }));
    } else {
      setState(prevState => ({
        ...prevState,
        isLoading: false,
      }));
      toast.success(t('popupDeleted'));
      handleClose(true);
    }
  };

  const approveUser = async () => {
    setState(prevState => ({ ...prevState, isLoading: true }));
    const { email } = state;
    const { data, error } = await Service.approveUser({
      email,
      userId: String(entry.userId),
      partnerName: (getTokenData() || {}).partnerName,
      "dt1": ""
    });
    if (error) {
      toast.error(error);
      setState(prevState => ({ ...prevState, isLoading: false }));
    } else {
      setState(prevState => ({
        ...prevState,
        isLoading: false,
      }));
      toast.success(t('popupApproved'));
    }
  };

  const handleEdit = async () => {
    setState(prevState => ({ ...prevState, isLoading: true }));
    const { email, name, state: statusMessage, mobile, grantToDelete } = state;
    const { data, error } = await Service.editUser({
      email,
      userName: name,
      userId: String(entry.userId),
      mobile,
      state: statusMessage,
      grantToDelete: grantToDelete ? 1 : 0,
      partnerName: (getTokenData() || {}).partnerName
    });
    if (error) {
      toast.error(error);
      setState(prevState => ({ ...prevState, isLoading: false }));
    } else {
      setState(prevState => ({
        ...prevState,
        isLoading: false,
      }));
      toast.success(t('popupEdited'));
      handleClose(true);
    }
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        open={open}
        classes={{
          paper: classes.paper,
        }}
      >
        <DialogTitle>
          <div className="d-flex f-align-center f-justify-between">
            <Typography variant="h5">
              {entry ? t("User information") : t("usersUser registration")}
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider />
        <DialogContent className="mt-4">
          <TextField
            disabled={!!entry}
            fullWidth
            label={t('usersEmail Address')}
            name="email"
            variant="outlined"
            value={state.email}
            error={state.errors.email.trim()}
            helperText={state.errors.email}
            onChange={handleChange}
            InputProps={{ endAdornment: <EmailIcon /> }}
          />
          {entry && (
            <TextField
              fullWidth
              label={t('usersName')}
              name="name"
              variant="outlined"
              value={state.name}
              error={state.errors.name.trim()}
              helperText={state.errors.name}
              onChange={handleChange}
              InputProps={{ endAdornment: <PersonIcon /> }}
            />
          )}
          {!entry && (
            <TextField
              fullWidth
              label={t('usersConfirm Email Address')}
              name="confirmEmail"
              variant="outlined"
              value={state.confirmEmail}
              error={state.errors.confirmEmail.trim()}
              helperText={state.errors.confirmEmail}
              onChange={handleChange}
              InputProps={{ endAdornment: <EmailIcon /> }}
            />
          )}
          {!entry &&
            <>
              <TextField
                fullWidth
                label={t('Password')}
                variant="outlined"
                type="password"
                name='password'
                value={state.password}
                error={state.errors.password.trim()}
                helperText={state.errors.password}
                onChange={handleChange}
                InputProps={{ endAdornment: <PasswordIcon /> }}
              />
              <TextField
                fullWidth
                label={t('Confirm Password')}
                variant="outlined"
                type="password"
                name='confirmPassword'
                value={state.confirmPassword}
                error={state.errors.confirmPassword.trim()}
                helperText={state.errors.confirmPassword}
                onChange={handleChange}
                InputProps={{ endAdornment: <KeyIcon /> }}
              />
            </>
          }
          <TextField
            fullWidth
            label={t('usersMobile Number')}
            name="mobile"
            variant="outlined"
            value={state.mobile}
            error={state.errors.mobile.trim()}
            helperText={state.errors.mobile}
            onChange={handleChange}
            InputProps={{ endAdornment: <PhoneIphoneIcon /> }}
          />
          {entry && (
            <TextField
              disabled
              fullWidth
              label={t('summarystate')}
              name="state"
              variant="outlined"
              value={state.state}
              error={state.errors.state.trim()}
              helperText={state.errors.state}
              onChange={handleChange}
              InputProps={{ endAdornment: <DonutLargeIcon /> }}
            />
          )}
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={state.grantToDelete}
                name="grantToDelete"
                onChange={(evt) =>
                  setState((prevState) => ({
                    ...prevState,
                    grantToDelete: evt.target.checked,
                  }))
                }
              />
            }
            label={t('users deletion rights')}
          />
        </DialogContent>
        <DialogActions>
          <div className="p-4">
            <Button
              disabled={false}
              onClick={handleClose}
              className={`mr-4 ${classes.ButtonSimilarWidth}`}
              variant="contained"
            >
              {t('settingsCancel')}
            </Button>
            {!entry ? (
              <Button
                variant="contained"
                className={`Btn-Color ${classes.ButtonSimilarWidth}`}
                disabled={false}
                onClick={handleSubmit}
              >
                {t('usersAdd')}
              </Button>
            ) : (
              <>

                {userData.userRole !== "10" && (
                  <Button
                    variant="contained"
                    disabled={false}
                    onClick={handleDelete}
                    className={`mr-4 bg-danger color-white ${classes.ButtonSimilarWidth}`}
                  >
                    {t('summarydelete')}
                  </Button>
                )}
                {entry?.status === "4" && (
                  <Button
                    variant="contained"
                    color="success"
                    disabled={false}
                    onClick={approveUser}
                    className={clsx('color-white', classes.approveBtn)}
                  >
                    {t('userEditApprove')}
                  </Button>
                )}
                {entry?.status !== "4" && (
                  <Button
                    variant="contained"
                    className={`Btn-Color ${classes.ButtonSimilarWidth}`}
                    disabled={false}
                    onClick={handleEdit}
                  >
                    {t('summarySave')}
                  </Button>
                )}
              </>
            )}
          </div>
        </DialogActions>
      </Dialog>
      <Backdrop className={classes.backdrop} open={state.isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Form;