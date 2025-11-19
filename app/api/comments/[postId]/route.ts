// import { sql } from '@vercel/postgres';
import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ postId: string }> }) {
  try {
    const postId = (await params).postId;
    const cleanedPostId = postId.trim().toLowerCase();

    const sql = neon(`${process.env.DATABASE_URL}`);

    // Correcting the SQL syntax for Postgres
    const result = await sql.query('SELECT * FROM comments WHERE blog_title=$1', [cleanedPostId]);

    if (!result || result.length === 0) {
      return NextResponse.json({ message: 'No comments found', result: [] }, { status: 200 });
    }

    /** Sanitise and remove all spam */

    return NextResponse.json({ message: 'Comments successfully retrieved', result }, { status: 200 });
  } catch (error: any) {
    console.error('Error retrieving comments:', error);
    return NextResponse.json({ message: error.message || 'An error occurred' }, { status: 500 });
  }
}
