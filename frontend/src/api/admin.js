import api from './axiosInstance';

export const adminGetUsers = () => api.get('/api/admin/users');
export const adminGetEvents = () => api.get('/api/admin/events');
export const adminGetBookings = () => api.get('/api/admin/bookings');
