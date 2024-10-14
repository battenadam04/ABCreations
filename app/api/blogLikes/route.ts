import { sql } from "@vercel/postgres";
import Error from "next/error";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
      const { totalLikes, postId } = await req.json();
  
      // Correcting the SQL syntax for Postgres
      await sql`
        INSERT INTO blogs (blog_Title, total_likes) 
        VALUES (${postId}, ${totalLikes})
        ON CONFLICT (blog_Title) 
        DO UPDATE SET total_likes = ${totalLikes};
      `;
  
      return NextResponse.json({ message: 'Blog like successfully saved', totalLikes }, { status: 200 });
    } catch (error: any) {
      console.error('Error saving blog like:', error);
      return NextResponse.json({ message: error.message || 'An error occurred' }, { status: 500 });
    }
    }
      