import { http, frontendApiInstance } from 'services';
import { responseFormatter } from 'utils';

const getDeviceList = data => {
  return responseFormatter(http.post('/GetEndCustomerDetailDeviceListForWeb', data, {
    setAuth: true,
  }));
};

const getMessages = data => {
  return responseFormatter(http.post('/GetDeviceMemoList', data, {
    setAuth: true,
  }));
};

const saveMessage = data => {
  return responseFormatter(http.post('/AddDeviceMemo', data, {
    setAuth: true,
  }));
};

const uploadChatImage = (data) => {
  return responseFormatter(
    frontendApiInstance.post("/upload", data, {
      setAuth: true,
    })
  );
};

const removeChatCount = (data) => {
  return responseFormatter(
    http.post("/MarkRead", data, {
      setAuth: true,
      removeChatCount: true,
    })
  );
};

const OKTalkService = {
  getDeviceList,
  getMessages,
  saveMessage,
  uploadChatImage,
  removeChatCount
};
export default OKTalkService;