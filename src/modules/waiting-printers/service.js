import { http } from "services";
import { responseFormatter } from "utils";

const GetWaitDeviceList = (data) => {
  return responseFormatter(
    http.post("/GetWaitDeviceList", data, {
      setAuth: true,
    })
  );
};

const GetDeviceInfoForWeb = (data) => {
  return responseFormatter(
    http.post("/GetDeviceInfoForWeb", data, {
      setAuth: true,
    })
  );
};

const GetEndCustomerSearchList = (data) => {
  return responseFormatter(
    http.post("/GetEndCustomerSearchList", data, {
      setAuth: true,
    })
  );
};

const AssignWaitDevice = (data) => {
  return responseFormatter(
    http.post("/AssignWaitDevice", data, {
      setAuth: true,
    })
  );
};

const DeleteDevice = (data) => {
  return responseFormatter(
    http.post("/DeleteDevice", data, {
      setAuth: true,
    })
  );
};

const AddCustomer = (data) => {
  return responseFormatter(
    http.post("/AddCustomer", data, {
      setAuth: true,
    })
  );
};

const UsersService = {
  GetWaitDeviceList,
  GetEndCustomerSearchList,
  GetDeviceInfoForWeb,
  AssignWaitDevice,
  DeleteDevice,
  AddCustomer,
};
export default UsersService;
