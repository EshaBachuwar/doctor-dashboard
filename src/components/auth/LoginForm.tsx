"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';

export const LoginForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/login', {
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
            {error && <p className="text-rose-500 text-sm">{error}</p>}
            <Button type="submit">Login</Button>
        </form>
    );
};