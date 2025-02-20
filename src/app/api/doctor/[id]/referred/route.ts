import dbConnect from "@/lib/db/connect";
import Doctor from "@/lib/db/models/Doctor";
import Patient from "@/lib/db/models/Patient";
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
    // Get the referred patients
    const referredPatientIds = doctor.referredPatients.map((ref:any) => ref.patient);

    const referredPatients = await Patient.find({
      _id: { $in: referredPatientIds },
    });
    return NextResponse.json( referredPatients );
  } catch (error) {
    console.error("Error fetching doctor:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params, body }: { params: Promise<{ id: string }>; body: any }
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
    const { patientId,referredBy } = await req.json();
    if (!patientId || !referredBy) {
      return NextResponse.json(
        { error: "Missing patientId or referredBy" },
        { status: 400 }
      );
    }
    const isAlreadyReferred =doctor.referredPatients.find(
      (ref:any) => ref.patient.toString() === patientId
    );
    if (!isAlreadyReferred) {
      doctor.referredPatients.push({
        patient: new Types.ObjectId(patientId),
        referredBy: new Types.ObjectId(referredBy),
      });
    }
    await doctor.save();
    return NextResponse.json({ message: "Patient referred successfully" });
  } catch (error) {
    console.error("Error referring patient:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}