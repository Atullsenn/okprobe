import { http, frontendApiInstance } from 'services';
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

const getMessages = data => {
  return responseFormatter(http.post('/GetDeviceMemoList', data, {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    setAuth: true,
  }));
};

const saveMessage = data => {
  return responseFormatter(http.post('/AddDeviceMemo', data, {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    setAuth: true,
  }));
};

const uploadChatImage = (data) => {
  return responseFormatter(
    frontendApiInstance.post("/upload", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};

const removeChatCount = (data) => {
  return responseFormatter(
    http.post("/MarkRead", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
      removeParterId: true,
    })
  );
};

const OKTalkService = {
  getDeviceList,
  getMessages,
  saveMessage,
  uploadChatImage,
  removeChatCount,
};
export default OKTalkService;