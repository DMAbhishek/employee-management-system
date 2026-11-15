// frontend/src/pages/dashboard/EmployeeDashboard.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarCheck, FaCalendarAlt, FaUser, FaWallet } from 'react-icons/fa';
import employeeService from '../../services/employeeService';

export default function EmployeeDashboard() {
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    employeeService.getMe()
      .then(({ data }) => setEmployee(data))
      .catch(() => setError('Your login is not linked to an employee profile. Ask an Admin to edit your employee record and select your login account.'));
  }, []);

  return <div className="page-content">
    <div className="mb-4">
      <h2 className="mb-1">Employee Dashboard</h2>
      <p className="text-muted mb-0">Manage your attendance, leave requests, profile and payroll.</p>
    </div>
    {error && <div className="alert alert-warning">{error}</div>}
    {employee && <div className="table-card p-4 mb-4">
      <h4>{employee.firstName} {employee.lastName}</h4>
      <div className="text-muted">{employee.designation || 'Employee'} · {employee.employeeCode}</div>
      <div className="mt-2">{employee.department?.deptName || 'Department not assigned'}</div>
    </div>}
    <div className="row g-4">
      {[
        ['/attendance', FaCalendarCheck, 'Attendance', 'Check in and check out'],
        ['/leaves', FaCalendarAlt, 'Leave Requests', 'Apply and view leave'],
        ['/profile', FaUser, 'My Profile', 'View account details'],
        ['/payroll', FaWallet, 'Payroll', 'View payroll records'],
      ].map(([to, Icon, title, description]) => <div className="col-sm-6 col-xl-3" key={to}>
        <Link to={to} className="stat-card d-block h-100">
          <div className="card-icon bg-primary-subtle text-primary"><Icon /></div>
          <h5>{title}</h5>
          <div className="card-label">{description}</div>
        </Link>
      </div>)}
    </div>
  </div>;
}
