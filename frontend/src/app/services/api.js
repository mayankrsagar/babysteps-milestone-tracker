export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
//  || 'https://babysteps-milestone-tracker.onrender.com/api';
export async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE_URL}${url}`, { ...options, headers });
  if (!res.ok) throw new Error((await res.json()).message || 'API Error');
console.log(res);
  return res.json();

}