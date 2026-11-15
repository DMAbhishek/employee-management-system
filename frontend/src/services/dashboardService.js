// frontend/src/services/dashboardService.js
import api from './api';

const dashboardService = {
  getStatistics: () => api.get('/dashboard/statistics'),
};

export default dashboardService;

