import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LandingPage from './landing-page/landing-page';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>
);