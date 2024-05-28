import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const { email, name, lastName } = await req.json();

    try {
        const rows = await sql`SELECT * FROM customers WHERE email=${email}`;

        if (rows?.rowCount === 0){
            await sql`INSERT INTO customers (name, lastName, email) VALUES (${name}, ${lastName}, ${email})`;
        }

        return NextResponse.json({ message: 'Customer successfully saved' }, { status: 200 });
      } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
      }
    }
    