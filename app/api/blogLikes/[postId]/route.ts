import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest,   { params }: { params: Promise<{ postId: string }> }) {
  const postId = (await params).postId;

  try {
    const cleanedPostId = postId.trim().toLowerCase();
    // Use parameterized query to prevent SQL injection
    const result = await sql`SELECT total_likes FROM blogs WHERE LOWER(blog_title) = ${cleanedPostId}`;

    // Check if any row was found
    if (result.rowCount === 0) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    // Extract total_likes from the result and return it
    const totalLikes = result.rows[0].total_likes;
    return NextResponse.json({ totalLikes }, { status: 200 });

  } catch (error) {
    console.error('Error executing query:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}