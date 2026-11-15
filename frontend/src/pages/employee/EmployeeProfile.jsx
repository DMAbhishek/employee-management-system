import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import employeeService from '../../services/employeeService';

export default function EmployeeProfile() {
  const { id } = useParams(); const [employee, setEmployee] = useState(null); const [error, setError] = useState('');
  useEffect(() => { employeeService.getById(id).then(({ data }) => setEmployee(data)).catch(() => setError('Unable to load profile.')); }, [id]);
  return <div className="page-content"><h2 className="mb-4">Employee Profile</h2>{error && <div className="alert alert-danger">{error}</div>}{employee && <div className="table-card p-4"><h4>{employee.firstName} {employee.lastName}</h4><dl className="row mt-3"><dt className="col-sm-3">Employee Code</dt><dd className="col-sm-9">{employee.employeeCode}</dd><dt className="col-sm-3">Email</dt><dd className="col-sm-9">{employee.email}</dd><dt className="col-sm-3">Designation</dt><dd className="col-sm-9">{employee.designation || '-'}</dd><dt className="col-sm-3">Status</dt><dd className="col-sm-9">{employee.employmentStatus}</dd></dl></div>}</div>;
}
