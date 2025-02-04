import { NextRequest, NextResponse } from 'next/server';

import { Types } from 'mongoose';
import dbConnect from '@/lib/db/connect';
import Patient from '@/lib/db/models/Patient';

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const patientId = new Types.ObjectId(params.id);

        const patient = await Patient.findById(patientId).populate('prescriptions reports');

        if (!patient) {
            return NextResponse.json(
                { error: 'Patient not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(patient.toPatient());
    } catch (error) {
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

        return NextResponse.json(
            { message: 'Patient deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting patient:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
