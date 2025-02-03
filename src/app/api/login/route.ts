import dbConnect from "@/lib/db/connect";
import Doctor from "@/lib/db/models/Doctor";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        await dbConnect();

        // Parse request body
        const body = await request.json();
        const { email, password } = body;

        // Validate input
        if (!email || !password) {
            return NextResponse.json(
                { message: 'Please provide email and password' },
                { status: 400 }
            );
        }

        // Find doctor by email
        const doctor = await Doctor.findOne({ email }).select('+password');
        if (!doctor) {
            return NextResponse.json(
                { message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
            return NextResponse.json(
                { message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Generate JWT token
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
        });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { message: 'Server error' },
            { status: 500 }
        );
    }
}