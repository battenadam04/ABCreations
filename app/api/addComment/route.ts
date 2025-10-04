import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { username, comment, postId } = await req.json();

    // Correcting the SQL syntax for Postgres
    await sql`
        INSERT INTO comments (blog_title, username, comment) 
        VALUES (${postId}, ${username}, ${comment});
      `;

    return NextResponse.json({ message: 'Comment successfully saved' }, { status: 200 });
  } catch (error: any) {
    console.error('Error saving comment:', error);
    return NextResponse.json({ message: error.message || 'An error occurred' }, { status: 500 });
  }
}
