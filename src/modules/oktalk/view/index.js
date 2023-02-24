import { useContext, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { getTokenData } from 'utils';
import Service from '../service';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import useStyles from './style';
import TextBox from '../textbox';
import { Skeleton } from '@material-ui/lab';
import { toast } from 'react-toastify';
import PrintIcon from '@material-ui/icons/Print';
import { AppContext } from 'shared/contexts';
import Badge from '@material-ui/core/Badge';
import { Divider, IconButton, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import MessageBox from '../message-box';
import ImagePreview from '../image-preview';
import Avatar from "@material-ui/core/Avatar";
import * as _ from 'lodash';
import moment from 'moment';
import { useTranslation } from "react-i18next";
import Tooltip from '@material-ui/core/Tooltip';
import config from 'config';
import { NavLink, useHistory } from "react-router-dom";
import Link from "@material-ui/core/Link";
import SettingsIcon from '@mui/icons-material/Settings';

const defaultState = {
  messages: [],
  totalMessages: 0,
  isFetchingMessages: false,
  totalEntries: 0,
  pageNumber: 1,
  pageSize: 5,
  isSavingMessage: false,
  printerSearch: '',
  selectedFile: null,
  isImageUplaoding: false,
  previewImage: null,
  showMessageCount: true,
  initialUserDetails: false,
  displayUserName: '',
  customerName: '',
  userImageUrl: '',
  endCustomerId: '',
  deviceInfoId: '',
  lastUpdateDt: '',
  serialNumber: '',
  deviceSerial: '',
  printerListClassQuery: true,
  printerListClassQuery1: true,
  setCounter: 1,
};

const noop = () => {
};

const ViewOKTalk = ({
  broadcastMessage = noop
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [state, setState] = useState(defaultState);
  const [refMeas, setRefMeas] = useState(false);
  const {
    lang,
    devices,
    setDevices,
    isFetchingDevices,
    notifications,
    deleteNotifications,
    setNotifications,
    setDeleteNotification
  } = useContext(AppContext);
  const userData = getTokenData();
  const history = useHistory();

  const changeClassNameForMediaquery = () => {
    setState(prevState => ({ ...prevState, printerListClassQuery: true }));
    setState(prevState => ({ ...prevState, printerListClassQuery1: true, }));
  }

  const updateMessageCountState = () => {
    setState(prevState => ({ ...prevState, showMessageCount: false, }));
  }

  const revertBackMessageCountState = () => {
    setState(prevState => ({ ...prevState, showMessageCount: true, }));
  }

  const fetchMessages = async (deviceInfoId, onePageDataCount = 10) => {
    setState(prevState => ({ ...prevState, isFetchingMessages: true, showMessageCount: false, }));
    const { data, error } = await Service.getMessages({
      page: 1,
      onePageDataCount,
      deviceInfoId,
    });

    if (error) {
      setState(prevState => ({ ...prevState, isFetchingMessages: false, showMessageCount: true }));
      toast.error(error);
    } else {
      const updatedMessages = (data || []).map(message => ({
        ...message,
        typeOfList: 1,
      }))
      setState(prevState => ({
        ...prevState,
        messages: updatedMessages,
        totalMessages: data[0]?.rowCount || defaultState.totalMessages,
        isFetchingMessages: false,
      }));
      removeNotification(deviceInfoId);
      setTimeout(() => {
        setState(prevState => ({
          ...prevState,
          showMessageCount: true,
        }));
      }, 200)
    }
  };

  useEffect(() => {
    setDevices(devices);
  }, [devices]);

  useEffect(() => {
    if (notifications.length) {
      const activeDeviceNotifications = notifications.filter(notification => notification.deviceInfoId === state.deviceInfoId);
      setState(prevState => ({
        ...prevState,
        messages: (_.uniqBy([...prevState.messages, ...activeDeviceNotifications], 'messageId').map(message => ({
          ...message,
          typeOfList: 2
        }))),
      }));
      const updatedDevices = devices.map(device => {
        return {
          ...device,
          chatDate: notifications.slice().reverse().find(item => item.deviceInfoId == device.deviceInfoId)?.chatDate.replace("T", " ") || device.chatDate,
          notificationCount: notifications.filter(notification => (notification.userId !== userData.userId && notification.deviceInfoId === device.deviceInfoId)).length,
        }
      });
      const devicesWithChat = updatedDevices.filter(item => item.chatDate).sort((a, b) => new Date(b.chatDate) - new Date(a.chatDate));
      const devicesWithoutChat = updatedDevices.filter(item => !item.chatDate);
      setDevices([...devicesWithChat, ...devicesWithoutChat]);
      if (activeDeviceNotifications.length) {
        removeNotification(state.deviceInfoId);
      }
    } else {
      const devicesWithChat = devices.filter(item => item.chatDate).sort((a, b) => new Date(b.chatDate) - new Date(a.chatDate));
      const devicesWithoutChat = devices.filter(item => !item.chatDate);
      setDevices([...devicesWithChat, ...devicesWithoutChat]);
    }
  }, [notifications]);

  useEffect(() => {
    if (deleteNotifications.length) {
      setState(prevState => {
        const messages = (prevState.messages.filter(message => !deleteNotifications.includes(message.messageId))).map(message => ({
          ...message,
          typeOfList: 3,
        }));
        return {
          ...prevState,
          messages,
        }
      });
      setDeleteNotification([]);
    }
  }, [deleteNotifications]);

  useEffect(() => {
    if (state.deviceInfoId) {
      fetchMessages(state.deviceInfoId)
    }
  }, [state.deviceInfoId]);

  useEffect(() => {
    window.onpopstate = () => {
      const pathname = history.location.pathname;
      if ((pathname == "/summary" || pathname == "/printers" || pathname == "/customers" || pathname == "/new-printers" || pathname == "/waiting-printers" || pathname == "/settings" || pathname == "/users" || pathname == "/data-process-histories" || pathname == "/notice") && state.printerListClassQuery === false) {
        history.push('/oktalk');
      }
    }
  }, [state.printerListClassQuery])

  const handleMessage = async (message = '', imageFileName = '') => {
    broadcastMessage({
      message,
      deviceInfoId: state.deviceInfoId,
      partnerId: userData.partnerId,
      userSessionToken: userData.userSessionToken,
      imageFileName,
      userName: userData.name,
      userId: userData.userId,
      messageType: 1,
    });
  };

  // const removeNotification = (deviceInfoId) => {
  //   const updatedNotifications = notifications.filter(notification => notification.deviceInfoId !== deviceInfoId);
  //   setNotifications(updatedNotifications);
  //   setDevices(devices.map(device => ({
  //     ...device,
  //   })));
  //   Service.removeChatCount({
  //     deviceInfoId,
  //     chatCount: 0,
  //     dt1: ''
  //   });
  // };

  const removeNotification = (deviceInfoId) => {
    const updatedNotifications = notifications.filter(notification => notification.deviceInfoId !== deviceInfoId);
    setNotifications(updatedNotifications);
    devices.forEach((device) => {
      device.notificationCount = (device.deviceInfoId === deviceInfoId) ? 0 : device.notificationCount;
      device.chatCount = (device.deviceInfoId === deviceInfoId) ? '0' : device.chatCount;
    })
    Service.removeChatCount({
      deviceInfoId,
      chatCount: 0,
      dt1: ''
    });
  };

  const handleFileChange = (selectedFile = null) => {
    setState(prevState => ({
      ...prevState,
      selectedFile,
    }));
  };

  const handleImageUpload = async (message = '', file) => {
    setState(prevState => ({
      ...prevState,
      isImageUplaoding: true,
    }));
    const formData = new FormData();
    formData.append("type", 'chat');
    formData.append("deviceInfoId", state.deviceInfoId);
    formData.append("file", file);
    const { data } = await Service.uploadChatImage(formData);
    if (data?.error) {
      toast.error(t('popupSomethingWrong'));
      setState(prevState => ({
        ...prevState,
        isImageUplaoding: false,
      }));
    } else {
      setState(prevState => ({
        ...prevState,
        isImageUplaoding: false,
        selectedFile: false,
      }));
      handleMessage(message || ' ', data?.filePath);
    }
  };

  const handleMessageDelete = (messageId = null) => {
    broadcastMessage({
      messageId,
      partnerId: userData.partnerId,
      userSessionToken: userData.userSessionToken,
      messageType: 2,
    });
  };

  const groupedDays = (messages) => {
    return messages.reduce((acc, el, i) => {
      const messageDay = moment(el.timestamp).format('DD-MM-YYYY');
      if (acc[messageDay]) {
        return { ...acc, [messageDay]: acc[messageDay].concat([el]) };
      }
      return { ...acc, [messageDay]: [el] };
    }, {});
  };

  const messageList = useMemo(() => {
    const currentUserId = userData.userId;
    const messages = state.messages.map((message, index) => ({
      data: message?.message,
      author: message?.userName,
      timestamp: new Date(message?.messageDt).toString(),
      from: message?.userId === currentUserId ? 'me' : 'them',
      image: `${(message.imageUrl || message?.imageFileName) ? `${config.frontendUrl}/${(message.imageUrl || message?.imageFileName)}` : ''}`,
      messageId: message.messageId,
      typeOfList: message?.typeOfList
    }));
    const days = groupedDays(messages);
    const sortedDays = Object.keys(days).sort((x, y) => moment(x, 'DD-MM-YYYY').unix() - moment(y, 'DD-MM-YYYY').unix());
    const items = sortedDays.reduce((acc, date) => {
      const sortedMessages = days[date].sort(
        (x, y) => new Date(x.timestamp) - new Date(y.timestamp)
      );
      return acc.concat([{ type: 'day', date, id: date }, ...sortedMessages]);
    }, []);
    return items;
  }, [state.messages]);

  const getFormattedDate = (date) => {
    const dateString = new Date(date)
    const today = moment();
    var ActualDay = '';
    const TodayDate = new Date();
    const ReceiveDate = new Date(date);
    const Day = new Date(date).getDay();
    const diffTime = Math.abs(TodayDate - ReceiveDate);
    const dayDifference = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (today.isSame(dateString, 'day')) {
      if (lang === 'ko') {
        return moment(date).format("a h:mm").replace('pm', '오후').replace('am', '오전');
      } else {
        return moment(date).format("a h:mm");
      }
    }

    if (dayDifference <= 7 && dayDifference >= 0) {
      if (Day === 0) {
        ActualDay = 'Sun';
      } else if (Day === 1) {
        ActualDay = 'Mon';
      } else if (Day === 2) {
        ActualDay = 'Tue';
      } else if (Day === 3) {
        ActualDay = 'Wed';
      } else if (Day === 4) {
        ActualDay = 'Thu';
      } else if (Day === 5) {
        ActualDay = 'Fri';
      } else if (Day === 6) {
        ActualDay = 'Sat';
      }
      return (ActualDay)
    }
    return moment(date).format("YYYY-MM-DD");
  };

  return (
    <>
      <Paper elevation={4} className={clsx(classes.talkWrapper)}>
        <div className={clsx('d-flex f-justify-between h-100', classes.chatprrinfo)}>
          <div style={{ width: '28%', overflow: 'hidden', paddingBottom: '5px' }}
            className={clsx('h-100', state.printerListClassQuery == true ? classes.membersWrapper : classes.hideMembersWrapper)}>
            <div className={clsx('d-flex f-align-center', classes.searchWrapper)}>
              <Paper elevation={1} className={clsx('w-100 m-3 d-flex', classes.searchWrapper_bar)}>
                <IconButton className='p-2'>
                  <SearchIcon />
                </IconButton>
                <InputBase
                  placeholder="Search"
                  value={state.printerSearch}
                  onChange={evt => {
                    const { value } = evt.currentTarget;
                    setState(prevState => ({
                      ...prevState,
                      printerSearch: value
                    }))
                  }}
                />
              </Paper>
            </div>
            {state.initialUserDetails === false ? (
              <div className={clsx('d-flex f-align-center', classes.maintop_pro)}>
                <p className={clsx('', classes.pleaseseletstext)}>{t(`defaultSelectPrinterChat`)}</p>
              </div>) : (
              <div>
                <Link component={NavLink}
                  to={`/printers/${state.endCustomerId}/device/${state.deviceInfoId}/last-updated-at/${state.lastUpdateDt}`}>
                  <div className={clsx('d-flex f-align-center', classes.maintop_pro)}>
                    <div className={clsx('', classes.user_img)}>
                      {state.userImageUrl ? (
                        <Avatar
                          className={classes.avtarImage}
                          src={`${config.frontendUrl}/${state.userImageUrl}`}
                        />
                      ) : (
                        <Avatar
                          className={classes.avtarImage}
                        >
                          <PrintIcon />
                        </Avatar>
                      )}
                    </div>
                    <div className={clsx('', classes.main_textinfo)}>
                      <h2 className={clsx('', classes.UserTit_Name)}>{state.customerName}</h2>
                      <p className={clsx('', classes.Model_Name)}>{state.displayUserName}</p>
                      <p className={clsx('', classes.Model_Name)}>{state.serialNumber}</p>
                    </div>
                    <div className={clsx('d-flex f-align-center', classes.viewIcons)}>
                      <Link
                        component={NavLink}
                        to={`/printers/equipment-modification/${state.deviceInfoId}`}
                      >
                        <SettingsIcon style={{ color: '#434141' }} />
                      </Link>
                    </div>
                  </div>
                </Link>
              </div>)}
            <div className={clsx(classes.listWrapper)}>
              {isFetchingDevices && (
                [...new Array(20)].map(() => {
                  return (
                    <div className='d-flex f-align-center p-2'>
                      <Skeleton variant='circle' animation='wave' width='50px' height='40px'
                        className={clsx('mb-2 mr-2')} />
                      <Skeleton variant='rect' animation='wave' width='100%' height='40px' className={clsx('mb-2')}
                        style={{ borderRadius: 4 }} />
                    </div>
                  )
                })
              )}
              {!isFetchingDevices && devices.filter(device => {
                if (state.printerSearch) {
                  const searchInput = (state.printerSearch || '').toLowerCase();
                  const displayName = (device.displayName || '').toLowerCase();
                  const deviceInfoId = device.deviceInfoId;
                  const deviceModelId = device.deviceModelId;
                  const deviceSerial = (device.deviceSerial || '').toLowerCase();
                  const customerName = (device.endCustomerName || '').toLowerCase();
                  return ((displayName.indexOf(searchInput) > -1)
                    || (deviceInfoId.indexOf(searchInput) > -1)
                    || (deviceModelId.indexOf(searchInput) > -1)
                    || (deviceSerial.indexOf(searchInput) > -1)
                    || (customerName.indexOf(searchInput) > -1));
                }
                return true;
              }).map(device => (
                <>
                  <div
                    className={clsx('d-flex f-align-center p-4 pt-2 pb-2 c-pointer', classes.printerList, {
                      [classes.activePrinter]: device.deviceInfoId === state.deviceInfoId
                    })}
                    onClick={() => {
                      setRefMeas(false)
                      setState(prevState => ({
                        ...prevState,
                        deviceInfoId: device.deviceInfoId,
                        messages: [],
                        totalMessages: 0,
                        initialUserDetails: true,
                        displayUserName: device.displayName,
                        customerName: device.endCustomerName,
                        userImageUrl: device.printerProfileImage,
                        endCustomerId: device.endCustomerId,
                        lastUpdateDt: device.lastUpdateDt,
                        serialNumber: device.deviceSerial,
                        printerListClassQuery: false,
                        printerListClassQuery1: false,
                      }));
                    }}
                  >
                    {device.printerProfileImage ? (
                      <Avatar
                        className={classes.avtarImage}
                        src={`${config.frontendUrl}/${device.printerProfileImage}`}
                      />
                    ) : (
                      <Avatar
                        className={classes.avtarImage}
                      >
                        <PrintIcon />
                      </Avatar>
                    )}
                    <div className={clsx('ml-2 bordernew_line', classes.chatlist)}>
                      <div className='d-flex f-align-center f-justify-between'>
                        <Tooltip title={`${device.endCustomerName} `} placement='top-right'>
                          <Typography variant='body1' noWrap>{device.endCustomerName}</Typography>
                        </Tooltip>
                        {device.chatDate && <Typography style={{ minWidth: '70px', textAlign: 'right' }} variant='body2'
                          noWrap>{getFormattedDate(device.chatDate)}</Typography>}
                      </div>
                      <div className='d-flex f-align-center f-justify-between'>
                        <Tooltip title={`${device.displayName}(${device.deviceSerial})`} placement='top-right'>
                          <Typography variant='body2' noWrap
                            className={clsx(classes.printerListnam)}>{device.displayName}({device.deviceSerial})</Typography>
                        </Tooltip>
                        {(device.notificationCount > 0) && (
                          <Badge badgeContent={device.notificationCount > 99 ? '+99' : device.notificationCount}
                            color='primary' className='ml-2'></Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <Divider style={{ margin: '0', marginLeft: '55px', marginRight: '10px' }} />
                </>
              ))}
            </div>
          </div>
          <div
            className={clsx(classes.chatinfo, classes.chatWrapper, state.printerListClassQuery1 === true ? classes.hiddenchatWrapper : classes.hideChatWrapper)}>
            {(state.selectedFile || state.previewImage) ? (
              <ImagePreview
                file={state.selectedFile ? state.selectedFile : state.previewImage}
                isImageUplaoding={state.isImageUplaoding}
                isPreviewImage={state.previewImage}
                onPreviewClose={() => {
                  setState(prevState => ({
                    ...prevState,
                    selectedFile: null,
                    previewImage: null,
                  }));
                }}
              />
            ) : (
              <MessageBox
                isFetchingMessages={!messageList.length && state.isFetchingMessages}
                isFetchingOldMessages={messageList.length && state.isFetchingMessages}
                deviceInfoId={state.deviceInfoId}
                messageList={messageList}
                totalMessages={state.totalMessages}
                previewImage={(path = '') => {
                  setState(prevState => ({
                    ...prevState,
                    previewImage: path,
                  }));
                }}
                onScrollTop={() => {
                  if (messageList.length < state.totalMessages) {
                    fetchMessages(state.deviceInfoId, messageList.length + 10);
                  }
                }}
                onDelete={handleMessageDelete}
                changeClassNameForMediaquery1={changeClassNameForMediaquery}
                userDisplayname={state.displayUserName}
                userPrinterDesignation={state.serialNumber}
                customerName={state.customerName}
                refMeas={refMeas}
                setRefMeas={setRefMeas}
              />
            )}
            {state.deviceInfoId && (!state.isFetchingMessages || messageList.length) && !state.previewImage && (
              <TextBox
                onMessage={(message) => {
                  if (!!state.selectedFile) {
                    handleImageUpload(message, state.selectedFile);
                  } else {
                    handleMessage(message);
                  }
                }}
                onFileClick={handleFileChange}
                isImageUplaoding={state.isImageUplaoding}
                hasFile={!!state.selectedFile}
                updateMessageCountState={updateMessageCountState}
                revertBackMessageCountState={revertBackMessageCountState}
                refMeas={refMeas}
                setRefMeas={setRefMeas}
              />
            )}
          </div>
        </div>
      </Paper>
    </>
  );
};

export default ViewOKTalk;
