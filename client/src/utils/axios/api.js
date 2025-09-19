import axiosInstance from '../axios/axiosInstance';

const api = {

  // Auth Endpoints
  
  auth: {
    signup: (data) => axiosInstance.post('/auth/signup', data),
    login: (data) => axiosInstance.post('/auth/login', data),
    logout: () => axiosInstance.get('/auth/logout'),
    getProfile: () => axiosInstance.get('/auth/profile'),
    updateAvatar: (formData) =>
      axiosInstance.patch('/auth/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
  },

  // File Endpoints

  files: {
    upload: (formData) =>
      axiosInstance.post('/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    getAll: () => axiosInstance.get('/files'),
    getShared: () => axiosInstance.get('/files/shared/me'),
    delete: (fileId) => axiosInstance.delete(`/files/${fileId}`),
    restore: (fileId) => axiosInstance.patch(`/files/${fileId}/restore`),
    permanentDelete: (fileId) => axiosInstance.delete(`/files/${fileId}/permanent`),
    toggleStar: (fileId) => axiosInstance.post(`/files/star/${fileId}`),
    shareWith: (fileId, userId) => axiosInstance.patch(`/files/${fileId}/share`, { userId }),
  },
};

export default api;
