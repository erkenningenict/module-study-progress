// Add IE11 support
import 'core-js/es/map';
import 'core-js/es/set';
import 'es6-shim';
import 'react-app-polyfill/ie11';

import { ERKENNINGEN_SITE_TYPE } from '@erkenningen/config';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { ThemeContext } from '@erkenningen/ui';

ReactDOM.render(
  <ThemeContext.Provider value={{ mode: ERKENNINGEN_SITE_TYPE }}>
    <App />
  </ThemeContext.Provider>,
  document.getElementById('module-study-progress'),
);
