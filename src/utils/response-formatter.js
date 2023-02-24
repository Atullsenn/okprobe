import { removeTokenData } from "./token";

let alreadyRedirected = false;
const redirectToLogin = () => {
  if (alreadyRedirected) return;
  alreadyRedirected = true;
  removeTokenData();
  window.location.replace('/login')
}
const responseFormatter = async api => {

  try {
    const { data: response, status, ...request } = await api;
    if (response?.ReturnCode == 400 || response?.ReturnCode == 401) {
      if (request?.config?.url !== '/Login') {
        redirectToLogin();
      }
    }

    return {
      data: response?.Data,
      message: response?.Reason,
      error: response?.Reason,
    };
  } catch (err) {
    return {
      data: null,
      message: 'Something went wrong. Please contact to administrator.',
      error: 'Something went wrong. Please contact to administrator.',
    };
  }
};



export default responseFormatter;