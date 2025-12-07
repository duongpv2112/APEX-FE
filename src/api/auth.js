// API xác thực
import axiosInstance from './axiosInstance';

export const login = (data) => {
  return axiosInstance.post('/auth/login', data);
};

export const logout = () => {
  return axiosInstance.post('/auth/logout');
};

// Thêm các API xác thực khác tại đây
