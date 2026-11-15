// frontend/src/services/employeeService.js
import api from './api';

const employeeService = {
  getAll:   (params) => api.get('/employees', { params }),    // supports page, size, sort, search, dept, status
  getById:  (id)     => api.get(`/employees/${id}`),
  getMe:    ()       => api.get('/employees/me'),
  create:   (data)   => api.post('/employees', data),
  update:   (id, d)  => api.put(`/employees/${id}`, d),
  remove:   (id)     => api.delete(`/employees/${id}`),
};

export default employeeService;

