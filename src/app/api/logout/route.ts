import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
    try {
        console.log('Logout request');
        return NextResponse.json(
            { message: 'Logged out successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.log('Logout request');
        console.error('Logout error:', error);
        return NextResponse.json(
            { message: 'Error during logout' },
            { status: 500 }
        );
    }
}