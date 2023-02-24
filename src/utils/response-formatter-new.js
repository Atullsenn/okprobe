import { removeTokenData } from "./token";

let alreadyRedirected = false;
const redirectToLogin = () => {
  if (alreadyRedirected) return;
  alreadyRedirected = true;
  removeTokenData();
  window.location.replace('/login')
}

//Atul 28-9-2022
export const responseFormatterNew = async api => {
  
  try {
    const { data: response, status, ...request } = await api;
    if (response?.ReturnCode == 400 || response?.ReturnCode == 401) { 
      if (request?.config?.url !== '/Login') {
        redirectToLogin();
      }
    }
    console.log("+++++++++++++++++++++++++++++++++++++++")
    console.log(response)
    console.log("+++++++++++++++++++++++++")
    return {
      data: response,
      message: '',
      error: '',
    };
  } catch (err) {
    return {
      data: null,
      message: 'Something went wrong. Please contact to administrator.',
      error: 'Something went wrong. Please contact to administrator.',
    };
  }
};



// export default responseFormatterNew;