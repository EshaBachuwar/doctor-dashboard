import dbConnect from "@/lib/db/connect";
import Doctor from "@/lib/db/models/Doctor";
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        await dbConnect();

        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ message: 'No token provided' }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

        try {
            const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

            const doctor = await Doctor.findById(decoded.id)
                // .populate({
                //     path: 'patients',
                //     select: 'name email'
                // });

            if (!doctor) {
                return NextResponse.json({ message: 'Doctor not found' }, { status: 404 });
            }

            const profileResponse = {
                _id: doctor._id,
                name: doctor.name,
                email: doctor.email,
                specialization: doctor.specialization,
                // patients: doctor.patients,
                createdAt: doctor.createdAt,
                updatedAt: doctor.updatedAt
            };

            return NextResponse.json(profileResponse, { status: 200 });

        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
            }

            console.error('Profile fetch error:', error);
            return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
        }

    } catch (error) {
        console.error('Unexpected error:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}