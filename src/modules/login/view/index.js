import { useCallback, useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { ERROR_MESSAGES } from 'shared/constants';
import { setTokenData } from 'utils';
import Service from '../service';
import isEmail from 'validator/es/lib/isEmail';
import Button from '@material-ui/core/Button';
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
import Form from 'modules/users/form';
import { AppContextConsumer } from 'shared/contexts';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import GoogleLogin from 'react-google-login';
import config from 'config';
import { AppContext } from 'shared/contexts';
import $ from 'jquery'
import "./loginStyle.css";
let naverLogin = null;
const defaultState = {
  email: '',
  password: '',
  remember: false,
  errors: {
    email: ' ',
    password: ' ',
  }
};


const ViewLogin = ({ history }) => {
  const { t } = useTranslation();
  const { showLoader, setAvatar } = useContext(AppContext);
  const classes = useStyles();
  const [state, setState] = useState(defaultState);

  const validate = (name, value) => {
    let isValid = true;
    const fieldValidator = {
      email: isEmail,
      password: value => !!value,
    }

    if (fieldValidator[name]) {
      isValid = fieldValidator[name](value);
    } else {
      isValid = true;
      Object.keys(fieldValidator).map(key => {
        if (!fieldValidator[key](state[key])) {
          isValid = false
        }
      })
    }
    return isValid;
  };

  const handleChange = evt => {
    const { name, value } = evt.target;
    const errorMessage = validate(name, $.trim(value)) ? ' ' : t(`login_error_${name}`);
    setState(prevState => ({
      ...prevState,
      [name]: $.trim(value),
      errors: {
        ...prevState.errors,
        [name]: errorMessage,
      }
    }));
  };

  const handleSubmit = async () => {
    const probeRememberMe = localStorage.getItem("probeRememberMe") == "true"
    showLoader(true);
    const { data, error } = await Service.post({
      dt1: "2022-08-09 10:00:00.000",
      userId: state.email,
      userPassword: state.password,
      maintainLogin: probeRememberMe ? 'Y' : 'N',
    });
    console.log("state")
    console.log(state)
    console.log("login data")
    console.log(data)

    if (error) {
      showLoader(false);
      return toast.error(error || t('popupSomethingWrong'));
    }

    if (data.userSessionToken) {
      setTokenData(data);
      setAvatar(`${config.frontendUrl}/${data?.profileImage}`);
      history.push('/users');
    }
    showLoader(false);
  };

  const handleUserRememberMe = (e) => {
    if (e.target.checked) {
      localStorage.setItem('probeRememberMe', e.target.checked);
    } else {
      localStorage.setItem('probeRememberMe', e.target.checked);
    }
  }

  const handleLoginSNS = async (payload = {}) => {
    showLoader(true);
    const { data, error } = await Service.loginSNS(payload);
    if (error) {
      showLoader(false);
      return toast.error(error || t('popupSomethingWrong'));
    }

    if (data.userSessionToken) {
      setTokenData({
        ...data,
        loginType: payload.loginType || -1
      });
      setTimeout(() => {
        showLoader(false);
        history.push('/summary');
      }, 3000)
    } else {
      showLoader(false);
    }
  };

  const responseGoogle = useCallback((googleUser) => {
    var profile = googleUser.getBasicProfile();
    var googleUserEmail = profile.getEmail();
    var googleIdToken = googleUser.getAuthResponse().id_token;
    if (googleUserEmail != null && googleUserEmail != '' && googleIdToken != null && googleIdToken != '') {
      handleLoginSNS({
        "userId": googleUserEmail,
        "userSessionToken": googleIdToken,
        "maintainLogin": 'Y',
        "loginType": 1,
        "dt1": "",
        "userName": "",
        "userMobile": "",
        "userEmail": "",
        "partnerEmail": ""
      });
    }
  }, []);

  const loginWithKakao = () => {
    window?.Kakao?.Auth?.loginForm({
      success: function (authObj) {
        window.Kakao.Auth.setAccessToken(authObj.access_token);
        window.Kakao.Auth.getStatusInfo(function (statusObject) {
          handleLoginSNS({
            "userId": statusObject.user.id,
            "userSessionToken": authObj.access_token,
            "maintainLogin": 'Y',
            "loginType": 3,
            "dt1": "",
            "userName": "",
            "userMobile": "",
            "userEmail": "",
            "partnerEmail": ""
          });
        });
      },
      fail: (err) => {
        console.log(JSON.stringify(err));
        alert("카카오로그인에 실패하였습니다.\n\n관리자에게 문의하여 주세요.");
      },
    });
  };

  useEffect(() => {
    if (window.Kakao) {
      window.Kakao.init(config.kakaoCleintId);
    }
    var naverLogin = window.naver && new window.naver.LoginWithNaverId({
      clientId: config.naverClientId,
      callbackUrl: config.naverCallbackUrl,
      isPopup: false, /* 팝업을 통한 연동처리 여부 */
      loginButton: { color: "green", type: 3, height: 48 } /* 로그인 버튼의 타입을 지정 */
    });
    if (naverLogin) {
      naverLogin && naverLogin.init();
    }
    localStorage.removeItem('probe-ignore-showed');
  }, []);
  const isFormValid = validate();

  useEffect(() => {
    localStorage.setItem('probeRememberMe', false);
  }, [])

  return (
    <>
      {config.mode === 'ENT' ?
        <div className={clsx('d-flex flex-column f-align-center f-justify-center', classes.loginWrapper)}>
          <AppContextConsumer>
            {({
              lang,
              setLang
            }) => (
              <div className='p-absolute mr-5 mt-1' style={{ top: 0, right: 0 }}>
                <FormControl>
                  <Select
                    value={lang}
                    onChange={evt => setLang(evt.target.value || 'en')}
                  >
                    <MenuItem value='en'>English (EN)</MenuItem>
                    <MenuItem value='ko'>한국어 (KO)</MenuItem>
                  </Select>
                </FormControl>
              </div>
            )}
          </AppContextConsumer>
          <img style={{ margin: '15px 0px 10px 0px', }} alt='Organisation Logo' src={OrgImg} />
          <Paper elevation={4} style={{ width: '315px', height: '190px', color: '#666' }} className={clsx('p-5 d-flex flex-column f-align-center', classes.paper)}>
            <div style={{ display: 'none' }} class="text-center mt-3">
              <div id="naverIdLogin"></div>
            </div>
            <TextField
              fullWidth
              label={t('loginEmail')}
              name='email'
              variant='outlined'
              size='small'
              className='mt-4 textColor'
              error={state.errors.email.trim()}
              helperText={state.errors.email}
              value={state.email}
              onChange={handleChange}
              InputProps={{ endAdornment: <EmailIcon style={{ color: '#666' }} /> }}
            />
            <TextField
              className='mt-1'
              fullWidth
              style={{ color: '#666' }}
              type='password'
              label={t('loginPassword')}
              name='password'
              variant='outlined'
              size='small'
              error={state.errors.password.trim()}
              helperText={state.errors.password}
              value={state.password}
              onChange={handleChange}
              InputProps={{ endAdornment: <LockIcon style={{ color: '#666' }} /> }}
              onKeyPress={evt => {
                if (evt.code === 'Enter' && isFormValid) {
                  handleSubmit();
                }
              }}
            />
            <div className='d-flex f-justify-between w-100 checkBox-Button-Space-Area'>
              <div className='Remember'>
                <input type="checkbox" name="maintainLoginCheckBox" id="maintainLoginCheckBox" onChange={e => handleUserRememberMe(e)} />
                <input type="hidden" name="maintainLogin" id="maintainLogin" />
                <label for="maintainLoginCheckBox" class="mb-0" data-i18n="okp.login.remember">Remember Me</label>
              </div>
              <Button
                type='submit'
                variant='contained'
                size='small'
                className={clsx('color-white Sign-in-Btn', classes.loginBtn)}
                disabled={!isFormValid}
                onClick={handleSubmit}
              >
                {t('loginSubmit')}
              </Button>
            </div>
          </Paper>
          <p style={{ marginLeft: '40px' }} className={clsx('', classes.login_info)}>Build:0.1.0 / 07 October 2022 02:30 PM</p>
        </div> :
        <div className={clsx('d-flex flex-column f-align-center f-justify-center', classes.loginWrapper)}>
          <AppContextConsumer>
            {({
              lang,
              setLang
            }) => (
              <div className='p-absolute mr-5 mt-1' style={{ top: 0, right: 0 }}>
                <FormControl>
                  <Select
                    value={lang}
                    onChange={evt => setLang(evt.target.value || 'en')}
                  >
                    <MenuItem value='en'>English (EN)</MenuItem>
                    <MenuItem value='ko'>한국어 (KO)</MenuItem>
                  </Select>
                </FormControl>
              </div>
            )}
          </AppContextConsumer>
          <img style={{ margin: '15px 0px 10px 0px', }} alt='Organisation Logo' src={OrgImg} />
          <Paper elevation={4} style={{ width: '315px', height: '480px', color: '#666' }} className={clsx('p-5 d-flex flex-column f-align-center', classes.paper)}>
            <Typography style={{ padding: '4px 0px' }} variant='body1'>{t('loginTitle')}</Typography>
            <img
              alt='Kakao CTA'
              src={KakaoImg}
              className='mt-4 c-pointer'
              onClick={loginWithKakao}
            />
            <div class="text-center mt-3">
              <div id="naverIdLogin"></div>
            </div>
            <GoogleLogin
              className={clsx('g-signin2 mt-2 color-white', classes.googleSignInBtn)}
              clientId={config.googleClientId}
              buttonText={t('loginSubmit')}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
            <Divider className='mt-4 w-100' />
            <Typography variant='body1' className='mt-4'>{t('loginAuthentication')}</Typography>
            <TextField
              fullWidth
              label={t('loginEmail')}
              name='email'
              variant='outlined'
              size='small'
              className='mt-4 textColor Removepara'
              error={state.errors.email.trim()}
              helperText={state.errors.email}
              value={state.email}
              onChange={handleChange}
              InputProps={{ endAdornment: <EmailIcon style={{ color: '#666' }} /> }}
            />
            <TextField
              className='mt-1'
              fullWidth
              style={{ color: '#666' }}
              type='password'
              label={t('loginPassword')}
              name='password'
              variant='outlined'
              size='small'
              error={state.errors.password.trim()}
              helperText={state.errors.password}
              value={state.password}
              onChange={handleChange}
              InputProps={{ endAdornment: <LockIcon style={{ color: '#666' }} /> }}
              onKeyPress={evt => {
                if (evt.code === 'Enter' && isFormValid) {
                  handleSubmit();
                }
              }}
            />
            <div className='d-flex f-justify-between w-100 checkBox-Button-Space-Area'>
              <div className='Remember'>
                <input type="checkbox" name="maintainLoginCheckBox" id="maintainLoginCheckBox" onChange={e => handleUserRememberMe(e)} />
                <input type="hidden" name="maintainLogin" id="maintainLogin" />
                <label for="maintainLoginCheckBox" class="mb-0" data-i18n="okp.login.remember">Remember Me</label>
              </div>
              <Button
                type='submit'
                variant='contained'
                size='small'
                className={clsx('color-white Sign-in-Btn', classes.loginBtn)}
                disabled={!isFormValid}
                onClick={handleSubmit}
              >
                {t('loginSubmit')}
              </Button>
            </div>
          </Paper>
          <p style={{ marginLeft: '40px' }} className={clsx('', classes.login_info)}>Build:0.1.0 / 07 October 2022 02:30 PM</p>
        </div>
      }
    </>
  )
};

export default ViewLogin;