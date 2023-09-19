import db from "@/db";
import { cookies } from 'next/headers';
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        console.log('form:', { email, password })
        const result = await db.authenticate(email, password);
        const {record, token} = result;
        record.token = token;
        cookies().set('pb_auth', db.client.authStore.exportToCookie());

        return NextResponse.json(record);
    } catch (err: any) {
        return new Response(
            JSON.stringify({ error: err.message || err.toString() }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
    }
}