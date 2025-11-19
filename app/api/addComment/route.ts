// import { sql } from '@vercel/postgres';
import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';
import { sanitizeUserInput } from '~/utils/santise';

export async function POST(req: NextRequest) {
  try {
    const { username, comment, postId } = await req.json();
    const timestamp = new Date().toDateString();
    const sql = neon(process.env.DATABASE_URL || '');

    const name = sanitizeUserInput(username).plain;
    const message = sanitizeUserInput(comment).plain;

    // reject if spam flags are high
    const spamCheck = sanitizeUserInput(comment);
    if (spamCheck.flags.blacklistedWord || spamCheck.flags.excessiveUrls) {
      return NextResponse.json({ error: 'Potential spam detected.' }, { status: 400 });
    }

    // Correcting the SQL syntax for Postgres
    await sql`
        INSERT INTO comments (blog_title, username, comment, timestamp) 
        VALUES (${postId}, ${name}, ${message}, ${timestamp});
      `;

    return NextResponse.json({ message: 'Comment successfully saved' }, { status: 200 });
  } catch (error: any) {
    console.error('Error saving comment:', error);
    return NextResponse.json({ message: error.message || 'An error occurred' }, { status: 500 });
  }
}
