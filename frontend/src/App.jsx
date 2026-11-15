// frontend/src/App.jsx
// ─────────────────────────────────────────────────────────────
// Root component. Sets up:
//   • AuthContext provider (global auth state)
//   • React Router (all page routes)
//   • Toast container for notifications
// ─────────────────────────────────────────────────────────────
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Context
import { AuthProvider } from './context/AuthContext';

// Route guards
import PrivateRoute   from './components/common/PrivateRoute';
import RoleRoute      from './components/common/RoleRoute';
import AppLayout      from './layouts/AppLayout';

// Pages – Auth
import LoginPage      from './pages/LoginPage';

// Pages – Admin / HR
import AdminDashboard     from './pages/dashboard/AdminDashboard';
import HRDashboard        from './pages/dashboard/HRDashboard';
import EmployeeDashboard  from './pages/dashboard/EmployeeDashboard';

// Pages – Employee Management
import EmployeeList   from './pages/employee/EmployeeList';
import AddEmployee    from './pages/employee/AddEmployee';
import EditEmployee   from './pages/employee/EditEmployee';
import EmployeeProfile from './pages/employee/EmployeeProfile';

// Pages – Department
import DepartmentList from './pages/department/DepartmentList';

// Pages – Attendance
import AttendancePage from './pages/attendance/AttendancePage';

// Pages – Leave
import LeavePage      from './pages/leave/LeavePage';

// Pages – Payroll
import PayrollPage    from './pages/payroll/PayrollPage';

// Pages – Reports
import ReportsPage    from './pages/reports/ReportsPage';

// Pages – User Management
import UserManagement from './pages/admin/UserManagement';

// Pages – Profile Settings
import ProfileSettings from './pages/profile/ProfileSettings';

// 404
import NotFound       from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ── Public routes ─────────────────────────── */}
          <Route path="/login" element={<LoginPage />} />

          {/* ── Redirect root to dashboard ────────────── */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* ── Protected routes (any logged-in user) ─── */}
          <Route element={<PrivateRoute />}>
            <Route element={<AppLayout />}>

            {/* Dashboard – role-aware redirect */}
            <Route path="/dashboard" element={<DashboardRouter />} />

            {/* Admin-only dashboard */}
            <Route element={<RoleRoute allowedRoles={['ADMIN']} />}>
              <Route path="/admin/dashboard"  element={<AdminDashboard />} />
              <Route path="/admin/users"       element={<UserManagement />} />
            </Route>

            {/* HR + Admin */}
            <Route element={<RoleRoute allowedRoles={['ADMIN', 'HR']} />}>
              <Route path="/hr/dashboard"      element={<HRDashboard />} />
              <Route path="/employees"         element={<EmployeeList />} />
              <Route path="/employees/add"     element={<AddEmployee />} />
              <Route path="/employees/edit/:id" element={<EditEmployee />} />
              <Route path="/departments"       element={<DepartmentList />} />
              <Route path="/reports"           element={<ReportsPage />} />
            </Route>

            {/* Attendance, leave and payroll are available to every role */}
            <Route element={<RoleRoute allowedRoles={['ADMIN', 'HR', 'EMPLOYEE']} />}>
              <Route path="/attendance" element={<AttendancePage />} />
              <Route path="/leaves"     element={<LeavePage />} />
              <Route path="/payroll"    element={<PayrollPage />} />
            </Route>

            {/* All roles */}
            <Route path="/employee/dashboard"  element={<EmployeeDashboard />} />
            <Route path="/employees/:id"       element={<EmployeeProfile />} />
            <Route path="/profile"             element={<ProfileSettings />} />

            </Route>
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

      {/* Toast notification container */}
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AuthProvider>
  );
}

/**
 * DashboardRouter
 * Reads the logged-in user's role from AuthContext and
 * redirects to the appropriate dashboard.
 */
function DashboardRouter() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const role = user?.role;

  if (role === 'ADMIN')    return <Navigate to="/admin/dashboard"    replace />;
  if (role === 'HR')       return <Navigate to="/hr/dashboard"       replace />;
  if (role === 'EMPLOYEE') return <Navigate to="/employee/dashboard" replace />;

  return <Navigate to="/login" replace />;
}

export default App;

