// frontend/src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

function NotFound() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center"
         style={{ minHeight: '100vh', background: '#f0f4f8' }}>
      <FaExclamationTriangle size={64} color="#ffc107" className="mb-3" />
      <h1 className="display-4 fw-bold">404</h1>
      <p className="text-muted fs-5">Page not found.</p>
      <Link to="/dashboard" className="btn btn-primary mt-2">
        Go to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;

