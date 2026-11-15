import React, { useEffect, useState } from 'react';
import departmentService from '../../services/departmentService';

export default function DepartmentList() {
  const [items, setItems] = useState([]); const [name, setName] = useState(''); const [error, setError] = useState('');
  const load = () => departmentService.getAll().then(({ data }) => setItems(data.content || data)).catch(() => setError('Unable to load departments.'));
  useEffect(() => { load(); }, []);
  const add = e => { e.preventDefault(); if (!name.trim()) return; departmentService.create({ name: name.trim() }).then(() => { setName(''); load(); }).catch(() => setError('Unable to create department.')); };
  const remove = id => departmentService.remove(id).then(load).catch(() => setError('Department may have active employees.'));
  return <div className="page-content"><h2 className="mb-4">Departments</h2>{error && <div className="alert alert-danger">{error}</div>}<form className="d-flex gap-2 mb-4" onSubmit={add}><input className="form-control" placeholder="Department name" value={name} onChange={e => setName(e.target.value)} /><button className="btn btn-primary">Add</button></form><div className="table-card p-3"><table className="table"><thead><tr><th>Name</th><th>Employee Count</th><th /></tr></thead><tbody>{items.map(d => <tr key={d.id}><td>{d.deptName || d.name}</td><td>{d.employeeCount ?? 0}</td><td><button className="btn btn-sm btn-outline-danger" onClick={() => remove(d.id)}>Delete</button></td></tr>)}</tbody></table></div></div>;
}
