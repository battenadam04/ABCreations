import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ postId: string }> }) {
  const postId = (await params).postId;

  try {
    const cleanedPostId = postId.trim().toLowerCase();
    const sql = neon(`${process.env.DATABASE_URL}`);
    // Use parameterized query to prevent SQL injection
    const result = await sql`SELECT total_likes, total_dislikes FROM blogs WHERE LOWER(blog_title) = ${cleanedPostId}`;

    console.log("check results", result);
    // Check if any row was found
    if (result.length === 0) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    // Extract total_likes from the result and return it
    const totalLikes = result[0].total_likes;
        const totalDislikes = result[0].total_dislikes;
    return NextResponse.json({ totalLikes, totalDislikes }, { status: 200 });
  } catch (error) {
    console.error('Error executing query:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
