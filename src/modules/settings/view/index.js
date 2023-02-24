import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { ERROR_MESSAGES } from 'shared/constants';
import { setToken } from 'utils';
import Service from '../service';
import isEmail from 'validator/es/lib/isEmail';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import OrgImg from 'assets/images/org-logo.png';
import KakaoImg from 'assets/images/kakao-cta.png';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import useStyles from './style';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import "../../../shared/Shared.css";
import { getTokenData } from "utils";

const defaultState = {
  additionalEmail: '',
  defaultEmail: '',
  deviceDeletePeriod: '',
  noticeNoEmail: '',
  noticeNoUse: '',
  noticeUsageLevel: '',
  partnerName: '',
  isLoading: false,
  errors: {}
};

const ViewSettings = ({ history }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [state, setState] = useState(defaultState);
  const userData = getTokenData();

  console.log(userData.userRole, 'data');

  const fetchSetiingsData = async () => {
    setState(prevState => ({ ...prevState, isLoading: true }));

    const { data, error } = await Service.post();


    if (error) {
      toast.error(error);
      setState(prevState => ({ ...prevState, isLoading: false }));
    } else {
      setState(prevState => ({
        ...prevState,
        additionalEmail: data?.additionalEmail || defaultState.additionalEmail,
        defaultEmail: data?.defaultEmail || defaultState.defaultEmail,
        deviceDeletePeriod: data?.deviceDeletePeriod || defaultState.deviceDeletePeriod,
        noticeNoEmail: data?.noticeNoEmail || defaultState.noticeNoEmail,
        noticeNoUse: data?.noticeNoUse || defaultState.noticeNoUse,
        noticeUsageLevel: data?.noticeUsageLevel || defaultState.noticeUsageLevel,
        partnerName: data?.partnerName || defaultState.partnerName,
        isLoading: false,
      }));
    }
  };






  useEffect(() => {
    fetchSetiingsData();
  }, []);

  const handleChange = (evt) => {
    const { name, value } = evt.currentTarget;
    let error = '';
    if (value && name == 'additionalEmail') {
      let email = value.trim().replace(/[\s;,]+/g, ',');
      const emails = email.split(',');
      const regex = /^(([^<>()[\]\\.,\s@"]+(\.[^<>()[\]\\.,\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      for (let i = 0; i < emails.length; i++) {
        if (value.length > 0 && !regex.test(emails[i])) {
          error = 'Please enter valid email address';
        }
      }
    }

    setState(prevState => ({
      ...prevState,
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: error,
      },
    }));
  };

  const handleSubmit = async () => {
    setState(prevState => ({ ...prevState, isLoading: true }));

    const { isLoading, errors, ...payload } = state;

    const { error } = await Service.saveSettings(payload);


    if (error) {
      toast.error(error);
      setState(prevState => ({ ...prevState, isLoading: false }));
    } else {
      setState(defaultState);
      toast.success(t('popupSaved'));
      fetchSetiingsData();
    }
  };

  return (
    <>
      <div className='d-flex f-align-center f-justify-between mb-8'>
        <Typography variant='h4'>
          {t('settingsTitle')}
        </Typography>
      </div>
      <Paper elevation={4} className='p-4'>
        <div className='wraplayout'>
          <TextField
            name='noticeNoEmail'
            fullWidth
            className={`${userData.userRole === '20' ? '' : classes.disableColor}`}
            variant='outlined'
            size='small'
            label={t('settingsWarningDuration')}
            value={state.noticeNoEmail}
            onChange={handleChange}
            disabled={userData.userRole === '20' ? false : true}
          />
          <TextField
            name='noticeUsageLevel'
            className={`mt-6 ${userData.userRole === '20' ? '' : classes.disableColor}`}
            fullWidth
            variant='outlined'
            size='small'
            label={t('settingsShortTime')}
            value={state.noticeUsageLevel}
            onChange={handleChange}
            disabled={userData.userRole === '20' ? false : true}
          />
          <TextField
            name='noticeNoUse'
            className={`mt-6 ${userData.userRole === '20' ? '' : classes.disableColor}`}
            fullWidth
            variant='outlined'
            size='small'
            label={t('settingsNoUsage')}
            value={state.noticeNoUse}
            onChange={handleChange}
            disabled={userData.userRole === '20' ? false : true}
          />
          <TextField
            name='deviceDeletePeriod'
            className={`mt-6 ${userData.userRole === '20' ? '' : classes.disableColor}`}
            fullWidth
            variant='outlined'
            size='small'
            label={t('settingsCompletelyDelete')}
            value={state.deviceDeletePeriod}
            onChange={handleChange}
            disabled={userData.userRole === '20' ? false : true}
          />
          <TextField
            name='defaultEmail'
            className={`mt-6 ${userData.userRole === '20' ? '' : classes.disableColor}`}
            fullWidth
            variant='outlined'
            size='small'
            label={t('settingsDefaultSenderEmail')}
            value={state.defaultEmail}
            onChange={handleChange}
            error={!!state?.errors?.defaultEmail}
            helperText={state?.errors?.defaultEmail}
            disabled={userData.userRole === '20' ? false : true}
          />
          <TextField
            name='additionalEmail'
            className={`mt-6 ${userData.userRole === '20' ? '' : classes.disableColor}`}
            fullWidth
            variant='outlined'
            size='small'
            label={t('settingsAdditionalSenderEmail')}
            value={state.additionalEmail}
            onChange={handleChange}
            error={!!state?.errors?.additionalEmail}
            helperText={state?.errors?.additionalEmail}
            disabled={userData.userRole === '20' ? false : true}
          />
          <TextField
            name='partnerName'
            className={`mt-6 ${userData.userRole === '20' ? '' : classes.disableColor}`}
            fullWidth
            variant='outlined'
            size='small'
            label={t('settingsCompanyName')}
            value={state.partnerName}
            onChange={handleChange}
            disabled={userData.userRole === '20' ? false : true}
          />
          <div className='d-flex f-align-center pt-5'>
            <Button
              variant='contained'
              fullWidth
              className='mr-10'
              size='large'
              onClick={() => history.push('/notice')}
            >
              {t('settingsCancel')}
            </Button>
            <Button
              fullWidth
              className='ml-10 Btn-Color'
              size='large'
              variant='contained'
              onClick={handleSubmit}
            >
              {t('settingsSave')}
            </Button>
          </div>
        </div>
      </Paper>
    </>
  );
};

export default ViewSettings;