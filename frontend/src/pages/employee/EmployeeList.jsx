import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import employeeService from '../../services/employeeService';

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const load = () => employeeService.getAll({ search }).then(({ data }) => setEmployees(data.content || data)).catch(() => setError('Unable to load employees.'));
  useEffect(() => { load(); }, []);
  const remove = (id) => { if (window.confirm('Delete this employee?')) employeeService.remove(id).then(load).catch(() => setError('Delete failed.')); };
  return <div className="page-content"><div className="d-flex justify-content-between mb-4"><h2>Employees</h2><Link className="btn btn-primary" to="/employees/add">Add Employee</Link></div>
    {error && <div className="alert alert-danger">{error}</div>}
    <div className="table-card p-3"><div className="input-group mb-3"><input className="form-control" placeholder="Search by name or employee code" value={search} onChange={e => setSearch(e.target.value)} /><button className="btn btn-outline-primary" onClick={load}>Search</button></div>
      <div className="table-responsive"><table className="table align-middle"><thead><tr><th>Code</th><th>Name</th><th>Email</th><th>Department</th><th>Status</th><th>Attendance</th><th>Actions</th></tr></thead><tbody>
        {employees.map(e => <tr key={e.id}><td>{e.employeeCode}</td><td>{e.firstName} {e.lastName}</td><td>{e.email}</td><td>{e.department?.deptName || e.departmentName || '-'}</td><td><span className="badge text-bg-success">{e.employmentStatus}</span></td><td><Link className="btn btn-sm btn-outline-primary" to="/attendance">View</Link></td><td><Link className="btn btn-sm btn-outline-secondary me-2" to={`/employees/edit/${e.id}`}>Edit</Link><button className="btn btn-sm btn-outline-danger" onClick={() => remove(e.id)}>Delete</button></td></tr>)}
        {!employees.length && <tr><td colSpan="7" className="text-center text-muted py-4">No employees found.</td></tr>}
      </tbody></table></div>
    </div></div>;
}
