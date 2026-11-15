// frontend/src/services/attendanceService.js
import api from './api';

const attendanceService = {
  checkIn:        (data)       => api.post('/attendance/check-in', data),
  checkOut:       (data)       => api.post('/attendance/check-out', data),
  getAll:         (params)     => api.get('/attendance', { params }),
  getByEmployee:  (empId, p)   => api.get(`/attendance/employee/${empId}`, { params: p }),
};

export default attendanceService;

