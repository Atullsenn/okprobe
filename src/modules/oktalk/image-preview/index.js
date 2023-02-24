import { CircularProgress, IconButton, Tooltip, Typography } from '@material-ui/core';
import { Close, GetApp } from '@material-ui/icons';
import clsx from 'clsx';
import { useState } from 'react';
import useStyles from './style';
import Lightbox from "react-awesome-lightbox";
// You need to import the CSS only once
import "react-awesome-lightbox/build/style.css";
import { useTranslation } from 'react-i18next';


const noop = () => {};
const defaultState = {
  isLightBoxOpen: false,
};

const ImagePreview = ({
  file = '',
  isImageUplaoding = false,
  isPreviewImage = false,
  onPreviewClose = noop
}) => {
  const { t } = useTranslation();
  const classes = useStyles({
    isPreviewImage,
  });
  const [state, setState] = useState(defaultState);

  const download = fileUrl => {
    fetch(fileUrl, {
      method: "GET",
      headers: {}
    })
      .then(response => {
        response.arrayBuffer().then(function(buffer) {
          var fileType = fileUrl.split(".");
          fileType = fileType[fileType.length -1];
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `image.${fileType}`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
      })
      .catch(err => {
        console.log(err);
      });
  };


  
  
  return (
    <>
      <div className={clsx('h-100', classes.imagePreview)}>
        <div className={clsx('d-flex f-align-center color-white pb-4 pt-4 pr-2 pl-2', classes.header)}>
        <Tooltip title='Close' placement='top-start'>
          <IconButton
            disabled={isImageUplaoding}
            className='mr-4'
            size='small'
            onClick={onPreviewClose}
          >
            <Close className='color-white' fontSize='small' />
          </IconButton>
          </Tooltip>
          <Typography variant='h6' style={{ minWidth: '100px' }}>
            {t("chatImagePreview")}
          </Typography>
          {isPreviewImage && (
            <div className='d-flex f-align-center f-justify-end w-100'>
              <Tooltip title='Download' placement='top-start'>
                <IconButton
                  className='mr-4'
                  size='small'
                  onClick={() => {
                    download(file)
                  }}
                >
                  <GetApp className='color-white' fontSize='small' />
                </IconButton>
              </Tooltip>
            </div>
          )}

        </div>
        <div className={clsx('d-flex f-align-center f-justify-center p-2 h-100', classes.imageWrapper)}>
          {isImageUplaoding && (
            <CircularProgress  className='p-absolute' />
          )}
          {!state.isLightBoxOpen && (
            <img
              src={isPreviewImage ? file : URL.createObjectURL(file)}
              className={clsx('c-pointer', classes.image)}
              onClick={() => {
                setState(prevState => ({
                  ...prevState,
                  isLightBoxOpen: true,
                }))
              }}
            />
          )}
        </div>
      </div>
      {state.isLightBoxOpen && (
        <Lightbox
          image={file}
          title=""
          onClose={() => {
            setState(prevState => ({
              ...prevState,
              isLightBoxOpen: false,
            }));
          }}
        />
      )}
    </>
  )
};

export default ImagePreview;