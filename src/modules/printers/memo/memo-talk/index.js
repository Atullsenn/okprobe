import { useContext, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { getTokenData } from 'utils';
import Service from './service';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import useStyles from './style';
import TextBox from './textbox';
import { Skeleton } from '@material-ui/lab';
import { toast } from 'react-toastify';
import PrintIcon from '@material-ui/icons/Print';
import { AppContext } from 'shared/contexts';
import Badge from '@material-ui/core/Badge';
import { IconButton, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import MessageBox from './message-box';
import ImagePreview from './image-preview';
import Avatar from "@material-ui/core/Avatar";
import * as _ from 'lodash';
import { map } from 'lodash';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import config from 'config';

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
};

const noop = () => {};

const MemoTalk = ({
  broadcastMessage = noop,
  deviceInfoId = null
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [state, setState] = useState(defaultState);
  const { devices, setDevices, isFetchingDevices, notifications, deleteNotifications, setNotifications, setDeleteNotification } = useContext(AppContext);
  const userData = getTokenData();

  const fetchMessages = async (deviceInfoId, onePageDataCount = 10) => {
    setState(prevState => ({
      ...prevState,
      isFetchingMessages: true,
    }));

    const { data, error } = await Service.getMessages({
      page: 1,
      onePageDataCount,
      deviceInfoId,
    });


    if (error) {
      setState(prevState => ({ ...prevState, isFetchingMessages: false }));
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
    }
  };

  useEffect(() => {
    if (notifications.length) {
      const activeDeviceNotifications = notifications.filter(notification => notification.deviceInfoId === deviceInfoId);
      setState(prevState => ({ 
          ...prevState,
          messages: (_.uniqBy([...prevState.messages, ...activeDeviceNotifications], 'messageId').map(message => ({
            ...message,
            typeOfList: 2
          }))),
      }));
      setDevices(devices.map(device => ({
        ...device,
        notificationCount: notifications.filter(notification => (notification.userId !== userData.userId && notification.deviceInfoId === device.deviceInfoId)).length,
      })));
      if (activeDeviceNotifications.length) {
        removeNotification(deviceInfoId);
      }
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
    if (deviceInfoId) {
      fetchMessages(deviceInfoId)
    }
  }, [deviceInfoId]);

  const handleMessage = async (message = '', imageFileName = '') => {
    broadcastMessage({
      message,
      deviceInfoId,
      partnerId: userData.partnerId,
      userSessionToken: userData.userSessionToken,
      imageFileName,
      userName: userData.name,
      userId: userData.userId,
      messageType: 1,
    });
  };

  const removeNotification = (deviceInfoId) => {
    const updatedNotifications = notifications.filter(notification => notification.deviceInfoId !== deviceInfoId);
    setNotifications(updatedNotifications);
    setDevices(devices.map(device => ({
      ...device,
      notificationCount: updatedNotifications.filter(notification => notification.deviceInfoId !== device.deviceInfoId).length,
    })));
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
    formData.append('type', 'chat');
    formData.append('deviceInfoId', deviceInfoId);
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
      image: `${config.frontendUrl}/${(message.imageUrl || message?.imageFileName)}`,
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

  return (
    <>
      <Paper elevation={4} className={clsx(classes.talkWrapper)}>
        <div className='d-flex f-justify-between h-100'>
            <div className={clsx('d-flex flex-column w-100 h-100', classes.chatWrapper)}>
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
                  deviceInfoId={deviceInfoId}
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
                      fetchMessages(deviceInfoId, messageList.length + 10);
                    }
                  }}
                  onDelete={handleMessageDelete}
                />
              )}
              {deviceInfoId && (!state.isFetchingMessages || messageList.length) && !state.previewImage && (
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
                />
              )}
            </div>
        </div>
      </Paper>
    </>
  );
};

export default MemoTalk;