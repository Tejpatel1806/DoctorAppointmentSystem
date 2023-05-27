import React from 'react';
import ReactDOM from 'react-dom/client';
import "antd/dist/reset.css";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
//application ne redux jode connect karva mate aa store import karyu
//ane aakah ne Provider tag ma lakhyu 
//ane store = je store.js banayi hati redux ma te moklyu
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
