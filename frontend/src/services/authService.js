// frontend/src/services/authService.js
// ─────────────────────────────────────────────────────────────
// All API calls related to Authentication.
// ─────────────────────────────────────────────────────────────
import api from './api';

const authService = {
  /**
   * login – POST /api/auth/login
   * @param {string} username
   * @param {string} password
   * @returns {Promise} Axios response with { token, id, username, email, role }
   */
  login: (username, password) =>
    api.post('/auth/login', { username, password }),

  /**
   * logout – POST /api/auth/logout  (optional server-side invalidation)
   */
  logout: () =>
    api.post('/auth/logout').catch(() => {}), // fail silently
};

export default authService;

