const PROBE_AUTH = 'probe-auth';

const getToken = () => localStorage.getItem(PROBE_AUTH) || '';

const setToken = token => {
  localStorage.setItem(PROBE_AUTH, token);
};

const removeToken = () => {
  localStorage.removeItem(PROBE_AUTH);
};

const getTokenData = () => {
  return {
    userSessionToken: localStorage.getItem(PROBE_AUTH),
    name: localStorage.getItem('probe-name'),
    email: localStorage.getItem('probe-email'),
    mobile: localStorage.getItem('probe-mobile'),
    userRole: localStorage.getItem('probe-role'),
    partnerId: localStorage.getItem('probe-partnerid'),
    userId: localStorage.getItem('probe-userId'),
    partnerName: localStorage.getItem('probe-partnerName'),
    avatar: localStorage.getItem('probe-avatar'),
    deleteOwner: localStorage.getItem('probe-deleteOwner'),
    loginType: localStorage.getItem('probe-loginType'),
    maintainLoginTime: localStorage.getItem('probe-maintainLoginTime'),
  }
};

const setTokenData = (data = {}) => {
  localStorage.setItem(PROBE_AUTH, data.userSessionToken);
  localStorage.setItem('probe-name', data.name);
  localStorage.setItem('probe-email', data.email);
  localStorage.setItem('probe-mobile', data.mobile);
  localStorage.setItem('probe-role', data.userRole);
  localStorage.setItem('probe-partnerid', data.partnerId);
  localStorage.setItem('probe-userId', data.userId);
  localStorage.setItem('probe-partnerName', data.partnerName);
  localStorage.setItem('probe-avatar', data.profileImage);
  localStorage.setItem('probe-deleteOwner', data.deleteOwner);
  localStorage.setItem('probe-loginType', data.loginType);
  localStorage.setItem('probe-maintainLoginTime', data.maintainLoginTime);
};

const removeTokenData = () => {
  localStorage.removeItem(PROBE_AUTH);
  localStorage.removeItem('probe-name');
  localStorage.removeItem('probe-email');
  localStorage.removeItem('probe-mobile');
  localStorage.removeItem('probe-role');
  localStorage.removeItem('probe-partnerid');
  localStorage.removeItem('probe-userId');
  localStorage.removeItem('probe-partnerName');
  localStorage.removeItem('probe-avatar');
  localStorage.removeItem('probe-deleteOwner');
  localStorage.removeItem('probe-loginType');
  localStorage.removeItem('probe-maintainLoginTime');
};

export {
  getToken,
  setToken,
  removeToken,
  getTokenData,
  setTokenData,
  removeTokenData,
};
