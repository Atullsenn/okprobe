import { http } from 'services';
import { responseFormatter } from 'utils';

const post = data => {
  return responseFormatter(http.post('/Login', data));
};

const loginSNS = data => {
  return responseFormatter(http.post('/LoginSNS', data));
};

const LoginService = {
  post,
  loginSNS
};
export default LoginService;