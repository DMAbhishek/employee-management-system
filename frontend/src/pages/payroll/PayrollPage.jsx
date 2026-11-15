import React, { useEffect, useState } from 'react';
import payrollService from '../../services/payrollService';

export default function PayrollPage() {
  const [rows, setRows] = useState([]); const [form, setForm] = useState({ employeeId: '', month: '' }); const [error, setError] = useState('');
  const load = () => payrollService.getAll().then(({ data }) => setRows(data.content || data)).catch(() => setError('Unable to load payroll records.'));
  useEffect(() => { load(); }, []);
  const generate = e => { e.preventDefault(); payrollService.generate(form).then(() => { setForm({ employeeId: '', month: '' }); load(); }).catch(err => setError(err.response?.data?.message || 'Unable to generate payroll.')); };
  return <div className="page-content"><h2 className="mb-4">Payroll</h2>{error && <div className="alert alert-danger">{error}</div>}<form className="d-flex gap-2 mb-4" onSubmit={generate}><input className="form-control" placeholder="Employee ID" value={form.employeeId} onChange={e => setForm({ ...form, employeeId: e.target.value })} required /><input className="form-control" type="month" value={form.month} onChange={e => setForm({ ...form, month: e.target.value })} required /><button className="btn btn-primary">Generate Payroll</button></form><div className="table-card p-3 table-responsive"><table className="table"><thead><tr><th>Employee</th><th>Month</th><th>Basic</th><th>Allowances</th><th>Deductions</th><th>Net Salary</th></tr></thead><tbody>{rows.map(r => <tr key={r.id}><td>{r.employeeId}</td><td>{r.month}</td><td>{r.basicSalary}</td><td>{r.allowances}</td><td>{r.deductions}</td><td>{r.netSalary}</td></tr>)}</tbody></table></div></div>;
}
