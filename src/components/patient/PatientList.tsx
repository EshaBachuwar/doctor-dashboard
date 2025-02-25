"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../shared/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "@/store";
import {
  deletePatient,
  fetchPatients,
  fetchReferredPatients,
} from "@/actions/patientThunks";
import { useTheme } from "@/context/ThemeContext";
import { Trash } from "lucide-react";
import { ReferPatient } from "./ReferPatient";

interface PatientListProps {
  setRightPanel: (panel: string) => void;
  setPatientId: (panel: string) => void;
  patientId: string;
}

export const PatientList: React.FC<PatientListProps> = ({
  setRightPanel,
  setPatientId,
  patientId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { darkMode } = useTheme();
  const { patients, referredPatients } = useSelector(
    (state: RootState) => state.patients
  );
  const doctorId = store.getState().auth.doctor?.id || "";
  const [searchTerm, setSearchTerm] = useState("");
  const [patientList, setPatientList] = useState(true);
  const [openRefer, setOpenRefer] = useState(false);

  useEffect(() => {
    if (doctorId) {
      dispatch(fetchPatients(doctorId));
      dispatch(fetchReferredPatients(doctorId));
    }
  }, [dispatch, doctorId]);

  const handleAddPatient = () => {
    setRightPanel("add");
  };

  const handleViewPatient = (
    e: React.MouseEvent<HTMLButtonElement>,
    patientId: string
  ) => {
    e.preventDefault();
    setPatientId(patientId);
    setRightPanel("view");
  };

  const handleDeletePatient = (
    e: React.MouseEvent<HTMLButtonElement>,
    patientId: string
  ) => {
    e.preventDefault();
    dispatch(deletePatient(patientId));
  };
  const handleReferPatient = (
    e: React.MouseEvent<HTMLButtonElement>,
    patientId: string
  ) => {
    e.preventDefault();
    setPatientId(patientId);
    setOpenRefer(true);
  };
  const visiblePatients = patientList ? patients || [] : referredPatients || [];
  const filteredPatients = visiblePatients?.filter((patient) =>
    patient?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`w-full ${
        darkMode ? "bg-gray-700 text-white" : "bg-pink-100 text-black"
      }  shadow-md rounded-lg p-6`}
    >
      <div className="flex items-center justify-center mb-4 gap-2">
        <Button
          variant={`${!patientList ? "outline" : "primary"}`}
          size={`${patientList ? "lg" : "sm"}`}
          onClick={() => setPatientList(true)}
        >
          List of Patients
        </Button>
        <Button
          variant={`${patientList ? "outline" : "primary"}`}
          size={`${!patientList ? "lg" : "sm"}`}
          onClick={() => setPatientList(false)}
        >
          Referred Patients
        </Button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-black p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
      </div>

      <div className="w-full overflow-x-auto overflow-y-auto ">
        <div className="flex items-center justify-center w-full">
          {filteredPatients.length === 0 && <p>No patients found</p>}
          {filteredPatients.length > 0 && (
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Name</th>
                  <th className="text-left">Age</th>
                  <th className="text-left"></th>
                  <th className="text-left"></th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient, index) => (
                  <tr key={index}>
                    <td>{patient.name}</td>
                    <td>{patient.age}</td>
                    <td>
                      <Button
                        variant="outline"
                        onClick={(e) => handleViewPatient(e, patient.id)}
                        className="mr-2"
                      >
                        View
                      </Button>
                      <Button
                        variant="outline"
                        onClick={(e) => handleReferPatient(e, patient.id)}
                        className="mr-2"
                      >
                        Refer
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="outline"
                        onClick={(e) => handleDeletePatient(e, patient.id)}
                        className="border-0"
                      >
                        <Trash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="flex justify-center">
          <Button className="mt-4 w-[50%]" onClick={handleAddPatient}>
            Add new patient
          </Button>
        </div>
      </div>
      {openRefer && (
        <ReferPatient
          setRightPanel={setRightPanel}
          patientId={patientId}
          setOpenRefer={setOpenRefer}
        />
      )}
    </div>
  );
};
