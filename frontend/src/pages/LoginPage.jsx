// frontend/src/pages/LoginPage.jsx
// ─────────────────────────────────────────────────────────────
// Login page – the only public page.
// Sends credentials to /api/auth/login, stores JWT, navigates
// to the role-appropriate dashboard.
// ─────────────────────────────────────────────────────────────
import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaBuilding } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';

function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm]       = useState({ username: '', password: '' });
  const [selectedRole, setSelectedRole] = useState('EMPLOYEE');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]  = useState(false);
  const [errors, setErrors]    = useState({});

  // Already logged in? Redirect immediately.
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  // ── Validation ──────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.username.trim()) e.username = 'Username is required.';
    if (!form.password)        e.password = 'Password is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Submit ──────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const { data } = await authService.login(form.username, form.password);
      if (data.role !== selectedRole) {
        toast.error(`This account is not an ${selectedRole.toLowerCase()} account.`);
        return;
      }
      login(data);                      // store in context + localStorage
      toast.success(`Welcome back, ${data.username}! 👋`);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid username or password.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        {/* Logo / Brand */}
        <div className="text-center mb-4">
          <div className="d-inline-flex align-items-center justify-content-center
                          rounded-3 mb-3"
               style={{ width: 60, height: 60, background: '#0d6efd' }}>
            <FaBuilding size={28} color="#fff" />
          </div>
          <h2 className="mb-0 fw-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
            EmpMS
          </h2>
          <p className="text-muted small mt-1">Employee Management System</p>
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">Login as</label>
          <div className="d-flex gap-2">
            <button type="button" className={`btn flex-fill ${selectedRole === 'EMPLOYEE' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setSelectedRole('EMPLOYEE')}>
              Employee
            </button>
            <button type="button" className={`btn flex-fill ${selectedRole === 'ADMIN' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setSelectedRole('ADMIN')}>
              Admin
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>

          {/* Username */}
          <div className="mb-3">
            <label className="form-label fw-500">Username</label>
            <div className="input-group">
              <span className="input-group-text"><FaUser /></span>
              <input
                type="text"
                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                placeholder="Enter your username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                autoComplete="username"
                autoFocus
              />
              {errors.username && (
                <div className="invalid-feedback">{errors.username}</div>
              )}
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="form-label fw-500">Password</label>
            <div className="input-group">
              <span className="input-group-text"><FaLock /></span>
              <input
                type={showPass ? 'text' : 'password'}
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPass(!showPass)}
                tabIndex={-1}
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold"
            disabled={loading}
          >
            {loading
              ? <><span className="spinner-border spinner-border-sm me-2" />Signing in…</>
              : 'Sign In'
            }
          </button>

        </form>

        <p className="text-center text-muted small mt-4 mb-0">
          © 2024 Employee Management System
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

