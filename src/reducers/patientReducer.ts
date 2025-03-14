import { PatientState } from "../types/patient";
import {
  ADD_PATIENT_FAILURE,
  ADD_PATIENT_REQUEST,
  ADD_PATIENT_SUCCESS,
  DELETE_PATIENT_FAILURE,
  DELETE_PATIENT_REQUEST,
  DELETE_PATIENT_SUCCESS,
  FETCH_PATIENT_FAILURE,
  FETCH_PATIENT_REQUEST,
  FETCH_PATIENT_SUCCESS,
  FETCH_PATIENTS_FAILURE,
  FETCH_PATIENTS_REQUEST,
  FETCH_PATIENTS_SUCCESS,
  PatientActionTypes,
  SELECT_PATIENT,
  UPDATE_PATIENT_FAILURE,
  UPDATE_PATIENT_REQUEST,
  UPDATE_PATIENT_SUCCESS,
  RESET_SELECTED_PATIENT,
  FETCH_REFERRED_PATIENTS_REQUEST,
  FETCH_REFERRED_PATIENTS_SUCCESS,
  FETCH_REFERRED_PATIENTS_FAILURE,
} from "../actions/patientActions";

const initialState: PatientState = {
  patients: [],
  referredPatients: [],
  loading: false,
  error: null,
  selectedPatient: null,
};

export const patientReducer = (
  state = initialState,
  action: PatientActionTypes
): PatientState => {
  switch (action.type) {
    case FETCH_PATIENTS_REQUEST:
    case FETCH_REFERRED_PATIENTS_REQUEST:
    case FETCH_PATIENT_REQUEST:
    case ADD_PATIENT_REQUEST:
    case UPDATE_PATIENT_REQUEST:
    case DELETE_PATIENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_PATIENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        patients: action.payload,
      };
    case FETCH_REFERRED_PATIENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        referredPatients: action.payload,
      };
    case FETCH_PATIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedPatient: action.payload,
      };

    case ADD_PATIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        patients: [...state.patients, action.payload],
      };

    case UPDATE_PATIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        patients: state.patients.map((patient) =>
          patient.id === action.payload.id ? action.payload : patient
        ),
      };

    case DELETE_PATIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        patients: state.patients.filter(
          (patient) => patient.id !== action.payload
        ),
      };

    case FETCH_PATIENTS_FAILURE:
    case FETCH_REFERRED_PATIENTS_FAILURE:
    case FETCH_PATIENT_FAILURE:
    case ADD_PATIENT_FAILURE:
    case UPDATE_PATIENT_FAILURE:
    case DELETE_PATIENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SELECT_PATIENT:
      return {
        ...state,
        selectedPatient: action.payload,
      };
    case RESET_SELECTED_PATIENT:
      return {
        ...state,
        selectedPatient: null,
      };
    default:
      return state;
  }
};
