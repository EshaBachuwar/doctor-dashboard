export interface Patient {
    id: string;
    name: string;
    age: number;
    gender: string;
    phone?: string;
    weight?: number;
    bloodGroup?: string;
    knownAllergies?: string;
    medicalHistory?: string;
    currentMedication?: string;
    reasonOfVisit?: string;
    symptoms?: string;
    diagnosis?: string;
    prescribedMedication?: string;
    nextVisit?: string;
    doctor?: string;
    prescriptions?: string[];
    reports?: string[];
    createdAt: string;
    updatedAt: string;
}

export interface PatientState {
    patients: Patient[];
    loading: boolean;
    error: string | null;
    selectedPatient: Patient | null;
}