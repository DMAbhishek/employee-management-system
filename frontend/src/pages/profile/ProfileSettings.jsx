import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
export default function ProfileSettings() {
  const { currentUser } = useAuth(); const [saved, setSaved] = useState(false);
  return <div className="page-content"><h2 className="mb-4">Profile Settings</h2><div className="table-card p-4 col-lg-7"><label className="form-label">Username</label><input className="form-control mb-3" value={currentUser?.username || ''} readOnly /><label className="form-label">Email</label><input className="form-control mb-3" value={currentUser?.email || ''} readOnly /><label className="form-label">Role</label><input className="form-control mb-3" value={currentUser?.role || ''} readOnly /><button className="btn btn-primary" onClick={() => setSaved(true)}>Save Settings</button>{saved && <div className="alert alert-success mt-3 mb-0">Profile settings saved.</div>}</div></div>;
}
