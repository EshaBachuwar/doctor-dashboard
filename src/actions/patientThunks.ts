import { AppDispatch } from "@/store";
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
  deletePatientFailure,
  fetchPatientRequest,
  fetchPatientSuccess,
  fetchPatientFailure,
  fetchReferredPatientsRequest,
  fetchReferredPatientsSuccess,
  fetchReferredPatientsFailure,
} from "./patientActions";
import { Patient } from "@/types/patient";

export const fetchPatients =
  (doctorId: string) => async (dispatch: AppDispatch) => {
    dispatch(fetchPatientsRequest());
    try {
      const response = await fetch(`/api/patients?doctorId=${doctorId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok)
        throw new Error(`Error ${response.status}: Failed to fetch patients`);

      const data = await response.json();
      dispatch(fetchPatientsSuccess(data));
    } catch (error) {
      dispatch(
        fetchPatientsFailure(
          error instanceof Error ? error.message : "Unexpected error"
        )
      );
    }
  };

export const fetchPatientById =
  (patientId: string) => async (dispatch: AppDispatch) => {
    dispatch(fetchPatientRequest());
    try {
      const response = await fetch(`/api/patients/${patientId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok)
        throw new Error(`Error ${response.status}: Failed to fetch patient`);

      const data = await response.json();
      dispatch(fetchPatientSuccess(data));
    } catch (error) {
      dispatch(
        fetchPatientFailure(
          error instanceof Error ? error.message : "Unexpected error"
        )
      );
    }
  };

export const addPatient =
  (patientData: Omit<Patient, "id">) => async (dispatch: AppDispatch) => {
    dispatch(addPatientRequest());
    try {
      const response = await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patientData),
      });

      if (!response.ok)
        throw new Error(`Error ${response.status}: Failed to add patient`);

      const data = await response.json();
      dispatch(addPatientSuccess(data));
      return data;
    } catch (error) {
      dispatch(
        addPatientFailure(
          error instanceof Error ? error.message : "Unexpected error"
        )
      );
    }
  };
interface UpdatePatientPayload {
  patient: Patient;
  reportFile?: File;
}
export const updatePatient =
  ({ patient, reportFile }: UpdatePatientPayload) =>
  async (dispatch: AppDispatch) => {
    dispatch(updatePatientRequest());
    try {
      let response;
      if (reportFile) {
        const formData = new FormData();
        formData.append("file", reportFile);
        Object.entries(patient).forEach(([key, value]) => {
          if (value !== undefined) {
            if (typeof value === "object") {
              formData.append(key, JSON.stringify(value));
            } else {
              formData.append(key, value.toString());
            }
          }
        });
        response = await fetch(`/api/patients/${patient.id}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        response = await fetch(`/api/patients/${patient.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patient),
        });
      }
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error ||
            `Error ${response.status}: Failed to update patient`
        );
      }
      const data = await response.json();
      dispatch(updatePatientSuccess(data));
    } catch (error) {
      dispatch(
        updatePatientFailure(
          error instanceof Error ? error.message : "Unexpected error"
        )
      );
    }
  };

export const deletePatient =
  (patientId: string) => async (dispatch: AppDispatch) => {
    dispatch(deletePatientRequest());
    try {
      const response = await fetch(`/api/patients/${patientId}`, {
        method: "DELETE",
      });

      if (!response.ok)
        throw new Error(`Error ${response.status}: Failed to delete patient`);

      dispatch(deletePatientSuccess(patientId));
    } catch (error) {
      dispatch(
        deletePatientFailure(
          error instanceof Error ? error.message : "Unexpected error"
        )
      );
    }
  };

export const fetchReferredPatients =
  (doctorId: string) => async (dispatch: AppDispatch) => {
    dispatch(fetchReferredPatientsRequest());
    try {
      const response = await fetch(`/api/doctor/${doctorId}/referred`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok)
        throw new Error(`Error ${response.status}: Failed to fetch patients`);

      const data = await response.json();
      const modifiedData = data.map((patient: any) => ({
        ...patient,
        id: patient._id,
        _id: undefined,
      }));
      dispatch(fetchReferredPatientsSuccess(modifiedData));
    } catch (error) {
      dispatch(
        fetchReferredPatientsFailure(
          error instanceof Error ? error.message : "Unexpected error"
        )
      );
    }
  };
export const referPatient =
  (doctorId: string, patientId: string) => async (dispatch: AppDispatch) => {
    dispatch(addPatientRequest());
    try {
      const response = await fetch(`/api/doctor/${doctorId}/referred`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patientId }),
      });

      if (!response.ok)
        throw new Error(`Error ${response.status}: Failed to refer patient`);

      const data = await response.json();
    } catch (error) {
      dispatch(
        addPatientFailure(
          error instanceof Error ? error.message : "Unexpected error"
        )
      );
    }
  };
