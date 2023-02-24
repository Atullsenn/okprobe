import { http } from 'services';
import { responseFormatter } from 'utils';

const post = data => {
  return responseFormatter(http.post('/GetPartnerSetting', data, {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    setAuth: true,
  }));
};

const saveSettings = data => {
  return responseFormatter(http.post('/EditPartnerSetting', data, {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    setAuth: true,
  }));
};

const SettingsService = {
  post,
  saveSettings
};
export default SettingsService;