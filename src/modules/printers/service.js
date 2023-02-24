import { http ,frontendApiInstance} from "services";
import { responseFormatter } from "utils";

const post = (data) => {
  return responseFormatter(
    http.post("/GetEndCustomerDetailDeviceListForWeb", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};

const GetPartnerSetting = (data) => {
  return responseFormatter(
    http.post("/GetPartnerSetting", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};

const GetDeviceSimplePaperUsage = (data) => {
  return responseFormatter(
    http.post("/GetDeviceSimplePaperUsage", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};
const GetDeviceTrayList = (data) => {
  return responseFormatter(
    http.post("/GetDeviceTrayList", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};

const GetDeviceInfoForWeb = (data) => {
  return responseFormatter(
    http.post("/GetDeviceInfoForWeb", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};

const GetDevicePaperUsage2 = (data) => {
  return responseFormatter(
    http.post("/GetDevicePaperUsage2", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};

const GetDeviceMemoList = (data) => {
  return responseFormatter(
    http.post("/GetDeviceMemoList", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};

const DeleteDeviceMemo = (data) => {
  return responseFormatter(
    http.post("/DeleteDeviceMemo", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};

const AddDeviceMemo = (data) => {
  return responseFormatter(
    http.post("/AddDeviceMemo", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};

const GetEventList = (data) => {
  return responseFormatter(
    http.post("/GetEventList", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};

const GetDeviceConsumableLevel = (data) => {
  return responseFormatter(
    http.post("/GetDeviceConsumableLevel", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};

const GetDeviceConsumable = (data) => {
  return responseFormatter(
    http.post("/GetDeviceConsumable", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};

const GetDeviceConsumableDetail = (data) => {
  return responseFormatter(
    http.post("/GetDeviceConsumableDetail", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};

const GetDeviceConsumableChangeHistory = (data) => {
  return responseFormatter(
    http.post("/GetDeviceConsumableChangeHistory", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};
const UpdateDeviceForWeb = (data) => {
  return responseFormatter(
    http.post("/UpdateDeviceForWeb", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};

const AddCustomer = (data) => {
  return responseFormatter(
    http.post("/AddCustomer", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};
const DeleteDevice = (data) => {
  return responseFormatter(
    http.post("/DeleteDevice", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};

const GetDeviceSearchList = (data) => {
  return responseFormatter(
    http.post("/GetDeviceSearchList", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};
const GetEndCustomerSearchList = (data) => {
  return responseFormatter(
    http.post("/GetEndCustomerSearchList", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};

const GetDeviceGraphData = (data) => {
  return responseFormatter(
    http.post("/GetDeviceGraphData", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};

const GetDeviceReportData = (data) => {
  return responseFormatter(
    http.post("/GetDeviceReportData", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};

const SaveReport = (data) => {
  return responseFormatter(
    http.post("/SaveReport", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};

const GetSaveReport = (data) => {
  return responseFormatter(
    http.post("/GetSaveReport", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};

const SendReport = (data) => {
  return responseFormatter(
    http.post("/SendReport", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};

const DeleteBookmark = (data) => {
  return responseFormatter(
    http.post("/DeleteBookmark", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};

const AddBookmark = (data) => {
  return responseFormatter(
    http.post("/AddBookmark", data, {
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

const GetDeviceContractHistory = (data) => {
  return responseFormatter(
    http.post("/GetDeviceContractHistory", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};


const UsersService = {
  AddBookmark,
  DeleteBookmark,
  GetSaveReport,
  SaveReport,
  GetDeviceReportData,
  GetDeviceGraphData,
  GetDeviceSearchList,
  GetEndCustomerSearchList,
  post,
  GetPartnerSetting,
  GetDeviceSimplePaperUsage,
  GetDeviceTrayList,
  GetDeviceInfoForWeb,
  GetDevicePaperUsage2,
  GetDeviceMemoList,
  DeleteDeviceMemo,
  AddDeviceMemo,
  GetEventList,
  GetDeviceConsumableLevel,
  GetDeviceConsumable,
  GetDeviceConsumableDetail,
  GetDeviceConsumableChangeHistory,
  UpdateDeviceForWeb,
  AddCustomer,
  DeleteDevice,
  SendReport,
  uploadAvtar,
  GetDeviceContractHistory
};
export default UsersService;
