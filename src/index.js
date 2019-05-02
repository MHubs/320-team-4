import React from 'react';
import ReactDOM from 'react-dom';
import App from './client/App';
import {BrowserRouter} from 'react-router-dom';
import './client/CSS/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <BrowserRouter>
  <App/>
  </BrowserRouter>,
  document.getElementById('root')
);
