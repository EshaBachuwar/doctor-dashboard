import { NextRequest, NextResponse } from 'next/server';

import { Types } from 'mongoose';
import dbConnect from '@/lib/db/connect';
import Patient from '@/lib/db/models/Patient';
import Doctor from '@/lib/db/models/Doctor';

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const patientId = new Types.ObjectId(params.id);

        const patient = await Patient.findById(patientId)

        if (!patient) {
            return NextResponse.json(
                { error: 'Patient not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(patient.toPatient());
    } catch (error) {
        if (error instanceof Error && error.name === 'BSONError') {
            return NextResponse.json(
                { error: 'Invalid patient ID format' },
                { status: 400 }
            );
        }
        console.error('Error fetching patient:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const patientId = new Types.ObjectId(params.id);
        const data = await req.json();

        const patient = await Patient.findById(patientId);

        if (!patient) {
            return NextResponse.json(
                { error: 'Patient not found' },
                { status: 404 }
            );
        }

        Object.assign(patient, data);
        await patient.save();

        return NextResponse.json(patient.toPatient());
    } catch (error) {
        console.error('Error updating patient:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const patientId = new Types.ObjectId(params.id);

        const patient = await Patient.findByIdAndDelete(patientId);

        if (!patient) {
            return NextResponse.json(
                { error: 'Patient not found' },
                { status: 404 }
            );
        }
        const doctorId = patient.doctor;
        await Doctor.findByIdAndUpdate(
            doctorId,
            {
                $pull: { patients: patientId }
            }
        );

        return NextResponse.json(
            { message: 'Patient deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof Error && error.name === 'BSONError') {
            return NextResponse.json(
                { error: 'Invalid patient ID format' },
                { status: 400 }
            );
        }
        console.error('Error deleting patient:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
