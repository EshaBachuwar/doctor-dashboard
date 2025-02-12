import { NextRequest } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: { path: string[] } }
) {
    const path = params.path.join('/');
    const apiUrl = `${process.env.API_URL}/api/${path}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    return Response.json(data);
}

export async function POST(
    request: NextRequest,
    { params }: { params: { path: string[] } }
) {
    const path = params.path.join('/');
    const apiUrl = `${process.env.API_URL}/api/${path}`;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(await request.json()),
    });

    const data = await response.json();
    return Response.json(data);
}