import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  FaBars,
  FaBuilding,
  FaCalendarAlt,
  FaChartBar,
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUserPlus,
  FaUsers,
  FaUserShield,
  FaWallet,
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

function AppLayout() {
  const { currentUser, isAdmin, isHR, logout } = useAuth();
  const navigate = useNavigate();
  const canManageEmployees = isHR();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const toggleSidebar = () => {
    if (window.innerWidth <= 575) {
      setSidebarOpen(open => !open);
    } else {
      setSidebarCollapsed(collapsed => !collapsed);
    }
  };

  const linkClass = ({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`;

  return (
    <div>
      <aside className={`sidebar${sidebarOpen ? ' mobile-open' : ''}${sidebarCollapsed ? ' collapsed' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-icon"><FaBuilding /></div>
          <span className="brand-text">EmpMS</span>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-title">Overview</div>
          <NavLink className={linkClass} to="/dashboard">
            <FaTachometerAlt className="nav-icon" /><span className="nav-label">Dashboard</span>
          </NavLink>

          {isAdmin() && (
            <>
              <div className="nav-section-title">Administration</div>
              <NavLink className={linkClass} to="/admin/dashboard">
                <FaUserShield className="nav-icon" /><span className="nav-label">Admin Dashboard</span>
              </NavLink>
              <NavLink className={linkClass} to="/admin/users">
                <FaUsers className="nav-icon" /><span className="nav-label">User Management</span>
              </NavLink>
            </>
          )}

          {canManageEmployees && (
            <>
              <div className="nav-section-title">People</div>
              <NavLink className={linkClass} to="/employees" end>
                <FaUsers className="nav-icon" /><span className="nav-label">Employees</span>
              </NavLink>
              <NavLink className={linkClass} to="/employees/add">
                <FaUserPlus className="nav-icon" /><span className="nav-label">Add Employee</span>
              </NavLink>
              <NavLink className={linkClass} to="/departments">
                <FaBuilding className="nav-icon" /><span className="nav-label">Departments</span>
              </NavLink>

              <div className="nav-section-title">Operations</div>
              <NavLink className={linkClass} to="/attendance">
                <FaClipboardList className="nav-icon" /><span className="nav-label">Attendance</span>
              </NavLink>
              <NavLink className={linkClass} to="/leaves">
                <FaCalendarAlt className="nav-icon" /><span className="nav-label">Leave Management</span>
              </NavLink>
              <NavLink className={linkClass} to="/payroll">
                <FaWallet className="nav-icon" /><span className="nav-label">Payroll</span>
              </NavLink>
              <NavLink className={linkClass} to="/reports">
                <FaChartBar className="nav-icon" /><span className="nav-label">Reports</span>
              </NavLink>
            </>
          )}
          {!canManageEmployees && (
            <NavLink className={linkClass} to="/attendance">
              <FaClipboardList className="nav-icon" /><span className="nav-label">Attendance</span>
            </NavLink>
          )}

          <div className="nav-section-title">Account</div>
          <NavLink className={linkClass} to="/profile">
            <FaCog className="nav-icon" /><span className="nav-label">Profile Settings</span>
          </NavLink>
        </nav>
      </aside>

      <div className={`main-wrapper${sidebarCollapsed ? ' sidebar-collapsed' : ''}`}>
        <header className="top-navbar">
          <div className="d-flex align-items-center gap-3">
            <button type="button" className="btn btn-link p-0 text-muted menu-toggle" aria-label="Toggle navigation" onClick={toggleSidebar}>
              <FaBars aria-hidden="true" />
            </button>
            <span className="fw-semibold">Employee Management System</span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div className="text-end d-none d-sm-block">
              <div className="fw-semibold">{currentUser?.username || currentUser?.email || 'User'}</div>
              <small className="text-muted">{currentUser?.role || 'Employee'}</small>
            </div>
            <button type="button" className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
              <FaSignOutAlt className="me-1" /> Logout
            </button>
          </div>
        </header>
        <main><Outlet /></main>
      </div>
    </div>
  );
}

export default AppLayout;
