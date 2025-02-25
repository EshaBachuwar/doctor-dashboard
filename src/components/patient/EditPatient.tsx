"use client";
import { useState } from "react";
import { Button } from "../shared/Button";
import { useDispatch } from "react-redux";
import { AppDispatch, store } from "@/store";
import { Plus, X } from "lucide-react";
import { updatePatient } from "@/actions/patientThunks";
import { apiClient } from "@/lib/api-client";
import { DiseaseResponse } from "@/types/disease";
import { useTheme } from "@/context/ThemeContext";
import { report } from "process";
import { resetSelectedPatient } from "@/actions/patientActions";

interface EditPatientProps {
  setRightPanel: (panel: string) => void;
  patientid: string;
  setPatientId: (id: string) => void;
}
interface Medication {
  name: string;
  timing: {
    morning: boolean;
    afternoon: boolean;
    night: boolean;
  };
}

export const EditPatient: React.FC<EditPatientProps> = ({
  setRightPanel,
  patientid,
  setPatientId
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [medications, setMedications] = useState<Medication[]>(
    store.getState().patients.selectedPatient?.prescribedMedication || [
      {
        name: "",
        timing: {
          morning: false,
          afternoon: false,
          night: false,
        },
      },
    ]
  );
  const [result, setResult] = useState<DiseaseResponse | null>(null);
  const [showPredictionModal, setShowPredictionModal] = useState(false);
  const [reportFile, setReportFile] = useState<File | null>(null);
  const { darkMode } = useTheme();
  const [error, setError] = useState<string | null>(null);
  const [initialFormData, setInitialFormData] = useState({
    name: store.getState().patients.selectedPatient?.name,
    age: store.getState().patients.selectedPatient?.age.toString(),
    gender: store.getState().patients.selectedPatient?.gender,
    phone: store.getState().patients.selectedPatient?.phone,
    weight: store.getState().patients.selectedPatient?.weight?.toString(),
    bloodGroup: store.getState().patients.selectedPatient?.bloodGroup,
    knownAllergies: store.getState().patients.selectedPatient?.knownAllergies,
    medicalHistory: store.getState().patients.selectedPatient?.medicalHistory,
    currentMedication:
      store.getState().patients.selectedPatient?.currentMedication,
    reasonOfVisit: store.getState().patients.selectedPatient?.reasonOfVisit,
    symptoms: store.getState().patients.selectedPatient?.symptoms,
    diagnosis: store.getState().patients.selectedPatient?.diagnosis,
    prescribedMedication:
      store.getState().patients.selectedPatient?.prescribedMedication,
    reports: store.getState().patients.selectedPatient?.reports,
    nextVisit: store.getState().patients.selectedPatient?.nextVisit,
  });
  const [formData, setFormData] = useState({
    name: initialFormData.name || "",
    age: store.getState().patients.selectedPatient?.age.toString(),
    gender: initialFormData.gender || "",
    phone: store.getState().patients.selectedPatient?.phone,
    weight: store.getState().patients.selectedPatient?.weight?.toString(),
    bloodGroup: store.getState().patients.selectedPatient?.bloodGroup,
    knownAllergies: store.getState().patients.selectedPatient?.knownAllergies,
    medicalHistory: store.getState().patients.selectedPatient?.medicalHistory,
    currentMedication:
      store.getState().patients.selectedPatient?.currentMedication,
    reasonOfVisit: store.getState().patients.selectedPatient?.reasonOfVisit,
    symptoms: store.getState().patients.selectedPatient?.symptoms,
    diagnosis: store.getState().patients.selectedPatient?.diagnosis,
    prescribedMedication:
      store.getState().patients.selectedPatient?.prescribedMedication,
    reports: store.getState().patients.selectedPatient?.reports,
    nextVisit: store.getState().patients.selectedPatient?.nextVisit,
  });
  const handleAddMedication = () => {
    setMedications([
      ...medications,
      {
        name: "",
        timing: {
          morning: false,
          afternoon: false,
          night: false,
        },
      },
    ]);
  };
  const handleRemoveMedication = (index: number) => {
    const newMedications = medications.filter((_, i) => i !== index);
    setMedications(newMedications);
  };

  const handleMedicationChange = (
    index: number,
    field: string,
    value: string | boolean
  ) => {
    const newMedications = medications.map((medication, i) => {
      if (i === index) {
        if (field === "name") {
          return { ...medication, name: value as string };
        } else {
          return {
            ...medication,
            timing: {
              ...medication.timing,
              [field]: value,
            },
          };
        }
      }
      return medication;
    });
    setMedications(newMedications);
  };
  const validateMedications = (meds: Medication[]): boolean => {
    return meds.every(
      (med) =>
        med.name.trim() !== "" &&
        (med.timing.morning || med.timing.afternoon || med.timing.night)
    );
  };
  const getDateInputValue = () => {
    if (!formData.nextVisit) return "";
    const parts = formData.nextVisit.split("/");
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(
        2,
        "0"
      )}`;
    }
    return "";
  };
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    if (date) {
      const dateObj = new Date(date);

      const day = dateObj.getDate().toString().padStart(2, "0");
      const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
      const year = dateObj.getFullYear();

      const formattedDate = `${day}/${month}/${year}`;

      setFormData({ ...formData, nextVisit: formattedDate });
    } else {
      setFormData({ ...formData, nextVisit: "" });
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setError("Only PDF files are allowed");
        return;
      }
      setReportFile(file);
      setError(null);
    }
  };
  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.symptoms != undefined) {
      try {
        const symptomList = formData?.symptoms.split(",").map((s) => s.trim());
        const prediction = await apiClient.predictDisease(symptomList);
        setResult(prediction);
        setShowPredictionModal(true);
      } catch (error) {
        console.error("Prediction failed:", error);
      }
    }
  };
  const closePredictionModal = () => {
    setShowPredictionModal(false);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.gender) {
      alert("Please provide name");
      return;
    }
    const validMedications = medications.filter(
      (med) => med.name.trim() !== ""
    );
    if (validMedications.length > 0 && !validateMedications(validMedications)) {
      alert("Please select at least one timing for each medication");
      return;
    }
    setError(null);
    try {
      const patientData = {
        ...formData,
        id: patientid,
        age: parseInt(formData.age),
        weight: formData.weight ? parseFloat(formData.weight) : undefined,
        prescribedMedication: validMedications,
        doctor: store.getState().auth.doctor?.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      console.log(reportFile);
      dispatch(
        updatePatient({
          patient: patientData,
          reportFile: reportFile || undefined,
        })
      );
      setReportFile(null);
      dispatch(resetSelectedPatient());
      setRightPanel("list");
    } catch (error) {
      console.error("Error creating patient:", error);
    }
  };
  const handleOnClose = () => {
    setRightPanel("view");
  };
  return (
    <div
      className={`${
        darkMode ? "bg-gray-700 text-white" : "bg-pink-100 text-black"
      } shadow-lg rounded-lg p-6 max-h-[88%] overflow-y-auto max-w-4xl`}
    >
      <div className="">
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={handleOnClose}
            className="md:col-span-1"
          >
            Close
          </Button>
        </div>
        <div className="grid grid-cols-9 m-2">
          <h1 className="text-2xl font-semibold mb-6 text-center md:col-span-8">
            Edit Patient
          </h1>
        </div>
        <div>
          <form
            onSubmit={handleSubmit}
            className={` ${darkMode ? "text-gray-100" : "text-gray-700 "}`}
          >
            <div className="mb-4  grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className='"md:col-span-1 grid grid-cols-1 md:grid-cols-5 gap-1'>
                <label className="text-sm font-medium  md:col-span-1">
                  Name:
                </label>
                <input
                  type="text"
                  value={formData.name}
                  disabled
                  className="ml-1  md:col-span-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-1 grid grid-cols-1 md:grid-cols-5 gap-1">
                <label className="ml-2 text-sm font-medium  md:col-span-1">
                  Age:
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  required
                  className="ml-1 text-black md:col-span-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="md:col-span-1 grid grid-cols-1 md:grid-cols-5 gap-1">
                <label className=" text-sm font-medium  md:col-span-1">
                  Gender:
                </label>
                <select
                  value={formData.gender}
                  disabled
                  className="ml-1 text-gray-700   md:col-span-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="md:col-span-1 grid grid-cols-1 md:grid-cols-5 gap-1">
                <label className="ml-2 text-sm font-medium  md:col-span-1">
                  Phone:
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  disabled
                  className="ml-1  md:col-span-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mb-4  grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className='"md:col-span-1 grid grid-cols-1 md:grid-cols-5 gap-1'>
                <label className="text-sm font-medium  md:col-span-1">
                  Weight:
                </label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({ ...formData, weight: e.target.value })
                  }
                  className="ml-1  text-black md:col-span-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-1 grid grid-cols-1 md:grid-cols-5 gap-1">
                <label className="ml-2 text-sm font-medium  md:col-span-1">
                  Blood Group:
                </label>
                <input
                  type="text"
                  value={formData.bloodGroup}
                  disabled
                  className="ml-1   md:col-span-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mb-4  grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className='"md:col-span-1 grid grid-cols-1 md:grid-cols-5 gap-1'>
                <label className="text-sm font-medium  md:col-span-1">
                  Known Allergies:
                </label>
                <input
                  type="text"
                  value={formData.knownAllergies}
                  disabled
                  className="ml-1  md:col-span-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-1 grid grid-cols-1 md:grid-cols-5 gap-1">
                <label className="ml-2 text-sm font-medium  md:col-span-1">
                  Medical History:
                </label>
                <input
                  type="text"
                  value={formData.medicalHistory}
                  disabled
                  className="ml-1  md:col-span-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className='"md:col-span-1 grid grid-cols-1 md:grid-cols-5 gap-1'>
                <label className="text-sm font-medium  md:col-span-1">
                  Current Medication:
                </label>
                <input
                  type="text"
                  value={formData.currentMedication}
                  disabled
                  className="ml-1  md:col-span-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-1 grid grid-cols-1 md:grid-cols-5 gap-1">
                <label className="ml-2 text-sm font-medium  md:col-span-1">
                  Reason Of Visit:
                </label>
                <input
                  type="text"
                  value={formData.reasonOfVisit}
                  onChange={(e) =>
                    setFormData({ ...formData, reasonOfVisit: e.target.value })
                  }
                  required
                  className="ml-1 text-black md:col-span-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mb-4  grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className='"md:col-span-1 grid grid-cols-1 md:grid-cols-8 gap-1'>
                <label className="text-sm font-medium  md:col-span-2">
                  Symptoms:
                </label>
                <input
                  type="text"
                  value={formData.symptoms}
                  onChange={(e) =>
                    setFormData({ ...formData, symptoms: e.target.value })
                  }
                  className="ml-1 text-black md:col-span-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={(e) => handlePredict(e)}
                  className="md:col-span-2 bg-gray-200 text-black"
                >
                  Predict
                </button>
              </div>
              <div className="md:col-span-1 grid grid-cols-1 md:grid-cols-5 gap-1">
                <label className="ml-2 text-sm font-medium  md:col-span-1">
                  Diagnosis :
                </label>
                <input
                  type="text"
                  value={formData.diagnosis}
                  onChange={(e) =>
                    setFormData({ ...formData, diagnosis: e.target.value })
                  }
                  className="ml-1 text-black md:col-span-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium">Prescribed Medications</h3>
              <Button
                type="button"
                variant="outline"
                onClick={handleAddMedication}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3 mb-4">
              {medications.map((medication, index) => (
                <div key={index} className="p-4 shadow-md mb-2 rounded-lg">
                  <div className="flex items-start gap-4 mb-2">
                    <div className="flex-1 w-full">
                      <label className="mx-1 text-sm font-medium  mb-1">
                        Medicine Name :
                      </label>
                      <input
                        type="text"
                        value={medication.name}
                        onChange={(e) =>
                          handleMedicationChange(index, "name", e.target.value)
                        }
                        className="px-4 py-2 w-full text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter medicine name"
                      />
                    </div>
                    {medications.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMedication(index)}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium block mb-2">
                      Timing
                    </label>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={medication.timing.morning}
                          onChange={(e) =>
                            handleMedicationChange(
                              index,
                              "morning",
                              e.target.checked
                            )
                          }
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm ">Morning</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={medication.timing.afternoon}
                          onChange={(e) =>
                            handleMedicationChange(
                              index,
                              "afternoon",
                              e.target.checked
                            )
                          }
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm ">Afternoon</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={medication.timing.night}
                          onChange={(e) =>
                            handleMedicationChange(
                              index,
                              "night",
                              e.target.checked
                            )
                          }
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm ">Night</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mb-4   gap-2">
              <div className=" grid grid-cols-1 md:grid-cols-5 gap-1">
                <label className=" ml-2 text-sm font-medium  md:col-span-1">
                  Upload Report (PDF only)
                </label>
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div className="mb-4  grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="md:col-span-1 grid grid-cols-1 md:grid-cols-5 gap-1">
                <label className="ml-2 text-sm font-medium  md:col-span-1">
                  Next Visit:
                </label>
                <input
                  type="date"
                  value={getDateInputValue()}
                  onChange={handleDateChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="text-black ml-1 md:col-span-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <Button className="mt-4 w-[40%]">Edit Patient</Button>
            </div>
          </form>
        </div>
        {showPredictionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
              onClick={closePredictionModal}
            ></div>
            <div className="bg-white rounded-lg p-6 shadow-xl z-10 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-600">
                  Disease Prediction Results
                </h3>
                <button
                  onClick={closePredictionModal}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {result && (
                  <>
                    <div className="border-b pb-2">
                      <p className="text-sm text-gray-500">
                        Based on the symptoms:
                      </p>
                      <p className="font-medium text-gray-600">
                        {formData.symptoms}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        Predicted Disease:
                      </p>
                      <p className="font-medium text-lg text-gray-600">
                        {result.disease}
                      </p>
                    </div>
                    {result.description && (
                      <div>
                        <p className="text-sm text-gray-500">Description:</p>
                        <p className="text-sm text-gray-600">
                          {result.description}
                        </p>
                      </div>
                    )}
                    {result.medications && result.medications.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-500">Medications:</p>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {result.medications.map((medication, index) => (
                            <li key={index}>{medication}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="mt-6 flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      diagnosis: result?.disease || "",
                    });
                    closePredictionModal();
                  }}
                >
                  Use as Diagnosis
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
