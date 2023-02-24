import axios from 'axios';
import config from 'config';
import { getJSONStringForBigNumber } from 'utils';
const apiInstance = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 30000,

  headers: {
    Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  transformResponse: (data) => {
    return getJSONStringForBigNumber(data);
  },
});


apiInstance.interceptors.request.use(config => {
  if (config.setAuth) {
    const partnerId = localStorage.getItem('probe-partnerid');
    const userSessionToken = localStorage.getItem('probe-auth');
    let authPayload = {
      partnerId,
      userSessionToken,
    }
    if (config.removeParterId) {
      delete authPayload.partnerId;
    }
    config.data = {
      ...config.data,
      ...authPayload
    };
  }

  if (config.setTimeout) {
    config.timeout = config.setTimeout;
  }
  
  return config;
});

export const frontendApiInstance = axios.create({
  baseURL: config.frontendBaseUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'multipart/formdata',
    Accept: 'application/json',
  },
});

export default apiInstance;