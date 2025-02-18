"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store";

import {
  UserCircle,
  Calendar,
  Stethoscope,
  ClipboardList,
  Bell,
} from "lucide-react";
import { Navbar } from "@/components/navbar/Navbar";
import { Patient } from "@/components/patient/Patient";
import { PatientList } from "@/components/patient/PatientList";
import { AddPatient } from "@/components/patient/AddPatient";
import { EditPatient } from "@/components/patient/EditPatient";
import { useTheme } from "@/context/ThemeContext";

const DashboardStats = [
  {
    icon: Calendar,
    title: "Upcoming Appointments",
    value: 12,
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Stethoscope,
    title: "Patients Treated",
    value: 145,
    color: "bg-green-100 text-green-600",
  },
  {
    icon: ClipboardList,
    title: "Pending Reports",
    value: 5,
    color: "bg-yellow-100 text-yellow-600",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const { darkMode, toggleTheme } = useTheme();
  const { doctor, token } = useAppSelector((state) => state.auth);
  const [rightPanel, setRightPanel] = useState("list");
  const [patientId, setPatientId] = useState("");
  const currentDoctor = doctor;
  if (!currentDoctor) return null;

  return (
    <div
      className={`h-max bg-gradient-to-b ${
        darkMode ? "from-gray-900 to-gray-800" : "from-rose-200 to-white"
      }  p-6 pt-0`}
    >
      <Navbar />
      <div className=" h-max mx-auto grid grid-cols-1 md:grid-cols-7 gap-6">
        <div
          className={`h-[100%] md:col-span-2 ${
            darkMode ? "bg-gray-700 text-white" : "bg-pink-100 text-black"
          }   shadow-lg rounded-lg p-6`}
        >
          <div className="flex flex-col items-center">
            <UserCircle size={80} className="text-gray-400 mb-4" />
            <h2 className="text-xl font-bold">{currentDoctor.name}</h2>
            <p className={`${darkMode ? "text-gray-200" : "text-gray-600"} `}>
              {currentDoctor.specialization}
            </p>

            <div className="mt-6 w-full space-y-2">
              <div className="flex items-center">
                <strong className="mr-2">Email:</strong>
                <span>{currentDoctor.email}</span>
              </div>
              <div className="flex items-center">
                <strong className="mr-2">Phone:</strong>
                <span>{currentDoctor.phone}</span>
              </div>
            </div>
          </div>
          <div className="mt-3 space-y-2">
            {DashboardStats.map((stat, index) => (
              <div
                key={index}
                className={`${stat.color} p-4 rounded-lg flex items-center space-x-4`}
              >
                <stat.icon size={40} />
                <div>
                  <p className="text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-5 space-y-6 max-h-screen">
          {rightPanel === "list" && (
            <PatientList
              setRightPanel={setRightPanel}
              setPatientId={setPatientId}
            />
          )}
          {rightPanel === "add" && <AddPatient setRightPanel={setRightPanel} />}
          {rightPanel === "view" && (
            <Patient setRightPanel={setRightPanel} patientId={patientId} />
          )}
          {rightPanel === "edit" && (
            <EditPatient setRightPanel={setRightPanel} patientid={patientId} />
          )}
        </div>
      </div>
    </div>
  );
}
