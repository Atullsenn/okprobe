import { http } from 'services';
import { responseFormatter } from 'utils';

const contractStatus = data => {
  return responseFormatter(http.post('/GetPartnerDeviceContractList', data, {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    setAuth: true,
  }));
};

const optionList = data => {
  return responseFormatter(http.post('/GetEventTimeLineList', data, {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    setAuth: true,
  }));
};

const getSummaryStatus = data => {
  return responseFormatter(http.post('/GetDeviceStatusSummary', data, {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    setAuth: true,
  }));
};

const deleteUser = data => {
  return responseFormatter(http.post('/DeleteUser', data, {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    setAuth: true,
  }));
};

const GetBookmarkList = data => {
  return responseFormatter(http.post('/GetBookmarkList', data, {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    setAuth: true,
  }));
};

const GetEndCustomerDetailDeviceList = data => {
  return responseFormatter(http.post('/GetEndCustomerDetailDeviceList', data, {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    setAuth: true,
  }));
};

const SummaryService = {
  GetEndCustomerDetailDeviceList,
  contractStatus,
  optionList,
  getSummaryStatus,
  deleteUser,
  GetBookmarkList
};

export default SummaryService;