"use client";
import React, { useEffect, useState } from 'react';
import { Button } from '../shared/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, store } from '@/store';
import { fetchPatients } from '@/actions/patientThunks';
interface PatientListProps {
    setRightPanel: (panel: string) => void;
    setPatientId: (panel: string) => void;
}

export const PatientList: React.FC<PatientListProps> = ({ setRightPanel,setPatientId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { patients, loading, error } = useSelector((state: RootState) => state.patients);
    const doctorId = store.getState().auth.doctor?.id || '';
    useEffect(() => {
        if (doctorId)
            dispatch(fetchPatients(doctorId));
    }, [dispatch, doctorId]);
    const handleAddPatient = () => {
        setRightPanel('add');
    }
    const handleViewPatient = (e: React.MouseEvent<HTMLButtonElement>, patientId: string) => {
        e.preventDefault();
        setPatientId(patientId);
        setRightPanel('view');
    }
    return (
        <div className="bg-pink-100 text-black shadow-md rounded-lg p-6">
            <div className="flex items-center justify-center mb-4">
                <h3 className="text-xl font-semibold">List of Patients</h3>
            </div>
            <div className="overflow-x-auto overflow-y-hidden">
                {patients.length === 0 && <p>No patients found</p>}
                {patients.length > 0 && <table className="w-full">
                    <thead>
                        <tr>
                            <th className="text-left">Name</th>
                            <th className="text-left">Age</th>
                            <th className="text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient, index) => (
                            <tr key={index}>
                                <td>{patient.name}</td>
                                <td>{patient.age}</td>
                                <td>
                                    <Button variant="outline" onClick={(e) => handleViewPatient(e, patient.id)}>
                                        View
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                }
                <div className='flex justify-center'>
                    <Button className="mt-4 w-[50%]" onClick={handleAddPatient}>Add new patient</Button>
                </div>
            </div>
        </div>
    );
};
