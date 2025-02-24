"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../shared/Button";
import { useAppSelector } from "@/store";
interface RefrePatientProps {
  setRightPanel: (panel: string) => void;
  patientId: string;
  setOpenRefer: (panel: boolean) => void;
}

export const ReferPatient: React.FC<RefrePatientProps> = ({
  setRightPanel,
  patientId,
  setOpenRefer,
}) => {
  interface Doctor {
    _id: string;
    name: string;
    email: string;
    specialization: string;
    age?: number;
    phone?: string;
    patients?: any[];
    referredPatients?: any[];
  }
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const { doctor, token } = useAppSelector((state) => state.auth);
  const handleRefer = async (doctorId: string) => {
    try {
      const res = await fetch(`/api/doctor/${doctorId}/referred`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ patientId, referredBy: doctor?.id }),
      });
      if (!res.ok) {
        throw new Error("Failed to refer patient");
      }
      const data = await res.json();
      setOpenRefer(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/doctor", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch doctor");
        }
        const data = await response.json();
        setDoctors(data.doctors);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handleOnClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenRefer(false);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      <div className="relative z-10 p-8 bg-white rounded-lg shadow-lg  mb-2">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-black font-bold">Refer Patient</h1>
          <Button onClick={handleOnClose}>Close</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className=" px-4 py-2">Doctor Name</th>
                <th className=" px-4 py-2">Specialization</th>
                <th className=" px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor._id} className="text-black">
                  <td className=" px-4 py-2">{doctor.name}</td>
                  <td className=" px-4 py-2">{doctor.specialization}</td>
                  <td className=" px-4 py-2 text-center">
                    <Button
                      variant="outline"
                      onClick={() => handleRefer(doctor._id)}
                    >
                      Refer
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
