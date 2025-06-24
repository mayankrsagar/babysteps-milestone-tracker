import { fetchWithAuth } from './api';

export const getTips = milestoneId => fetchWithAuth(`/milestones/${milestoneId}/tips`);
export const addTip = (milestoneId, content) =>
  fetchWithAuth(`/milestones/${milestoneId}/tips`, { method: 'POST', body: JSON.stringify({ content }) });
