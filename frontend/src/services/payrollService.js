// frontend/src/services/payrollService.js
import api from './api';

const payrollService = {
  generate:        (data)      => api.post('/payroll/generate', data),
  getAll:          (params)    => api.get('/payroll', { params }),
  getByEmployee:   (empId, p)  => api.get(`/payroll/employee/${empId}`, { params: p }),
  getPayslip:      (id)        => api.get(`/payroll/${id}/payslip`),
};

export default payrollService;

