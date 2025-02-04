"use client";
import React, { useState } from 'react';
import { Button } from '../shared/Button';
import { kn } from 'date-fns/locale';
import { cursorTo } from 'readline';
import next from 'next';
interface AddPatientProps {
    setRightPanel: (panel: string) => void;
}
export const AddPatient: React.FC<AddPatientProps> = ({ setRightPanel }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        phone: '',
        weight: '',
        bloodGroup: '',
        knownAllergies: '',
        medicalHistory: '',
        currentMedication: '',
        reasonOfVisit: '',
        symptoms: '',
        diagnosis: '',
        prescribedMedication: '',
        nextVisit: '',
      });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ name, age, gender, address, phone });
        setRightPanel('list');
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-pink-100 rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold mb-6 text-center text-black">Add New Patient</h1>
            <form onSubmit={handleSubmit} className='text-gray-700'>
                <div className="mb-4 text-gray-700 grid grid-cols-1 md:grid-cols-2">
                    <div className='"md:col-span-1'>
                    <label className="text-sm font-medium text-gray-700">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="ml-1  w-[70%] px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                     </div>
                     <div className='md:col-span-1'>
                     <label className="ml-2 text-sm font-medium text-gray-700">Age:</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                        className="ml-1  w-[70%] px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </div>
                </div>
                <div className="mb-4 text-gray-700 grid grid-cols-1 md:grid-cols-2">
                    <div className='md:col-span-1'>
                    <label className=" text-sm font-medium text-gray-700">Gender:</label>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                        className="ml-1 text-gray-700  w-[70%] px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    </div>
                    <div className='md:col-span-1'>
                    <label className="ml-2 text-sm font-medium text-gray-700">Phone:</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="ml-1  w-[70%] px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </div>
                </div>
                <div className='flex justify-center'>
                <Button className="mt-4 w-[40%]">Add Patient</Button>
                </div>
            </form>
        </div>
    );
};
