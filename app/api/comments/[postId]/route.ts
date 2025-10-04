import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ postId: string }> }) {
  try {
    const postId = (await params).postId;
    const cleanedPostId = postId.trim().toLowerCase();

    // Correcting the SQL syntax for Postgres
    const { rows: comments } = await sql`
        SELECT * FROM comments
        WHERE LOWER(blog_title)=${cleanedPostId};
      `;

    if (!comments || comments.length === 0) {
      return NextResponse.json({ message: 'No comments found', comments: [] }, { status: 200 });
    }
    return NextResponse.json({ message: 'Comments successfully retrieved', comments }, { status: 200 });
  } catch (error: any) {
    console.error('Error retrieving comments:', error);
    return NextResponse.json({ message: error.message || 'An error occurred' }, { status: 500 });
  }
}
