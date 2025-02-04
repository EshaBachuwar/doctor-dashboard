"use client";
import React, { useState } from 'react';
import { Button } from '../shared/Button';
interface PatientListProps {
    setRightPanel: (panel: string) => void;
}

export const PatientList: React.FC<PatientListProps> = ({ setRightPanel }) => {
    const handleAddPatient = () => {
        setRightPanel('add');
        console.log('Add new patient');
    }
    return (
        <div className="bg-pink-100 text-black shadow-md rounded-lg p-6">
            <div className="flex items-center justify-center mb-4">
                <h3 className="text-xl font-semibold">List of Patients</h3>
            </div>
            <div className="overflow-x-auto overflow-y-hidden">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="text-left">Name</th>
                            <th className="text-left">Age</th>
                            <th className="text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>John Doe</td>
                            <td>32</td>
                            <td>
                                <button className="text-blue-600 px-2 py-1 rounded-md">
                                    View
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>Jane Doe</td>
                            <td>28</td>
                            <td>
                                <button className="text-blue-600 px-2 py-1 rounded-md">
                                    View
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>James Doe</td>
                            <td>45</td>
                            <td>
                                <button className="text-blue-600  px-2 py-1 rounded-md">
                                    View
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Button className="mt-4 w-full" onClick={handleAddPatient}>Add new patient</Button>
            </div>
        </div>
    );
};
