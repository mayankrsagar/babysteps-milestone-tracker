import { fetchWithAuth } from './api';

export const loginUser = (email, password) =>
  fetchWithAuth('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
export const registerUser = (name, email, password) =>
  fetchWithAuth('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) });
