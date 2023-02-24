import { useState } from 'react';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';

const defaultState = {
  open: true,
};

const Alert = ({
  message = '',
  type = '',  
}) => {
  const [state, setState] = useState(defaultState);

  return (
    <Snackbar
      open={state.open}
      onClose={() => setState(prevState => ({ ...prevState, open: false }))}
      TransitionComponent={Slide}
      message={message}
      key={state.Transition.name}
    />
  );
};

const Toast = (message, type) => {
  return <Alert message={message} type={type} />
};

export default Toast;