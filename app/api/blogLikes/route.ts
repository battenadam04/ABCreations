import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const { liked, postId } = await req.json();

    try {
        const rows = await sql`INSERT INTO blogs VALUES postId=${postId}`;
        const totalLikes = await sql`SELECT likes FROM blogs WHERE postId=${postId}`;

        return NextResponse.json({ message: 'Blog like successfully saved', totalLikes}, { status: 200 });
      } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
      }
    }
    