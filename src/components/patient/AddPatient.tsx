"use client";
import React, { useState } from 'react';
import { Button } from '../shared/Button';
import { useDispatch } from 'react-redux';
import { addPatient } from '@/actions/patientThunks';
import { AppDispatch, store } from '@/store';
interface AddPatientProps {
    setRightPanel: (panel: string) => void;
}
export const AddPatient: React.FC<AddPatientProps> = ({ setRightPanel }) => {
    const dispatch = useDispatch<AppDispatch>();
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

    const handleSubmit =async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.age || !formData.gender) {
            alert('Please provide name');
            return;
        }
        try {
            const patientData = {
              ...formData,
              age: parseInt(formData.age),
              weight: formData.weight ? parseFloat(formData.weight) : undefined,
              doctor: store.getState().auth.doctor?.id ,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };
            dispatch(addPatient(patientData));
            setRightPanel('list');
        } catch (error) {
            console.error('Error creating patient:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-pink-100 rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold mb-6 text-center text-black">Add New Patient</h1>
            <form onSubmit={handleSubmit} className='text-gray-700'>
                <div className="mb-4 text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className='"md:col-span-1 grid grid-cols-1 md:grid-cols-5 gap-1'>
                    <label className="text-sm font-medium text-gray-700 md:col-span-1">Name:</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="ml-1  md:col-span-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                     </div>
                     <div className='md:col-span-1 grid grid-cols-1 md:grid-cols-5 gap-1'>
                     <label className="ml-2 text-sm font-medium text-gray-700 md:col-span-1">Age:</label>
                    <input
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        required
                        className="ml-1  md:col-span-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </div>
                </div>
                <div className="mb-4 text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className='md:col-span-1 grid grid-cols-1 md:grid-cols-5 gap-1'>
                    <label className=" text-sm font-medium text-gray-700 md:col-span-1">Gender:</label>
                    <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        required
                        className="ml-1 text-gray-700   md:col-span-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    </div>
                    <div className='md:col-span-1 grid grid-cols-1 md:grid-cols-5 gap-1'>
                    <label className="ml-2 text-sm font-medium text-gray-700 md:col-span-1">Phone:</label>
                    <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="ml-1  md:col-span-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </div>
                </div>
                <div className="mb-4 text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className='"md:col-span-1 grid grid-cols-1 md:grid-cols-5 gap-1'>
                    <label className="text-sm font-medium text-gray-700 md:col-span-1">Weight:</label>
                    <input
                        type="number"
                        value={formData.weight}
                        onChange={(e) =>setFormData({ ...formData, weight: e.target.value })}
                        required
                        className="ml-1   md:col-span-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                     </div>
                     <div className='md:col-span-1 grid grid-cols-1 md:grid-cols-5 gap-1'>
                     <label className="ml-2 text-sm font-medium text-gray-700 md:col-span-1">Blood Group:</label>
                    <input
                        type="text"
                        value={formData.bloodGroup}
                        onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                        required
                        className="ml-1   md:col-span-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </div>
                </div>
                <div className="mb-4 text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className='"md:col-span-1 grid grid-cols-1 md:grid-cols-5 gap-1'>
                    <label className="text-sm font-medium text-gray-700 md:col-span-1">Known Allergies:</label>
                    <input
                        type="text"
                        value={formData.knownAllergies}
                        onChange={(e) => setFormData({ ...formData, knownAllergies: e.target.value })}
                        required
                        className="ml-1  md:col-span-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                     </div>
                     <div className='md:col-span-1 grid grid-cols-1 md:grid-cols-5 gap-1'>
                     <label className="ml-2 text-sm font-medium text-gray-700 md:col-span-1">Medical History:</label>
                    <input
                        type="text"
                        value={formData.medicalHistory}
                        onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                        required
                        className="ml-1  md:col-span-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </div>
                </div>
                <div className="mb-4 text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className='"md:col-span-1 grid grid-cols-1 md:grid-cols-5 gap-1'>
                    <label className="text-sm font-medium text-gray-700 md:col-span-1">Current Medication:</label>
                    <input
                        type="text"
                        value={formData.currentMedication}
                        onChange={(e) => setFormData({ ...formData, currentMedication: e.target.value })}
                        required
                        className="ml-1  md:col-span-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                     </div>
                     <div className='md:col-span-1 grid grid-cols-1 md:grid-cols-5 gap-1'>
                     <label className="ml-2 text-sm font-medium text-gray-700 md:col-span-1">Reason Of Visit:</label>
                    <input
                        type="text"
                        value={formData.reasonOfVisit}
                        onChange={(e) => setFormData({ ...formData, reasonOfVisit: e.target.value })}
                        required
                        className="ml-1  md:col-span-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </div>
                </div>
                <div className="mb-4 text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className='"md:col-span-1 grid grid-cols-1 md:grid-cols-5 gap-1'>
                    <label className="text-sm font-medium text-gray-700 md:col-span-1">Symptoms:</label>
                    <input
                        type="text"
                        value={formData.symptoms}
                        onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                        required
                        className="ml-1  md:col-span-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                     </div>
                     <div className='md:col-span-1 grid grid-cols-1 md:grid-cols-5 gap-1'>
                     <label className="ml-2 text-sm font-medium text-gray-700 md:col-span-1">Diagnosis :</label>
                    <input
                        type="text"
                        value={formData.diagnosis}
                        onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                        required
                        className="ml-1  md:col-span-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </div>
                </div>
                <div className="mb-4 text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className='"md:col-span-1 grid grid-cols-1 md:grid-cols-5 gap-1'>
                    <label className="text-sm font-medium text-gray-700 md:col-span-1">Prescribed Medication:</label>
                    <input
                        type="text"
                        value={formData.prescribedMedication}
                        onChange={(e) => setFormData({ ...formData, prescribedMedication: e.target.value })}
                        required
                        className="ml-1  md:col-span-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                     </div>
                     <div className='md:col-span-1 grid grid-cols-1 md:grid-cols-5 gap-1'>
                     <label className="ml-2 text-sm font-medium text-gray-700 md:col-span-1">Next Visit :</label>
                    <input
                        type="text"
                        value={formData.nextVisit}
                        onChange={(e) => setFormData({ ...formData, nextVisit: e.target.value })}
                        required
                        className="ml-1  md:col-span-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
