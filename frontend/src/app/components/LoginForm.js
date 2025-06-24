'use client';
import { useState } from 'react';

import { useAuth } from '../context/AuthContext';
import {
  loginUser,
  registerUser,
} from '../services/auth';

export default function LoginForm() {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let token, user;
      if (isLogin) {
        ({ token, user } = await loginUser(formData.email, formData.password));
      } else {

        ({ token, user } = await registerUser(formData.name, formData.email, formData.password));
      }
      login(user, token);
    } catch (err) {
      // if error message available
      const msg = err.message || 'Authentication failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {isLogin ? 'Welcome Back' : 'Create Account'}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required={!isLogin}
              autoComplete="name"
            />
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
            autoComplete="email"
          />
        </div>

        <div className="mb-6 relative">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md pr-10"
            required
            minLength={6}
            autoComplete={isLogin ? 'current-password' : 'new-password'}
          />
          <button
            type="button"
            className="absolute right-2 top-8 text-sm text-blue-600 hover:underline focus:outline-none"
            onClick={togglePassword}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => setIsLogin((prev) => !prev)}
          className="text-blue-500 hover:text-blue-800 text-sm"
        >
          {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
        </button>
      </div>
    </div>
  )}

