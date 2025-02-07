import dbConnect from "@/lib/db/connect";
import Doctor from "@/lib/db/models/Doctor";
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { name, age, gender,phone, specialization, email, password } = body;
        if (!name || !email || !password || !specialization || !phone) {
            return NextResponse.json(
                { message: 'Please provide all required fields' },
                { status: 400 }
            );
        }
        let doctor = await Doctor.findOne({ email });
        if (doctor) {
            return NextResponse.json(
                { message: 'Doctor already exists' },
                { status: 400 }
            );
        }
        doctor = new Doctor({
            name,
            age: age ? Number(age) : null,
            gender,
            phone,
            specialization,
            email,
            password
        });

        await doctor.save();
        const token = jwt.sign(
            { id: doctor._id },
            process.env.JWT_SECRET!,
            { expiresIn: '1d' }
        );
        return NextResponse.json({
            token,
            doctor: {
                id: doctor._id,
                name: doctor.name,
                age: doctor.age,
                phone: doctor.phone,
                gender: doctor.gender,
                email: doctor.email,
                specialization: doctor.specialization
            }
        }, { status: 201 });

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { message: 'Server error' },
            { status: 500 }
        );
    }
}