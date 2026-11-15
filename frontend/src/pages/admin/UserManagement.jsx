import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function UserManagement() {
  const [users, setUsers] = useState([]); const [form, setForm] = useState({ username: '', email: '', password: '', role: 'EMPLOYEE' }); const [error, setError] = useState('');
  const load = () => api.get('/users').then(({ data }) => setUsers(data)).catch(() => setError('Unable to load users.'));
  useEffect(() => { load(); }, []);
  const create = e => { e.preventDefault(); api.post('/users', form).then(() => { setForm({ username: '', email: '', password: '', role: 'EMPLOYEE' }); load(); }).catch(err => setError(err.response?.data?.message || 'Unable to create user.')); };
  return <div className="page-content"><h2 className="mb-4">User Management</h2>{error && <div className="alert alert-danger">{error}</div>}<form className="table-card p-3 mb-4" onSubmit={create}><div className="row g-2"><input className="form-control col" placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required /><input className="form-control col" placeholder="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required /><input className="form-control col" placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required /><select className="form-select col" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}><option>EMPLOYEE</option><option>HR</option><option>ADMIN</option></select><button className="btn btn-primary col">Create User</button></div></form><div className="table-card p-3"><table className="table"><thead><tr><th>Username</th><th>Email</th><th>Role</th><th>Active</th></tr></thead><tbody>{users.map(u => <tr key={u.id}><td>{u.username}</td><td>{u.email}</td><td>{u.role}</td><td>{u.active ? 'Yes' : 'No'}</td></tr>)}</tbody></table></div></div>;
}
