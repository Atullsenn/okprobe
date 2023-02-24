import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@material-ui/core/styles';
import AppModule from './modules';
import { DefaultTheme } from 'shared/constants';
import 'assets/fonts/fontface.css';
import 'react-datepicker/dist/react-datepicker.css';
import { AppContextProvider } from 'shared/contexts';
import "./i18n";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <ThemeProvider theme={DefaultTheme.Light}>
        <AppModule />
      </ThemeProvider>
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorkerRegistration.register();
reportWebVitals();
