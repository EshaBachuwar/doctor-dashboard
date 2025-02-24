import dbConnect from "@/lib/db/connect";
import Doctor from "@/lib/db/models/Doctor";
import Patient from "@/lib/db/models/Patient";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const doctorId = new Types.ObjectId((await params).id);
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return NextResponse.json(
        { message: "Doctor not found" },
        { status: 404 }
      );
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    let todayVisitCount = 0;
    let weekVisitCount = 0;
    let monthVisitCount = 0;
    const patientIds = doctor.patients || [];
    const patients = await Patient.find({
      _id: { $in: patientIds },
    });
    if (doctor.patients && doctor.patients.length > 0) {
      todayVisitCount = patients.filter((patient) => {
        if (patient.nextVisit) {
          const visitDate = new Date(patient.nextVisit);
          visitDate.setHours(0, 0, 0, 0);
          return visitDate >= today && visitDate < tomorrow;
        }
        return false;
      }).length;
      weekVisitCount = await Patient.countDocuments({
        _id: { $in: patientIds },
        createdAt: {
          $gte: startOfWeek,
          $lt: tomorrow,
        },
      });
      monthVisitCount = await Patient.countDocuments({
        _id: { $in: patientIds },
        createdAt: {
          $gte: startOfMonth,
          $lt: tomorrow,
        },
      });
    }
    return NextResponse.json(
      {
        doctor,
        todayVisitCount,
        weekVisitCount,
        monthVisitCount,
        message: "Doctor data retrieved successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
