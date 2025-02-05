'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from '@/actions/authActions';
import { useAppDispatch, useAppSelector } from '@/store';
import Link from 'next/link';

export const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, token } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (token) {
      router.push('/dashboard');
    }
  }, [token, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(loginRequest());

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        dispatch(loginSuccess(data));
        router.push('/dashboard');
      } else {
        dispatch(loginFailure(data.message || 'Login failed'));
      }
    } catch (err) {
      dispatch(loginFailure('An error occurred during login'));
    }
  };

  return (
    <div className="space-y-4 max-w-md mx-auto text-black">
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto text-black">
        <Input
          type="email"
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
      <Link href="/register" className="text-blue-500 mt-5">
        Don't have an account? Register
      </Link>
    </div>
  );
};
