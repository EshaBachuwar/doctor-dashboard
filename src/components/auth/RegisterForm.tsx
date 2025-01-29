"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';

export const RegisterForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name:'',
        age:'',
        gender:'',
        phone:'',
        email:'',
        password:'',
        confirmPassword:'',
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                router.push('/dashboard');
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('An error occurred during login');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <Input
                type="text"
                label="Name"
                value={formData.name}
                onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
                type="number"
                label="Age"
                value={formData.age}
                onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, age: e.target.value })}
            />
            <select
              value={formData.gender}
              onChange={(e) => setFormData({...formData,gender:e.target.value})}
              className="rounded border  border-bottom p-3 text-black border-rose-300 bg-rose-200"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
            </select>
            <Input
                type="tel"
                label="Phone Number"
                value={formData.phone}
                onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, phone: e.target.value })}
            />
            <Input
                type="email"
                label="Email"
                value={formData.email}
                onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, email: e.target.value })}
            />
            <Input
                type="password"
                label="Password"
                value={formData.password}
                onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, password: e.target.value })}
            />
            <Input
                type="password"
                label="Confirm Password"
                value={formData.password}
                onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, password: e.target.value })}
            />
            {error && <p className="text-rose-500 text-sm">{error}</p>}
            <Button type="submit">Register</Button>
        </form>
    );
};