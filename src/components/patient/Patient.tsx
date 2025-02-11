"use client";
import React, { useEffect, useState } from 'react';
import { Button } from '../shared/Button';
import { useDispatch } from 'react-redux';
import { addPatient, fetchPatientById } from '@/actions/patientThunks';
import { AppDispatch, store, useAppSelector } from '@/store';
import { log } from 'util';
import { Medications } from './Medications';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PatientPDF } from './PatientPDF';
import { Download, Loader } from 'lucide-react';
interface PatientProps {
    setRightPanel: (panel: string) => void;
    patientId: string;
}
export const Patient: React.FC<PatientProps> = ({ setRightPanel, patientId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const selectedPatient = useAppSelector((state) => state.patients.selectedPatient);
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
    return (
        <div className=" bg-pink-100 text-black shadow-lg rounded-lg p-6 max-h-[88%] overflow-y-auto max-w-4xl">
            <div className="flex justify-end gap-2">
            {selectedPatient && (
                    <PDFDownloadLink
                        document={<PatientPDF patient={selectedPatient} />}
                        fileName={`patient-${selectedPatient.name}.pdf`}
                    >
                        {({ loading }) => (
                            <Button variant="outline" disabled={loading}>
                                {loading ? <Loader /> : <div className='flex gap-2 p-0'><Download /> Prescription</div>}
                            </Button>
                        )}
                    </PDFDownloadLink>
                )}
                <Button variant="outline" onClick={handleEdit}>Edit</Button>
                <Button variant="outline" onClick={handleOnClose}>Close</Button>
            </div>
            <div className='gap-3 m-2'>
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
                        <label className="text-gray-600">Gender : </label>
                        <span>{selectedPatient?.gender}</span>
                    </div>
                    <div>
                        <label className="text-gray-600">Blood Group : </label>
                        <span>{selectedPatient?.bloodGroup}</span>
                    </div>
                </div>
                <div className="flex justify-between mt-4 mr-8">
                    <div>
                        <label className='text-gray-600'>Phone Number : </label>
                        <span>{selectedPatient?.phone}</span>
                    </div>
                    <div>
                        <label className='text-gray-600'>Next Visit : </label>
                        <span>{selectedPatient?.nextVisit}</span>
                    </div>
                </div>
                <div className=" mt-4">
                    <div>
                        <label className="text-gray-600">Known Allergies : </label>
                        <span>{selectedPatient?.knownAllergies}</span>
                    </div>
                </div>
                <div className=" mt-4">
                    <div>
                        <label className="text-gray-600">Reason Of Visit : </label>
                        <span>{selectedPatient?.reasonOfVisit}</span>
                    </div>
                </div>
                <div className=" mt-4">
                    <div>
                        <label className="text-gray-600">Diagosis : </label>
                        <span>{selectedPatient?.diagnosis}</span>
                    </div>
                </div>
                <div className="mt-4">
                    <div>
                        <label className="text-gray-600">Prescribed Medications : </label>
                        <div className="mt-2">
                            <Medications medications={selectedPatient?.prescribedMedication} />
                        </div>
                    </div>
                </div>
                <div className=" mt-4">
                    <div>
                        <label className="text-gray-600">Reports : </label>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    )
}