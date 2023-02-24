import { http } from 'services';
import { responseFormatter } from 'utils';

const post = data => {
  return responseFormatter(http.post('/GetUserList', data, {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    setAuth: true,
  }));
};

const addUser = data => {
  return responseFormatter(http.post('/AddUser', data, {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    setAuth: true,
  }));
};

const editUser = data => {
  return responseFormatter(http.post('/EditUser', data, {
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

const approveUser = data => {
  return responseFormatter(http.post('/ApproveUser', data, {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    setAuth: true,
  }));
};

const UsersService = {
  post,
  addUser,
  editUser,
  deleteUser,
  approveUser,
};
export default UsersService;