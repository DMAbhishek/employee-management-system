// frontend/src/services/departmentService.js
import api from './api';

const departmentService = {
  getAll:  ()        => api.get('/departments'),
  getById: (id)      => api.get(`/departments/${id}`),
  create:  (data)    => api.post('/departments', data),
  update:  (id, d)   => api.put(`/departments/${id}`, d),
  remove:  (id)      => api.delete(`/departments/${id}`),
};

export default departmentService;

