import { NextRequest, NextResponse } from 'next/server';
import { Types } from 'mongoose';
import dbConnect from '@/lib/db/connect';
import Patient from '@/lib/db/models/Patient';
import { store } from '@/store';

export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        const doctor = store.getState().auth.doctor;
        if (!doctor || !doctor.id) {
            return NextResponse.json(
                { error: 'Doctor ID is required' },
                { status: 400 }
            );
        }

        const patients = await Patient.findByDoctor(new Types.ObjectId(doctor.id));
        const formattedPatients = patients.map(patient => patient.toPatient());

        return NextResponse.json(formattedPatients);
    } catch (error) {
        console.error('Error fetching patients:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const data = await req.json();
        const doctor = store.getState().auth.doctor;
        if (!doctor || !doctor.id) {
            return NextResponse.json(
                { error: 'Doctor ID is required' },
                { status: 400 }
            );
        }


        const patient = new Patient({
            ...data,
            doctor: new Types.ObjectId(doctor.id)
        });

        await patient.save();
        return NextResponse.json(patient.toPatient(), { status: 201 });
    } catch (error) {
        console.error('Error creating patient:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}