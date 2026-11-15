// frontend/src/pages/dashboard/AdminDashboard.jsx
import React from 'react';
import { useEffect, useState } from 'react';
import { FaUsers, FaBuilding, FaUserClock, FaCalendarAlt } from 'react-icons/fa';
import api from '../../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/dashboard/statistics')
      .then(({ data }) => setStats(data))
      .catch(() => setError('Unable to load dashboard statistics.'));
  }, []);

  const cards = [
    ['Total Employees', stats.totalEmployees, FaUsers, 'primary'],
    ['Active Employees', stats.activeEmployees, FaUserClock, 'success'],
    ['Departments', stats.totalDepartments, FaBuilding, 'info'],
    ['Pending Leaves', stats.pendingLeaves, FaCalendarAlt, 'warning'],
  ];

  return <div className="page-content">
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div><h2 className="mb-1">Admin Dashboard</h2><p className="text-muted mb-0">Live workforce overview</p></div>
    </div>
    {error && <div className="alert alert-danger">{error}</div>}
    <div className="row g-4">
      {cards.map(([label, value, Icon, color]) => <div className="col-sm-6 col-xl-3" key={label}>
        <div className="stat-card"><div className={`card-icon bg-${color}-subtle text-${color}`}><Icon /></div>
          <div className="card-value">{value ?? 0}</div><div className="card-label">{label}</div>
        </div>
      </div>)}
    </div>
  </div>;
}
