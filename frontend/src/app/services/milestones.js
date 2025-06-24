import { fetchWithAuth } from './api';

export const getMilestones = () => fetchWithAuth('/milestones');
export const createMilestone = data => fetchWithAuth('/milestones', { method: 'POST', body: JSON.stringify(data) });
export const updateMilestone = (id, data) => fetchWithAuth(`/milestones/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteMilestone = id => fetchWithAuth(`/milestones/${id}`, { method: 'DELETE' });
