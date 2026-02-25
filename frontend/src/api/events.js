import api from './axiosInstance';

export const createEvent = (data) => api.post('/api/events', data);
export const getMyEvents = () => api.get('/api/events/my');
export const getAllEvents = () => api.get('/api/events');
export const updateEvent = (id, data) => api.put(`/api/events/${id}`, data);
export const deleteEvent = (id) => api.delete(`/api/events/${id}`);
