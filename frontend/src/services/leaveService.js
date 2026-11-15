// frontend/src/services/leaveService.js
import api from './api';

const leaveService = {
  apply:   (data)   => api.post('/leaves', data),
  getAll:  (params) => api.get('/leaves', { params }),
  getById: (id)     => api.get(`/leaves/${id}`),
  approve: (id, d)  => api.put(`/leaves/${id}/approve`, d),
  reject:  (id, d)  => api.put(`/leaves/${id}/reject`, d),
  getMyLeaves: (p)  => api.get('/leaves/my', { params: p }),
  getBalance:  (empId) => api.get(`/leaves/balance/${empId}`),
};

export default leaveService;

