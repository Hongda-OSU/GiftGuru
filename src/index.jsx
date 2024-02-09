import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RouteDispatcher from '../router/routerDispatcher';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouteDispatcher />
  </React.StrictMode>
);
