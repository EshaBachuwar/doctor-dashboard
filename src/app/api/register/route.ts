import dbConnect from "@/lib/db/connect";
import Doctor from "@/lib/db/models/Doctor";
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
export async function POST(request: Request) {
    try {
        await dbConnect();

        // Parse request body
        const body = await request.json();
        const { name, age, gender, email, password, specialization } = body;

        // Validate required fields
        if (!name || !email || !password || !specialization) {
            return NextResponse.json(
                { message: 'Please provide all required fields' },
                { status: 400 }
            );
        }

        // Check if doctor already exists
        let doctor = await Doctor.findOne({ email });
        if (doctor) {
            return NextResponse.json(
                { message: 'Doctor already exists' },
                { status: 400 }
            );
        }

        // Create new doctor (password hashing is handled by the model)
        doctor = new Doctor({
            name,
            age,
            gender,
            email,
            password,
            specialization
        });

        await doctor.save();

        // Generate JWT
        const token = jwt.sign(
            { id: doctor._id },
            process.env.JWT_SECRET!,
            { expiresIn: '1d' }
        );

        // Return response without password
        return NextResponse.json({
            token,
            doctor: {
                id: doctor._id,
                name: doctor.name,
                age: doctor.age,
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