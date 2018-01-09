import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import store from './Store';



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
