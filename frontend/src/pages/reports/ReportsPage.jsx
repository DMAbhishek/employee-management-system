import React from 'react';
export default function ReportsPage() { return <div className="page-content"><h2>Reports</h2><p className="text-muted">Use the tables in Employees, Attendance, Leave and Payroll to filter and print operational reports.</p><button className="btn btn-outline-primary" onClick={() => window.print()}>Print Report</button></div>; }
