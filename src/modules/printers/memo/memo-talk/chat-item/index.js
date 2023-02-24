import clsx from "clsx";
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import useStyles from './style';
import DeleteIcon from '@material-ui/icons/Delete';
import { Tooltip } from "@material-ui/core";
import moment from 'moment';
import { AppContext } from "shared/contexts";
import { useContext } from 'react';

const noop = () => {};
const ChatItem = ({
  position = 'left',
  text = '',
  author = '',
  date = '',
  avatar = null,
  image = null,
  messageId = null,
  previewImage = noop,
  onDelete = noop,
}) => {
  const { lang } = useContext(AppContext);
  const classes = useStyles();

  return (
    <div className={clsx('pr-4 pl-4 pt-2 pb-2 d-flex', {
      'f-justify-end': position === 'right'
    })}
    id={`chatid-${messageId}`}
    >
      {position !== 'right' && <div className='d-flex flex-column-reverse'><Avatar style={{ width: 32, height: 32 }} src={avatar} /></div>}
      <div>
        {position !== 'right' && (
          <Typography
            className='ml-3'
            variant='caption'
            classes={{
              root: classes.chatTitle
            }}
          >
            {author}
          </Typography>
        )}
        <Paper elevation={0} className={clsx(`p-2 ml-2 p-relative ${position === 'right' ? 'Btn-Color ': ''}`, classes.chatItem, {
          [classes.chatMe]: position === 'right'
        })}>
          {image && (
            <div
              className={classes.imageWrapper}
              onClick={() => previewImage(image)}
            >
              <img src={image} className={clsx('h-100 w-100 c-pointer', classes.image)} />
            </div>
          )}
          {position == 'right' && (
            <Tooltip title='Delete' placement='top-start'>
              <div
                className='p-absolute c-pointer d-none deleteWrapper' style={{ right: 4, top: 4 }}
                onClick={() => {
                  onDelete(messageId)
                }}
              >
                <DeleteIcon style={{ fontSize: 16 }}/>
              </div>
            </Tooltip>
          )}
          <Typography
            variant='body1'
            classes={{
              root: classes.chatText
            }}
          >
            {text}
          </Typography>
          <div className='d-flex f-justify-end'>
          <Typography
            variant='caption'
            classes={{
              root: position !== 'right' ? classes.chatTitle : classes.chatTitleMe
            }}
          >
            {lang === 'ko'
              ? moment(date).format('a hh:mm').replace('pm', '오후').replace('am', '오전')
              : moment(date).format('a hh:mm')
            }
          </Typography>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default ChatItem;