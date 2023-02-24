import { useContext, useEffect } from 'react';
import { setTokenData } from 'utils';
import Service from './service';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { AppContext } from 'shared/contexts';
import config from 'config';

const NaverLogin = ({ history }) => {
  const { t } = useTranslation();
  const { showLoader } = useContext(AppContext);



  const handleLoginSNS = async (payload = {}) => {
    showLoader(true);
    const { data, error } = await Service.loginSNS(payload);
    if (error) {
      showLoader(false);
      return toast.error(error || t('popupSomethingWrong'));
    }
    
    if (data.userSessionToken) {
      setTokenData(data);
      setTimeout(() => {
        showLoader(false);
        history.push('/summary');
      }, 1000);
    } else {
      showLoader(false);
    }
  };


  useEffect(() => {
    var naverLogin = window.naver && new window.naver.LoginWithNaverId({
      clientId: config.naverClientId,
      callbackUrl: config.naverCallbackUrl,
    });
    if (naverLogin) {
      naverLogin.init();
      naverLogin.getLoginStatus(status => {
        if (status) {
          var email = naverLogin?.user?.email;
          var accessToken = naverLogin?.accessToken?.accessToken;
          console.log(accessToken, 'naverLogin');
          if (email == undefined) {
            email = naverLogin?.user?.id;
          }
          handleLoginSNS({
            "userId": email,
            "userSessionToken": accessToken,
            "maintainLogin": 'Y',
            "loginType": 2,
            "dt1": "",
            "userName": "",
            "userMobile": "",
            "userEmail": "",
            "partnerEmail": ""
          });
        } else {
          console.log("callback 처리에 실패하였습니다.");
        }
      });
    } else {
      console.log('errror naver')
    }
  }, []);
  return null;
};

export default NaverLogin;