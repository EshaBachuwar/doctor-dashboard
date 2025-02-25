import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { Types } from "mongoose";
import dbConnect from "@/lib/db/connect";
import Patient, { IReport } from "@/lib/db/models/Patient";
import Doctor from "@/lib/db/models/Doctor";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const patientId = new Types.ObjectId((await params).id);

    const patient = await Patient.findById(patientId);

    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    return NextResponse.json(patient.toPatient());
  } catch (error) {
    if (error instanceof Error && error.name === "BSONError") {
      return NextResponse.json(
        { error: "Invalid patient ID format" },
        { status: 400 }
      );
    }
    console.error("Error fetching patient:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const patientId = new Types.ObjectId((await params).id);

    const contentType = req.headers.get("content-type") || "";
    let data;
    let file: File | null = null;
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      file = formData.get("file") as File | null;
      data = {} as { [key: string]: any };
      for (const [key, value] of formData.entries()) {
        if (key !== "file") {
          try {
            data[key] = JSON.parse(value as string);
          } catch {
            data[key] = value;
          }
        }
      }
    } else {
      data = await req.json();
    }

    let patient = await Patient.findById(patientId);
    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    if (file) {
      const uploadDir = join(process.cwd(), "public/uploads");
      await mkdir(uploadDir, { recursive: true });

      const allowedExtensions = ["pdf"];
      const extension = file.name.split(".").pop()?.toLowerCase();
      if (!extension || !allowedExtensions.includes(extension)) {
        return NextResponse.json(
          { error: "Only PDF files are allowed" },
          { status: 400 }
        );
      }

      const timestamp = Date.now();
      const newFilename = `${timestamp}.${extension}`;
      const filePath = join(uploadDir, newFilename);

      const bytes = await file.arrayBuffer();
      await writeFile(filePath, Buffer.from(bytes));
      if (typeof patient.addReport === 'function') {
        const report: IReport = {
          patientId: patient._id as Types.ObjectId,
          doctorId: patient.doctor,
          fileName: file.name,
          fileUrl: `/uploads/${newFilename}`,
          createdAt: new Date(),
        };
        patient.addReport(report);
      } else {
        if (!patient.reports) {
          patient.reports = [];
        }
        patient.reports.push({
          patientId:  patient._id as Types.ObjectId,
          doctorId: patient.doctor,
          fileName: file.name,
          fileUrl: `/uploads/${newFilename}`,
          createdAt: new Date(),
        });
      }
    }

    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        if (key !== '_id' && key !== 'reports') { // Avoid overwriting _id and reports
          (patient as any)[key] = value;
        }
      });
    }    await patient.save();

    return NextResponse.json(patient.toPatient());
  } catch (error) {
    console.error("Error updating patient:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const patientId = new Types.ObjectId((await params).id);

    const patient = await Patient.findByIdAndDelete(patientId);

    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }
    const doctorId = patient.doctor;
    await Doctor.findByIdAndUpdate(doctorId, {
      $pull: { patients: patientId },
    });

    return NextResponse.json(
      { message: "Patient deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error && error.name === "BSONError") {
      return NextResponse.json(
        { error: "Invalid patient ID format" },
        { status: 400 }
      );
    }
    console.error("Error deleting patient:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
