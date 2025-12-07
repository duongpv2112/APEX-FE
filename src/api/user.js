// API cho người dùng
import axiosInstance from './axiosInstance';

export const getUserInfo = () => {
  return axiosInstance.get('/user/info');
};

// Thêm các API khác cho user tại đây
