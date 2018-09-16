
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './components/App';
import store from './store/index';
import { Provider } from 'react-redux'



ReactDOM.render(
    <App />

  ,document.getElementById('app')
);
