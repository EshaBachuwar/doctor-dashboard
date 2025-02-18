"use client";
import { useTheme } from "@/context/ThemeContext";
import React from "react";

interface MedicationTiming {
  morning: boolean;
  afternoon: boolean;
  night: boolean;
}

interface Medication {
  name: string;
  timing: MedicationTiming;
}

export const Medications = ({
  medications,
}: {
  medications?: Medication[] | null;
}) => {
  const { darkMode, toggleTheme } = useTheme();

  const medicationArray = Array.isArray(medications) ? medications : [];

  if (medicationArray.length === 0) {
    return <span className="text-gray-500">No medications prescribed</span>;
  }

  return (
    <div className="space-y-4">
      {medicationArray.map((med, index) => (
        <div key={index} className=" p-3 shadow-sm">
          <div
            className={`font-medium ${
              darkMode ? "text-gray-100" : " text-gray-800"
            }`}
          >
            {med.name}
          </div>
          <div className="flex gap-4 mt-2">
            <div
              className={`px-3 py-1 rounded-full text-sm ${
                med.timing?.morning
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              Morning
            </div>
            <div
              className={`px-3 py-1 rounded-full text-sm ${
                med.timing?.afternoon
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              Afternoon
            </div>
            <div
              className={`px-3 py-1 rounded-full text-sm ${
                med.timing?.night
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              Night
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Medications;
