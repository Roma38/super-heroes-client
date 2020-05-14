import 'react-app-polyfill/ie11';  // Enable IE11
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "semantic-ui-css/semantic.min.css";
import { Router } from "react-router";
import { Provider } from "react-redux";
import store from "./redux/index";
import { history } from './history'

import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);