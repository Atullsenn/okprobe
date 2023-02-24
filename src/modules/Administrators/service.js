import { http } from "services";
import { responseFormatterNew } from '../../utils/response-formatter-new';

const getAgentData = (data) => {
  return responseFormatterNew(
    http.get("/agents", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};

const getAssignmentData = (data) => {
  return responseFormatterNew(
    http.get("/agents/agent-assignments", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};

const getAssignmentDataByAgentId = (data) => {
  http.get(`/agents/${data}/agent-assignments`, { params: { data } }, {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    setAuth: true,
  })
  return responseFormatterNew(
    http.get(`/agents/${data}/agent-assignments`, { params: { data } }, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};

const getAgentStatus = (data) => {
  return responseFormatterNew(
    http.get("/agents/status", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};

const getAgentSearchHistory = (data) => {
  console.log("checking token ")
  console.log(http.get("/agents/search-history", data, {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    setAuth: true,
  }))
  return responseFormatterNew(
    http.get("/agents/search-history", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};

const getAgentLogs = (data) => {
  return responseFormatterNew(
    http.get("/agents/agent-logs", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};

const getAgentDownloads = (data) => {
  return responseFormatterNew(
    http.get("/agents/download", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};

const getAgentSearchResult = (data) => {
  console.log("token checking ")
  console.log(localStorage.getItem("probe-auth"))
  return responseFormatterNew(
    http.get("/agents/search-result", data, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("probe-auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      setAuth: true,
    })
  );
};

const Administrator = {
  getAgentData,
  getAssignmentData,
  getAgentStatus,
  getAgentSearchHistory,
  getAgentLogs,
  getAgentDownloads,
  getAgentSearchResult,
  getAssignmentDataByAgentId
};

export default Administrator;

