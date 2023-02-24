import { http } from "services";
import { responseFormatter } from "utils";

const post = (data) => {
  return responseFormatter(
    http.post("/GetEndCustomerForWeb", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
      removeParterId: !!data.partnerId,
    })
  );
};

const GetEndCustomerDeviceList = (data) => {
  return responseFormatter(
    http.post("/GetEndCustomerDeviceList", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};

const EditEndCustomerName = (data) => {
  return responseFormatter(
    http.post("/EditEndCustomerName", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};

const DeleteCustomer = (data) => {
  return responseFormatter(
    http.post("/DeleteCustomer", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};

const CustomersService = {
  post,
  GetEndCustomerDeviceList,
  EditEndCustomerName,
  DeleteCustomer,
};
export default CustomersService;


