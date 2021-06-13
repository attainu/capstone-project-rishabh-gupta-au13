import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux'
import store from './store'


import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic'

const options = {
  timeouot: 5000,
  positions: positions.BOTTOM_CENTER,
  transitions:transitions.SCALE
  
}

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate}{...options}>
      <App />
    </AlertProvider>
 </Provider>,
  document.getElementById('root')
);

