import { http } from 'services';
import { responseFormatter } from 'utils';

const post = data => {
  return responseFormatter(http.post('/GetMailLogList', data, {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    setAuth: true,
  }));
};

const DataProcessService = {
  post,
};
export default DataProcessService;