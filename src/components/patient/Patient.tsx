"use client";
import React, { useEffect, useState } from 'react';
import { Button } from '../shared/Button';
import { useDispatch } from 'react-redux';
import { addPatient, fetchPatientById } from '@/actions/patientThunks';
import { AppDispatch, store, useAppSelector } from '@/store';
import { log } from 'util';
interface PatientProps {
    setRightPanel: (panel: string) => void;
    patientId: string;
}
export const Patient: React.FC<PatientProps> = ({ setRightPanel, patientId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const selectedPatient = useAppSelector((state) => state.patients.selectedPatient);
    console.log(patientId);
    useEffect(() => {
        if (patientId)
            dispatch(fetchPatientById(patientId));
    }, [dispatch, patientId]);
    const handleOnClose = () => {
        setRightPanel('list');
    }
    const handleEdit = () => {
        setRightPanel('edit');
    }
    console.log(selectedPatient);
    return (
        <div className=" bg-pink-100 text-black shadow-lg rounded-lg p-6">
            <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={handleEdit}>Edit</Button>
                <Button variant="outline" onClick={handleOnClose}>Close</Button>
            </div>
            <div>
                <h2 className="text-2xl font-bold">Patient Details</h2>
                <div className="grid grid-cols-5 gap-4 mt-4">
                    <div>
                        <label className="text-gray-600">Name : </label>
                        <span>{selectedPatient?.name}</span>
                    </div>
                    <div>
                        <label className="text-gray-600">Age : </label>
                        <span>{selectedPatient?.age}</span>
                    </div>
                    <div>
                        <label className="text-gray-600">Weight : </label>
                        <span>{selectedPatient?.weight}</span>
                    </div>
                    <div>
                        <label className="text-gray-600">Blood Group : </label>
                        <span>{selectedPatient?.bloodGroup}</span>
                    </div>
                    <div>
                        <label className="text-gray-600">Gender : </label>
                        <span>{selectedPatient?.gender}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}