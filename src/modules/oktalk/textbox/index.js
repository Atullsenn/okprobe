
import useStyles from './style';
import clsx from 'clsx';
import { useState } from 'react';
import { IconButton, InputBase, Paper } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import SendIcon from '@material-ui/icons/Send';
import { useTranslation } from "react-i18next";
const noop = () => {};

const defaultState = {
  showEmoji: false,
  anchorElm: null,
  value: '',
};

const TextBox = ({
  hasFile = false,
  isImageUplaoding = false,
  onMessage = noop,
  onFileClick = noop,
  updateMessageCountState,
  revertBackMessageCountState,
  refMeas,
  setRefMeas
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [state, setState] = useState(defaultState);

  const handleMessage = () => {
    onMessage(state.value);
    setState(prevState => {
      return {
        ...prevState,
        value: '',
      }
    });
    updateMessageCountState();
    setTimeout(() => {
      revertBackMessageCountState();
    }, 2000);
    setRefMeas(true);
  };
  
  const handleFileSelection = async (event) => {
    let selectedFile = null;
    if (event.currentTarget.files && event.currentTarget.files.length > 0) {
      selectedFile = event.currentTarget.files[0];
      event.target.value = "";
    }
    onFileClick(selectedFile);
  };


  return (
    <div className={clsx('d-flex w-100 f-justify-between f-align-center p-2 pl-4 pr-4', {
      'no-events': isImageUplaoding,
    })} style={{ background: '#F0F0F0' }}>
      <Paper elevation={2} className={clsx('d-flex w-100 f-align-center', classes.inputBox)}>
        <InputBase
          fullWidth
          multiline
          rowsMax={4}
          className={clsx(classes.input, 'p-3')}
          placeholder={hasFile ? "Add a caption..." :  t(`typeMessageHereHint`)  }
          value={state.value}
          onChange={evt => {
            const { name, value } = evt.currentTarget;
            setState(prevState => ({
              ...prevState,
              value,
            }))
          }}
          /*onKeyPress={evt => {
            const { key, shiftKey } = evt;
            if (key === 'Enter' && !shiftKey) {
              if ((state.value || '').trim() || hasFile) handleMessage();
              evt.preventDefault();
              evt.stopPropagation();
            }
          }}*/
        />
        <SendIcon

          className={clsx('mr-2 ml-2', classes.send, {
            'c-pointer': (state.value || '').trim() || hasFile,
            [classes.activeSend]: (state.value || '').trim() || hasFile, 
            'color-primary': (state.value || '').trim() || hasFile,
          })}
          onClick={() => {
            if ((state.value || '').trim() || hasFile) handleMessage();
          }}
        />
      </Paper>
      {!state.value && (
        <IconButton
          component="label"
          htmlFor="file-input-field"
          className={clsx('ml-2 p-2', classes.fileBtn)}
          onClick={() => onFileClick(state.selectedFile, state.chatImage)}
        >

         <img src="https://itdevelopmentservices.com/foodsandlogistics/wp-content/uploads/2021/10/documents.png"></img>
        </IconButton>
        
      )}
      <input
        id="file-input-field"
        type="file"
        onChange={handleFileSelection}
        accept="image/x-png,image/gif,image/jpeg"
        className="d-none"
      />
    </div>
  );
};

export default TextBox;