import { http } from 'services';
import { responseFormatter } from 'utils';

const GetUnassignDeviceList=(data)=>{
  return responseFormatter(http.post('/GetUnassignDeviceList', data, {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    setAuth: true,
  }));
}


const GetDeviceInfoForWeb=(data)=>{
  return responseFormatter(http.post('/GetDeviceInfoForWeb', data, {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    setAuth: true,
  }));
}

const GetEndCustomerSearchList=(data)=>{
  return responseFormatter(http.post('/GetEndCustomerSearchList', data, {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    setAuth: true,
  }));
}


const UpdateDeviceForWeb=(data)=>{
  return responseFormatter(http.post('/UpdateDeviceForWeb', data, {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    setAuth: true,
    removeParterId: true,
  }));
}

const UpdateDeviceStatus=(data)=>{
  return responseFormatter(http.post('/UpdateDeviceStatus', data, {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    setAuth: true,
  }));
}

const DeleteDevice=(data)=>{
  return responseFormatter(http.post('/DeleteDevice', data, {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    setAuth: true,
  }));
}

const AddCustomer=(data)=>{
  return responseFormatter(http.post('/AddCustomer', data, {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    setAuth: true,
  }));
}



const UsersService = {
  GetUnassignDeviceList,
  GetEndCustomerSearchList,
  GetDeviceInfoForWeb,
  UpdateDeviceForWeb,
  DeleteDevice,
  UpdateDeviceStatus,
  AddCustomer
};
export default UsersService;