import { http } from 'services';
import { responseFormatter } from 'utils';
const loginSNS = data => {
  return responseFormatter(http.post('/LoginSNS', data));
};

const NaverLoginService = {
  loginSNS
};
export default NaverLoginService;