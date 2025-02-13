export interface MedicationTiming {
  morning: boolean;
  afternoon: boolean;
  night: boolean;
}

export interface Medication {
  name: string;
  timing: MedicationTiming;
}
export interface Report {
  id: string;
  patientId: string;
  doctorId: string;
  fileName: string;
  fileUrl: string;
  uploadDate: Date;
}

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
  prescribedMedication?: Medication[];
  nextVisit?: string;
  doctor?: string;
  reports?: Report[];
  createdAt: string;
  updatedAt: string;
}

export interface PatientState {
  patients: Patient[];
  loading: boolean;
  error: string | null;
  selectedPatient: Patient | null;
}
