import { http, frontendApiInstance } from "services";
import { responseFormatter } from "utils";

const post = (data) => {
  return responseFormatter(
    http.post("/GetUser", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};

const saveSettings = (data) => {
  return responseFormatter(
    http.post("/EditUser", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};

const uploadAvtar = (data) => {
  console.log("upload imageeeeeeeeeeeeee")
  console.log(data)
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

const ProfileService = {
  post,
  saveSettings,
  uploadAvtar,
};
export default ProfileService;
