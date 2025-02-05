import { AppDispatch } from '@/store';
import {
    fetchPatientsRequest,
    fetchPatientsSuccess,
    fetchPatientsFailure,
    addPatientRequest,
    addPatientSuccess,
    addPatientFailure,
    updatePatientRequest,
    updatePatientSuccess,
    updatePatientFailure,
    deletePatientRequest,
    deletePatientSuccess,
    deletePatientFailure
} from './patientActions';
import { Patient } from '@/types/patient';

export const fetchPatients = (doctorId:string) => async (dispatch: AppDispatch) => {
    dispatch(fetchPatientsRequest());
    try {
        const response = await fetch(`/api/patients?doctorId=${doctorId}`,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error(`Error ${response.status}: Failed to fetch patients`);

        const data = await response.json();
        dispatch(fetchPatientsSuccess(data));
    } catch (error) {
        dispatch(fetchPatientsFailure(error instanceof Error ? error.message : 'Unexpected error'));
    }
};

export const addPatient = (patientData: Omit<Patient, 'id'>) => async (dispatch: AppDispatch) => {
    dispatch(addPatientRequest());
    try {
        const response = await fetch('/api/patients', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patientData),
        });

        if (!response.ok) throw new Error(`Error ${response.status}: Failed to add patient`);

        const data = await response.json();
        dispatch(addPatientSuccess(data));
        return data;
    } catch (error) {
        dispatch(addPatientFailure(error instanceof Error ? error.message : 'Unexpected error'));
    }
};

export const updatePatient = (patient: Patient) => async (dispatch: AppDispatch) => {
    dispatch(updatePatientRequest());
    try {
        const response = await fetch(`/api/patients/${patient.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patient),
        });

        if (!response.ok) throw new Error(`Error ${response.status}: Failed to update patient`);

        const data = await response.json();
        dispatch(updatePatientSuccess(data));
    } catch (error) {
        dispatch(updatePatientFailure(error instanceof Error ? error.message : 'Unexpected error'));
    }
};

export const deletePatient = (patientId: string) => async (dispatch: AppDispatch) => {
    dispatch(deletePatientRequest());
    try {
        const response = await fetch(`/api/patients/${patientId}`, { method: 'DELETE' });

        if (!response.ok) throw new Error(`Error ${response.status}: Failed to delete patient`);

        dispatch(deletePatientSuccess(patientId));
    } catch (error) {
        dispatch(deletePatientFailure(error instanceof Error ? error.message : 'Unexpected error'));
    }
};
