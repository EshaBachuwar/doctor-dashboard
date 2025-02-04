export interface Patient {
    id: string;
    name: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    contact: string;
    medicalHistory: string;
    doctor: string;
    email?: string;
    phone?: string;
    prescriptions: string[];
    reports: string[];
    createdAt: string;
    updatedAt: string;
}

export interface PatientState {
    patients: Patient[];
    loading: boolean;
    error: string | null;
    selectedPatient: Patient | null;
}