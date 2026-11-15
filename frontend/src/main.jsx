// frontend/src/main.jsx
// ─────────────────────────────────────────────────────────────
// Application entry point (Vite uses main.jsx, not index.js).
// Renders the root <App /> component into the #root div.
// ─────────────────────────────────────────────────────────────
import React from 'react';
import ReactDOM from 'react-dom/client';

// Global CSS (must come before Bootstrap so our variables apply)
import './index.css';

// Bootstrap 5 CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// React-Toastify
import 'react-toastify/dist/ReactToastify.css';

// Root component
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

