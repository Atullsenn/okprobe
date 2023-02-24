import { createContext, useState } from "react";
import { useTranslation } from 'react-i18next';

const noop = () => { };
export const AppContext = createContext({
  lang: navigator.language === 'en' || navigator.language === 'ko' ? navigator.language : 'en',
  isLoading: false,
  devices: [],
  isFetchingDevices: false,
  notifications: [],
  deleteNotifications: [],
  avatar: '',
  showLoader: noop,
  setLang: noop,
  setDevices: noop,
  setIsFetchingDevices: noop,
  setNotifications: noop,
  setDeleteNotification: noop,
  setAvatar: noop,
});

export const AppContextProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const setLang = (lang = 'en') => {
    i18n.changeLanguage(lang);
    setState(prevState => ({
      ...prevState,
      lang,
    }));
  };

  const showLoader = (isLoading = false) => {
    setState(prevState => ({
      ...prevState,
      isLoading,
    }));
  };

  const setDevices = (devices = []) => {
    setState(prevState => ({
      ...prevState,
      devices,
    }));
  };

  const setIsFetchingDevices = (isFetchingDevices = false) => {
    setState(prevState => ({
      ...prevState,
      isFetchingDevices,
    }));
  };

  const setNotifications = (notifications = []) => {
    setState(prevState => ({
      ...prevState,
      notifications,
    }));
  };

  const setDeleteNotification = (deleteNotifications = []) => {
    setState(prevState => ({
      ...prevState,
      deleteNotifications,
    }));
  };

  const setAvatar = (avatar = '') => {
    setState(prevState => ({
      ...prevState,
      avatar,
    }));
  };

  const setNewPrinterCount = (newPrinterCount = '0') => {
    setState(prevState => ({
      ...prevState,
      newPrinterCount,
    }));
  };

  const setWaitingPrinterCount = (waitingPrinterCount = '0') => {
    setState(prevState => ({
      ...prevState,
      waitingPrinterCount,
    }));
  };

  const initiaState = {
    lang: navigator.language === 'en' || navigator.language === 'ko' ? navigator.language : 'en',
    isLoading: false,
    devices: [],
    isFetchingDevices: false,
    notifications: [],
    deleteNotifications: [],
    avatar: '',
    newPrinterCount: 0,
    waitingPrinterCount: 0,
    showLoader,
    setLang,
    setDevices,
    setIsFetchingDevices,
    setNotifications,
    setDeleteNotification,
    setAvatar,
    setNewPrinterCount,
    setWaitingPrinterCount,
  };

  const [state, setState] = useState(initiaState);
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>
};

export const AppContextConsumer = AppContext.Consumer;