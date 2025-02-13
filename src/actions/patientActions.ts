import { Patient } from "@/types/patient";

export const FETCH_PATIENTS_REQUEST = "FETCH_PATIENTS_REQUEST";
export const FETCH_PATIENTS_SUCCESS = "FETCH_PATIENTS_SUCCESS";
export const FETCH_PATIENTS_FAILURE = "FETCH_PATIENTS_FAILURE";
export const FETCH_PATIENT_REQUEST = "FETCH_PATIENT_REQUEST";
export const FETCH_PATIENT_SUCCESS = "FETCH_PATIENT_SUCCESS";
export const FETCH_PATIENT_FAILURE = "FETCH_PATIENT_FAILURE";
export const ADD_PATIENT_REQUEST = "ADD_PATIENT_REQUEST";
export const ADD_PATIENT_SUCCESS = "ADD_PATIENT_SUCCESS";
export const ADD_PATIENT_FAILURE = "ADD_PATIENT_FAILURE";
export const UPDATE_PATIENT_REQUEST = "UPDATE_PATIENT_REQUEST";
export const UPDATE_PATIENT_SUCCESS = "UPDATE_PATIENT_SUCCESS";
export const UPDATE_PATIENT_FAILURE = "UPDATE_PATIENT_FAILURE";
export const DELETE_PATIENT_REQUEST = "DELETE_PATIENT_REQUEST";
export const DELETE_PATIENT_SUCCESS = "DELETE_PATIENT_SUCCESS";
export const DELETE_PATIENT_FAILURE = "DELETE_PATIENT_FAILURE";
export const SELECT_PATIENT = "SELECT_PATIENT";

interface FetchPatientsRequestAction {
  type: typeof FETCH_PATIENTS_REQUEST;
}

interface FetchPatientsSuccessAction {
  type: typeof FETCH_PATIENTS_SUCCESS;
  payload: Patient[];
}

interface FetchPatientsFailureAction {
  type: typeof FETCH_PATIENTS_FAILURE;
  payload: string;
}
interface FetchPatientRequestAction {
  type: typeof FETCH_PATIENT_REQUEST;
}

interface FetchPatientSuccessAction {
  type: typeof FETCH_PATIENT_SUCCESS;
  payload: Patient;
}

interface FetchPatientFailureAction {
  type: typeof FETCH_PATIENT_FAILURE;
  payload: string;
}

interface AddPatientRequestAction {
  type: typeof ADD_PATIENT_REQUEST;
}

interface AddPatientSuccessAction {
  type: typeof ADD_PATIENT_SUCCESS;
  payload: Patient;
}

interface AddPatientFailureAction {
  type: typeof ADD_PATIENT_FAILURE;
  payload: string;
}

interface UpdatePatientRequestAction {
  type: typeof UPDATE_PATIENT_REQUEST;
}

interface UpdatePatientSuccessAction {
  type: typeof UPDATE_PATIENT_SUCCESS;
  payload: Patient;
}

interface UpdatePatientFailureAction {
  type: typeof UPDATE_PATIENT_FAILURE;
  payload: string;
}

interface DeletePatientRequestAction {
  type: typeof DELETE_PATIENT_REQUEST;
}

interface DeletePatientSuccessAction {
  type: typeof DELETE_PATIENT_SUCCESS;
  payload: string;
}

interface DeletePatientFailureAction {
  type: typeof DELETE_PATIENT_FAILURE;
  payload: string;
}

interface SelectPatientAction {
  type: typeof SELECT_PATIENT;
  payload: Patient;
}

export type PatientActionTypes =
  | FetchPatientsRequestAction
  | FetchPatientsSuccessAction
  | FetchPatientsFailureAction
  | FetchPatientRequestAction
  | FetchPatientSuccessAction
  | FetchPatientFailureAction
  | AddPatientRequestAction
  | AddPatientSuccessAction
  | AddPatientFailureAction
  | UpdatePatientRequestAction
  | UpdatePatientSuccessAction
  | UpdatePatientFailureAction
  | DeletePatientRequestAction
  | DeletePatientSuccessAction
  | DeletePatientFailureAction
  | SelectPatientAction;

export const fetchPatientsRequest = (): FetchPatientsRequestAction => ({
  type: FETCH_PATIENTS_REQUEST,
});

export const fetchPatientsSuccess = (
  patients: Patient[]
): FetchPatientsSuccessAction => ({
  type: FETCH_PATIENTS_SUCCESS,
  payload: patients,
});

export const fetchPatientsFailure = (
  error: string
): FetchPatientsFailureAction => ({
  type: FETCH_PATIENTS_FAILURE,
  payload: error,
});
export const fetchPatientRequest = (): FetchPatientRequestAction => ({
  type: FETCH_PATIENT_REQUEST,
});

export const fetchPatientSuccess = (
  patient: Patient
): FetchPatientSuccessAction => ({
  type: FETCH_PATIENT_SUCCESS,
  payload: patient,
});

export const fetchPatientFailure = (
  error: string
): FetchPatientFailureAction => ({
  type: FETCH_PATIENT_FAILURE,
  payload: error,
});

export const addPatientRequest = (): AddPatientRequestAction => ({
  type: ADD_PATIENT_REQUEST,
});

export const addPatientSuccess = (
  patient: Patient
): AddPatientSuccessAction => ({
  type: ADD_PATIENT_SUCCESS,
  payload: patient,
});

export const addPatientFailure = (error: string): AddPatientFailureAction => ({
  type: ADD_PATIENT_FAILURE,
  payload: error,
});

export const updatePatientRequest = (): UpdatePatientRequestAction => ({
  type: UPDATE_PATIENT_REQUEST,
});

export const updatePatientSuccess = (
  patient: Patient
): UpdatePatientSuccessAction => ({
  type: UPDATE_PATIENT_SUCCESS,
  payload: patient,
});

export const updatePatientFailure = (
  error: string
): UpdatePatientFailureAction => ({
  type: UPDATE_PATIENT_FAILURE,
  payload: error,
});

export const deletePatientRequest = (): DeletePatientRequestAction => ({
  type: DELETE_PATIENT_REQUEST,
});

export const deletePatientSuccess = (
  patientId: string
): DeletePatientSuccessAction => ({
  type: DELETE_PATIENT_SUCCESS,
  payload: patientId,
});

export const deletePatientFailure = (
  error: string
): DeletePatientFailureAction => ({
  type: DELETE_PATIENT_FAILURE,
  payload: error,
});

export const selectPatient = (patient: Patient): SelectPatientAction => ({
  type: SELECT_PATIENT,
  payload: patient,
});
