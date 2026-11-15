// frontend/src/index.js
// ─────────────────────────────────────────────────────────────
// Application entry point.
// Renders the root <App /> component into the #root div.
// ─────────────────────────────────────────────────────────────
import React from 'react';
import ReactDOM from 'react-dom/client';

// Global CSS (must come before Bootstrap so our variables apply)
import './index.css';

// Bootstrap 5 CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// React-Toastify (toast notifications)
import 'react-toastify/dist/ReactToastify.css';

// Root component
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

