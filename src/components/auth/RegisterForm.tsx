'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';
import {
  registerRequest,
  registerSuccess,
  registerFailure,
} from '@/actions/authActions';
import { useAppDispatch, useAppSelector } from '@/store';
import Link from 'next/link';

export const RegisterForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, token } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    specialization: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (token) {
      router.push('/dashboard');
    }
  }, [token, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      dispatch(registerFailure('Passwords do not match'));
      return;
    }

    dispatch(registerRequest());

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          age: formData.age ? Number(formData.age) : null,
          gender: formData.gender,
          phone: formData.phone ? Number(formData.phone) : null,
          specialization: formData.specialization,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        console.log(data)
        dispatch(registerSuccess(data));
        router.push('/dashboard');
      } else {
        dispatch(registerFailure(data.message || 'Registration failed'));
      }
    } catch (err) {
      console.log(err)
      dispatch(registerFailure('An error occurred during registration'));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <Input
          type="text"
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          className='text-gray-600'
          required
        />
        <Input
          type="number"
          name="age"
          label="Age"
          value={formData.age}
          onChange={handleChange}
          className='text-gray-600'

          required
        />
        <div className="flex flex-col gap-1">
          <label htmlFor="gender" className="text-sm font-medium text-black">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
          </select>
        </div>
        <Input
          type="tel"
          name="phone"
          label="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className='text-gray-600'

          required
        />
        <Input
          type="text"
          name="specialization"
          label="Specialization"
          value={formData.specialization}
          onChange={handleChange}
          className='text-gray-600'

          required
        />
        <Input
          type="email"
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          className='text-gray-600'

          required
        />
        <Input
          type="password"
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          className='text-gray-600'

          required
        />
        <Input
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className='text-gray-600'

          required
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </form>
      <Link href="/login" className="text-blue-500 mt-5">
        Already have an account? Login
      </Link>
    </>
  );
};
