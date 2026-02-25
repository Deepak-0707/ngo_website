import api from './axiosInstance';

export const claimEvent = (eventId) => api.post(`/api/bookings/${eventId}`);
export const getMyBookings = () => api.get('/api/bookings/my');
export const getAllBookings = () => api.get('/api/bookings');
