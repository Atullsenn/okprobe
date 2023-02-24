import { http } from 'services';
import { responseFormatter } from 'utils';

const getDeviceList = data => {
  return responseFormatter(http.post('/GetEndCustomerDetailDeviceListForWeb', data, {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    setAuth: true,
  }));
};

const GetUnassignDeviceCount = data => {
  return responseFormatter(http.post('/GetUnassignDeviceCount', data, {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    setAuth: true,
  }));
};

const GetWaitDeviceCount = data => {
  return responseFormatter(http.post('/GetWaitDeviceCount', data, {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    setAuth: true,
  }));
};

const SharedService = {
  getDeviceList,
  GetUnassignDeviceCount,
  GetWaitDeviceCount
};

export default SharedService;