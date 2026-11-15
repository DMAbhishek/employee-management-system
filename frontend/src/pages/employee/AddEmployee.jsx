import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import employeeService from '../../services/employeeService';
import departmentService from '../../services/departmentService';
import api from '../../services/api';

export default function AddEmployee() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ employeeCode: '', firstName: '', lastName: '', email: '', phone: '', designation: '', basicSalary: '', joiningDate: '', employmentStatus: 'ACTIVE', departmentId: '' });
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => { Promise.all([departmentService.getAll(), api.get('/users')]).then(([departmentResponse, userResponse]) => { setDepartments(departmentResponse.data.content || departmentResponse.data); setUsers(userResponse.data.filter(user => user.role === 'EMPLOYEE')); }).catch(() => setError('Unable to load departments or employee accounts.')); }, []);
  const update = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = e => { e.preventDefault(); employeeService.create({ ...form, departmentId: Number(form.departmentId), userId: Number(form.userId), basicSalary: Number(form.basicSalary) }).then(() => navigate('/employees')).catch(err => setError(err.response?.data?.message || 'Unable to save employee.')); };
  return <div className="page-content"><h2 className="mb-4">Add Employee</h2>{error && <div className="alert alert-danger">{error}</div>}
    <form className="table-card p-4" onSubmit={submit}><div className="row g-3">{[['employeeCode','Employee Code'],['firstName','First Name'],['lastName','Last Name'],['email','Email'],['phone','Phone'],['designation','Designation'],['basicSalary','Basic Salary'],['joiningDate','Joining Date']].map(([name,label]) => <div className="col-md-6" key={name}><label className="form-label">{label}</label><input className="form-control" name={name} type={name === 'joiningDate' ? 'date' : name === 'basicSalary' ? 'number' : 'text'} required={['employeeCode','firstName','lastName','email','joiningDate'].includes(name)} value={form[name]} onChange={update} /></div>)}<div className="col-md-6"><label className="form-label">Department</label><select className="form-select" name="departmentId" value={form.departmentId} onChange={update} required><option value="">Select department</option>{departments.map(department => <option key={department.id} value={department.id}>{department.deptName || department.name}</option>)}</select></div><div className="col-md-6"><label className="form-label">Employee Login Account</label><select className="form-select" name="userId" value={form.userId} onChange={update} required><option value="">Select employee account</option>{users.map(user => <option key={user.id} value={user.id}>{user.username} ({user.email})</option>)}</select></div></div><button className="btn btn-primary mt-4">Save Employee</button></form>
  </div>;
}
